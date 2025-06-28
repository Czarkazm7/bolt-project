import { FormData } from '../components/ContentForm';
import { GeneratedContent } from '../components/ContentDisplay';

export const generateContent = async (formData: FormData): Promise<GeneratedContent> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 4000));

  // Mock content generation based on form data
  const { topic, audience, tone, length } = formData;
  
  const toneAdjustments = {
    professional: { prefix: '', style: 'formal and authoritative' },
    casual: { prefix: 'Hey there! ', style: 'friendly and approachable' },
    enthusiastic: { prefix: '🚀 ', style: 'energetic and exciting' },
    educational: { prefix: 'Did you know? ', style: 'informative and clear' }
  };

  const lengthMultipliers = {
    short: 0.7,
    medium: 1.0,
    long: 1.5
  };

  const adjustment = toneAdjustments[tone as keyof typeof toneAdjustments];
  const lengthMult = lengthMultipliers[length as keyof typeof lengthMultipliers];

  const blogPost = `# ${topic}: A Comprehensive Guide for ${audience}

## Introduction

${adjustment.prefix}Understanding ${topic.toLowerCase()} is crucial for ${audience.toLowerCase()} in today's rapidly evolving landscape. This comprehensive guide will walk you through everything you need to know to master this important subject.

## Key Concepts

When approaching ${topic.toLowerCase()}, it's essential to consider the unique needs and challenges faced by ${audience.toLowerCase()}. Our ${adjustment.style} approach ensures maximum value and practical application.

## Main Benefits

1. **Enhanced Understanding**: Gain deep insights into ${topic.toLowerCase()}
2. **Practical Application**: Real-world strategies you can implement immediately
3. **Competitive Advantage**: Stay ahead in your field with cutting-edge knowledge
4. **Community Building**: Connect with like-minded ${audience.toLowerCase()}

## Implementation Strategy

The key to success with ${topic.toLowerCase()} lies in consistent application and continuous learning. Start with small steps and gradually build your expertise.

## Conclusion

${topic} represents a significant opportunity for ${audience.toLowerCase()} to excel in their respective fields. By following the strategies outlined in this guide, you'll be well-equipped to leverage these insights for maximum impact.

Remember, success comes from taking action. Start implementing these concepts today and watch your results transform.

---
*This content is optimized for SEO with relevant keywords and structured for maximum readability and engagement.*`.substring(0, Math.floor(1200 * lengthMult));

  const twitterThread = `🧵 THREAD: ${topic} for ${audience}

1/8 ${adjustment.prefix}${topic} is revolutionizing how ${audience.toLowerCase()} approach their work. Here's what you need to know 👇

2/8 The biggest mistake most ${audience.toLowerCase()} make? They overlook the fundamentals. ${topic} starts with understanding your core objectives.

3/8 Key insight: ${topic} isn't just a trend—it's a fundamental shift that's here to stay. Early adopters are already seeing 3x better results.

4/8 Pro tip: Start small. Pick one aspect of ${topic.toLowerCase()} and master it completely before moving to the next level.

5/8 The data is clear: ${audience.toLowerCase()} who embrace ${topic.toLowerCase()} see significantly better outcomes in their field.

6/8 Common pitfall to avoid: Don't try to implement everything at once. Focus on sustainable, gradual progress.

7/8 Your action plan:
✅ Learn the basics
✅ Start with one area
✅ Measure results
✅ Scale what works

8/8 ${topic} isn't just about tools or techniques—it's about transforming how ${audience.toLowerCase()} think and operate.

What's your experience with ${topic.toLowerCase()}? Share in the comments! 👇

#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')}`;

  const linkedinPost = `${topic}: A Game-Changer for ${audience}

${adjustment.prefix}In my experience working with ${audience.toLowerCase()}, I've noticed a significant shift in how they approach ${topic.toLowerCase()}. The results have been remarkable.

🔍 Key Observations:
• ${topic} is no longer optional—it's essential
• Early adopters are seeing 2-3x better outcomes
• The learning curve is manageable with the right approach
• Community support makes all the difference

💡 What I've learned:
The most successful ${audience.toLowerCase()} don't just implement ${topic.toLowerCase()}—they understand its underlying principles and adapt them to their unique context.

📈 The Impact:
Organizations that embrace ${topic.toLowerCase()} report improved efficiency, better outcomes, and higher satisfaction among their ${audience.toLowerCase()}.

🚀 Moving Forward:
If you're part of the ${audience.toLowerCase()} community, now is the time to invest in understanding ${topic.toLowerCase()}. The competitive advantage is significant.

What's been your experience with ${topic.toLowerCase()}? I'd love to hear your thoughts in the comments.

#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #ProfessionalDevelopment #Innovation`;

  const youtubeScript = `[HOOK - 0-3s]
${adjustment.prefix}"${topic} changed everything for ${audience.toLowerCase()}—here's how!"

[PROBLEM - 3-8s]
Most ${audience.toLowerCase()} struggle with ${topic.toLowerCase()} because they don't know where to start.

[SOLUTION - 8-25s]
Here are the 3 essential steps:

Step 1: Understand the fundamentals
${topic} isn't complicated when you break it down to core principles.

Step 2: Start with one focused area
Don't try to do everything at once. Pick one aspect and master it.

Step 3: Measure and adjust
Track your progress and refine your approach based on results.

[PROOF - 25-40s]
${audience} who follow this approach see results 3x faster than those who don't.

[CALL TO ACTION - 40-50s]
Want more tips like this? Follow for daily content on ${topic.toLowerCase()} for ${audience.toLowerCase()}!

[END SCREEN - 50-60s]
What's your biggest challenge with ${topic.toLowerCase()}? Comment below!

#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Shorts`;

  const instagramCaption = `${adjustment.prefix}${topic} for ${audience} 💫

Swipe to see why this matters ➡️

The game is changing, and ${audience.toLowerCase()} who understand ${topic.toLowerCase()} are winning big. Here's what you need to know:

✨ It's not as complicated as you think
🎯 Start with the basics and build from there
📈 Small consistent steps lead to big results
🤝 Community support makes all the difference

Tag a fellow ${audience.toLowerCase().slice(0, -1)} who needs to see this! 👥

Drop a 💡 if you're ready to dive deeper into ${topic.toLowerCase()}

---
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Motivation #GrowthMindset #Success #Learn #Inspiration #Tips #Strategy #Goals #Progress #Community #Excellence #Innovation #Leadership #Development`;

  const titleBank = `Alternative Headlines for "${topic}":

1. The Ultimate ${topic} Guide for ${audience}
2. How ${audience} Can Master ${topic} in 2024
3. ${topic}: What Every ${audience.slice(0, -1)} Needs to Know
4. The ${topic} Revolution: Why ${audience} Can't Ignore This
5. From Beginner to Expert: ${topic} for ${audience}
6. ${topic} Secrets That ${audience} Don't Want You to Know
7. The Complete ${topic} Playbook for ${audience}
8. ${topic} Made Simple: A ${audience.slice(0, -1)}'s Guide
9. Why ${topic} is the Future for ${audience}
10. ${topic} Strategies That Actually Work for ${audience}
11. The ${topic} Breakthrough Every ${audience.slice(0, -1)} Needs
12. ${topic}: Your Competitive Advantage as a ${audience.slice(0, -1)}
13. Inside ${topic}: Expert Insights for ${audience}
14. ${topic} Mastery: Transform Your Results as a ${audience.slice(0, -1)}
15. The ${topic} Success Formula for ${audience}`;

  const hashtags = `Platform-Specific Hashtags:

📱 INSTAGRAM:
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Success #Motivation #GrowthMindset #Learn #Tips #Strategy #Goals #Innovation #Excellence #Leadership #Development #Inspiration #Progress #Community

🐦 TWITTER:
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Thread #Tips #Learning #Growth #Strategy #Success #Innovation #Leadership

💼 LINKEDIN:
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #ProfessionalDevelopment #Leadership #Innovation #Strategy #BusinessGrowth #Excellence #Success #Learning #CareerGrowth

🎥 YOUTUBE:
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Tutorial #HowTo #Tips #Guide #Learning #Education #Strategy #Success

📺 TIKTOK:
#${topic.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #Tips #Motivation #Success #Learn #Growth #Strategy #Goals #Inspiration

🔥 TRENDING:
#MondayMotivation #TipTuesday #WisdomWednesday #ThursdayThoughts #FridayFeeling #WeekendLearning #SundaySuccess`;

  return {
    blogPost,
    twitterThread,
    linkedinPost,
    youtubeScript,
    instagramCaption,
    titleBank,
    hashtags
  };
};

export const downloadContent = (content: GeneratedContent, topic: string) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `content-pack-${topic.replace(/\s+/g, '-').toLowerCase()}-${timestamp}.txt`;
  
  const formattedContent = `
CONTENT PACK: ${topic}
Generated on: ${new Date().toLocaleDateString()}
=====================================

📝 SEO BLOG POST
=====================================
${content.blogPost}

🐦 TWITTER THREAD
=====================================
${content.twitterThread}

💼 LINKEDIN POST
=====================================
${content.linkedinPost}

🎥 YOUTUBE SHORTS SCRIPT
=====================================
${content.youtubeScript}

📸 INSTAGRAM CAPTION
=====================================
${content.instagramCaption}

💡 TITLE BANK
=====================================
${content.titleBank}

#️⃣ HASHTAG COLLECTION
=====================================
${content.hashtags}

=====================================
Content generated by Content Generator Pro
`;

  const blob = new Blob([formattedContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};