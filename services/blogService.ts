import { BLOG_POSTS as defaultPosts } from '../constants';
import type { IBlogPost } from '../types';

const CUSTOM_POSTS_KEY = 'calculatorbear_custom_posts';
const DELETED_POSTS_KEY = 'calculatorbear_deleted_default_posts';

// --- Helper Functions ---

function getFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return defaultValue;
    }
}

function setToStorage(key: string, value: any) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
    }
}

// --- Exported Functions ---

export function getCustomPosts(): IBlogPost[] {
    return getFromStorage<IBlogPost[]>(CUSTOM_POSTS_KEY, []);
}

function getDeletedDefaultPostIds(): string[] {
    return getFromStorage<string[]>(DELETED_POSTS_KEY, []);
}

export function getBlogPosts(): IBlogPost[] {
    const customPosts = getCustomPosts();
    const deletedIds = new Set(getDeletedDefaultPostIds());
    const visibleDefaultPosts = defaultPosts.filter(post => !deletedIds.has(post.id));
    // New posts appear first
    return [...customPosts, ...visibleDefaultPosts];
}

export function getBlogPostById(id: string): IBlogPost | undefined {
    return getBlogPosts().find(post => post.id === id);
}

export function addBlogPost(postData: { title: string; summary: string; author: string; content: string; relatedCalculatorId?: string }) {
    const customPosts = getCustomPosts();
    
    const newPost: IBlogPost = {
        id: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        ...postData,
    };
    
    const updatedPosts = [newPost, ...customPosts];
    setToStorage(CUSTOM_POSTS_KEY, updatedPosts);
}

export function deleteBlogPost(postId: string) {
    const isDefaultPost = defaultPosts.some(post => post.id === postId);

    if (isDefaultPost) {
        const deletedIds = getDeletedDefaultPostIds();
        if (!deletedIds.includes(postId)) {
            setToStorage(DELETED_POSTS_KEY, [...deletedIds, postId]);
        }
    } else {
        const customPosts = getCustomPosts();
        const updatedCustomPosts = customPosts.filter(post => post.id !== postId);
        setToStorage(CUSTOM_POSTS_KEY, updatedCustomPosts);
    }
}
