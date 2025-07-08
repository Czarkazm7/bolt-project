import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import { getBlogPostById, getBlogPosts } from '../services/blogService';
import Breadcrumbs from '../components/Breadcrumbs';
import { CalendarIcon, UserIcon } from '../components/icons';
import CalculatorCard from '../components/CalculatorCard';
import type { IBlogPost } from '../types';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IBlogPost | null | undefined>(undefined);
  const [recentPosts, setRecentPosts] = useState<IBlogPost[]>([]);
  
  const relatedCalculator = post ? CALCULATORS.find(c => c.id === post.relatedCalculatorId) : undefined;

  useEffect(() => {
    let isMounted = true;
    if (postId) {
        const foundPost = getBlogPostById(postId);
        const allPosts = getBlogPosts();
        if(isMounted) {
          setPost(foundPost);
          setRecentPosts(allPosts.filter(p => p.id !== postId));
        }
    }
    return () => { isMounted = false; }
  }, [postId]);

  useEffect(() => {
    if (!post) return;

    // Set document title and meta description
    document.title = `${post.title} | CalculatorBear Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.summary);
    }
    
    // Manage structured data for AEO
    const scriptId = 'json-ld-article';
    document.getElementById(scriptId)?.remove(); // Clean up old script

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      datePublished: new Date(post.date).toISOString(),
      description: post.summary,
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(articleSchema);
    document.head.appendChild(script);
    
    window.scrollTo(0, 0);

    return () => {
      // Cleanup script when component unmounts
      document.getElementById(scriptId)?.remove();
    };

  }, [post]);

  if (post === undefined) {
      return null; // or a loading spinner
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs paths={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title }]} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-4">
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-brand-muted mb-6">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-brand-muted prose-headings:text-brand-dark prose-a:text-brand-primary prose-a:font-semibold prose-strong:text-brand-dark prose-ul:list-disc prose-ul:pl-6 prose-li:my-1">
              {typeof post.content === 'string' 
                ? post.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => <p key={index}>{paragraph}</p>) 
                : post.content}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <Link to="/blog" className="text-brand-primary font-semibold hover:underline">
                &larr; Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            {relatedCalculator && (
              <div>
                <h3 className="font-semibold text-brand-dark mb-3 text-lg">Related Calculator</h3>
                <CalculatorCard calculator={relatedCalculator} />
              </div>
            )}
             <div>
                <h3 className="font-semibold text-brand-dark mb-3 text-lg">Recent Posts</h3>
                 <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ul className="space-y-3">
                        {recentPosts.slice(0, 5).map(p => (
                          <li key={p.id}>
                            <Link to={`/blog/${p.id}`} className="font-medium text-brand-dark hover:text-brand-primary text-sm">
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                  </div>
              </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPage;
