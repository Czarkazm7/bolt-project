import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supaService = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!   // service-role key
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler = async (evt) => {
  if (evt.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  /* ---------- auth ---------- */
  const jwt = evt.headers.authorization?.replace('Bearer ', '');
  const userClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { global: { headers: { Authorization: `Bearer ${jwt}` } } }
  );
  const { data: user } = await userClient.auth.getUser();
  if (!user) return { statusCode: 401, body: 'unauthenticated' };

  /* ---------- credits ---------- */
  const { data: cred } = await userClient
    .from('user_credits')
    .select('remaining')
    .eq('user_id', user.user.id)
    .single();

  if (!cred || cred.remaining < 1) {
    return { statusCode: 402, body: 'out_of_credits' };
  }

  /* ---------- parse request ---------- */
  const { topic, audience, tone, length } = JSON.parse(evt.body);

  /* ---------- generate content ---------- */
  const blog = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an expert content writer.' },
      {
        role: 'user',
        content: `Write an SEO blog about "${topic}" for ${audience} in a ${tone} tone. Target length: ${length}.`
      }
    ]
  });

  /* ---------- persist + decrement ---------- */
  await supaService.from('generation_history').insert({
    user_id: user.user.id,
    topic,
    payload: { blog: blog.choices[0].message.content }
  });

  await supaService.from('user_credits')
    .update({ remaining: cred.remaining - 1 })
    .eq('user_id', user.user.id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      blog: blog.choices[0].message.content,
      remaining: cred.remaining - 1
    })
  };
};