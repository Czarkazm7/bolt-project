import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '../services/blogService';
import BlogPostCard from '../components/BlogPostCard';
import type { IBlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">The CalculatorBear Blog</h1>
        <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">Insights on finance, health, and the power of calculation, from our team to you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
