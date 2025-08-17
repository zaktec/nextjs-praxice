import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const redis = createClient({
    url: process.env.REDIS_URL
  });
  
  try {
    await redis.connect();
    await redis.set("item", "test-value");
    const result = await redis.get("item");
    await redis.disconnect();
    return NextResponse.json({ result, status: 'connected' });
  } catch (error: any) {
    console.error('Redis error:', error);
    return NextResponse.json({ 
      error: error.message || 'Redis connection failed',
      url: process.env.REDIS_URL ? 'URL provided' : 'No URL'
    }, { status: 503 });
  }
};