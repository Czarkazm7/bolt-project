
import React from 'react';
import type { IBlogPost } from '../types';
import { CalendarIcon, UserIcon } from './icons';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: IBlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <UserIcon className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
      </div>
      <p className="text-slate-600 mb-4 flex-grow">{post.summary}</p>
      <Link to={`/blog/${post.id}`} className="text-slate-900 font-semibold hover:underline mt-auto">
        Read More &rarr;
      </Link>
    </div>
  );
};

export default BlogPostCard;