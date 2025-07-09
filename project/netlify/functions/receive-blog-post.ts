import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK only once
if (!initializeApp.length) { // Check if app is already initialized
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG || '{}');
  if (Object.keys(serviceAccount).length === 0) {
    console.error("FIREBASE_ADMIN_SDK_CONFIG environment variable is not set or is empty.");
    // You might want to return an error response here if this is critical
  } else {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }
}

const db = getFirestore();

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // Basic authentication: Check for a shared secret
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET || event.headers['x-webhook-secret'] !== WEBHOOK_SECRET) {
    return {
      statusCode: 401,
      body: "Unauthorized: Invalid or missing webhook secret.",
    };
  }

  try {
    const { title, content } = JSON.parse(event.body || '{}');

    if (!title || !content) {
      return {
        statusCode: 400,
        body: "Missing 'title' or 'content' in request body.",
      };
    }

    // Add blog post to Firestore
    await db.collection('posts').add({
      title,
      content,
      author: 'n8n Automation', // Or any other default author
      createdAt: new Date(),
      // You can add other fields like summary, relatedCalculatorId if needed
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Blog post added successfully!" }),
    };
  } catch (error) {
    console.error("Error processing webhook:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process webhook." }),
    };
  }
};

export { handler };
