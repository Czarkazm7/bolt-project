import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, setDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { CALCULATORS, SUPER_ADMIN_EMAIL } from '../constants';
import type { IBlogPost, IUser } from '../types';
import { auth, db } from '../firebase';
import { XIcon } from '../components/icons';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [allBlogPosts, setAllBlogPosts] = useState<IBlogPost[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [admins, setAdmins] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for the new blog post form
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [relatedCalculatorId, setRelatedCalculatorId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Admin management state
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminError, setAdminError] = useState('');

  // Auth listener
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email });
      } else {
        setCurrentUser(null);
        navigate('/admin/login'); // Redirect to login if not authenticated
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  // Firestore listener for blog posts
  useEffect(() => {
    if (!db) return;
    const postsCollectionRef = collection(db, 'posts');
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: IBlogPost[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({ 
          id: doc.id,
          ...data,
          date: (data.createdAt as Timestamp)?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || new Date().toLocaleDateString(),
          createdAt: data.createdAt as Timestamp || null,
        } as IBlogPost);
      });
      setAllBlogPosts(posts);
    }, (error) => {
      console.error("Firestore 'posts' listener error: ", error);
    });

    return () => unsubscribe();
  }, []);

  // Firestore listener for admins
  useEffect(() => {
      if (!db) return;
      const adminsCollectionRef = collection(db, 'admins');
      const unsubscribe = onSnapshot(adminsCollectionRef, (snapshot) => {
          const adminList = snapshot.docs.map(doc => doc.id);
           if (!adminList.includes(SUPER_ADMIN_EMAIL)) {
              adminList.push(SUPER_ADMIN_EMAIL);
          }
          setAdmins(adminList);
      }, (error) => {
        console.error("Firestore 'admins' listener error: ", error);
      });
      return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!auth) throw new Error("Auth service not initialized");
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim() || !currentUser?.email) {
        alert("Please fill out all required fields and ensure you are logged in.");
        return;
    }
    
    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        author: currentUser.email,
        content,
        relatedCalculatorId: relatedCalculatorId || undefined,
        createdAt: serverTimestamp()
      });
      
      // Reset form and show success message
      setTitle('');
      setSummary('');
      setContent('');
      setRelatedCalculatorId('');
      setSuccessMessage('Blog post added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add post. See console for details.");
    }
  };
  
  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
        try {
            await deleteDoc(doc(db, "posts", postId));
        } catch (e) {
            console.error("Error deleting document: ", e);
            alert("Failed to delete post. See console for details.");
        }
    }
  };

  const handleAddAdmin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (!db) throw new Error("Database not initialized");
    if (!newAdminEmail) return;
    try {
        if (newAdminEmail === SUPER_ADMIN_EMAIL) throw new Error("Cannot modify super admin.");
        await setDoc(doc(db, "admins", newAdminEmail), { role: "admin" });
        setNewAdminEmail('');
    } catch (err) {
        setAdminError(err.message);
    }
  }, [newAdminEmail]);

  const handleRemoveAdmin = useCallback(async (emailToRemove: string) => {
    if (!db) throw new Error("Database not initialized");
    if (window.confirm(`Are you sure you want to remove ${emailToRemove} as an admin?`)) {
      try {
          if (emailToRemove === SUPER_ADMIN_EMAIL) throw new Error("Cannot remove super admin.");
          await deleteDoc(doc(db, "admins", emailToRemove));
      } catch (err) {
          setAdminError(err.message);
      }
    }
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const isSuperAdmin = currentUser?.email === SUPER_ADMIN_EMAIL;

  return (
    <div className="bg-white rounded-xl p-8 md:p-12 space-y-12">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-brand-dark-hover transition-colors"
                >
                    Logout
                </button>
            </div>

            <div className="space-y-12">
                <div className="prose prose-lg max-w-none text-brand-muted">
                    <p>Welcome to the admin area. From here, you can add new content to the site or manage existing posts.</p>
                </div>
                
                {/* Add New Blog Post Form */}
                <div className="pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Add New Blog Post</h2>
                    <form onSubmit={handleAddPost} className="space-y-4">
                        <div>
                            <label htmlFor="post-title" className="block text-sm font-medium text-slate-700">Title</label>
                            <input type="text" id="post-title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="post-summary" className="block text-sm font-medium text-slate-700">Summary</label>
                            <input type="text" id="post-summary" value={summary} onChange={e => setSummary(e.target.value)} required className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="post-author" className="block text-sm font-medium text-slate-700">Author</label>
                            <input type="text" id="post-author" value={currentUser?.email || ''} readOnly className="mt-1 w-full p-3 bg-slate-200 border-transparent rounded-md cursor-not-allowed" />
                        </div>
                        <div>
                            <label htmlFor="post-content" className="block text-sm font-medium text-slate-700">Content</label>
                            <textarea id="post-content" value={content} onChange={e => setContent(e.target.value)} required rows={8} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md" placeholder="Enter post content here. Each new line will be treated as a paragraph."></textarea>
                        </div>
                        <div>
                            <label htmlFor="post-related-calc" className="block text-sm font-medium text-slate-700">Related Calculator (Optional)</label>
                            <select id="post-related-calc" value={relatedCalculatorId} onChange={e => setRelatedCalculatorId(e.target.value)} className="mt-1 w-full p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md">
                                <option value="">None</option>
                                {CALCULATORS.map(calc => (
                                    <option key={calc.id} value={calc.id}>{calc.title}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button type="submit" className="px-6 py-3 rounded-md bg-brand-primary text-white font-semibold hover:bg-brand-primary-hover transition-colors">
                                Add Post
                            </button>
                            {successMessage && <p className="text-green-600 font-medium animate-fade-in-out">{successMessage}</p>}
                        </div>
                    </form>
                </div>

                {/* Manage Blog Posts */}
                <div className="pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Manage Blog Posts</h2>
                    <div className="space-y-3">
                        {allBlogPosts.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-4 rounded-lg bg-brand-light-gray-hover">
                                <div>
                                    <p className="font-semibold text-brand-dark">{post.title}</p>
                                    <p className="text-sm text-brand-muted">{post.date}</p>
                                </div>
                                <button 
                                    onClick={() => handleDeletePost(post.id)}
                                    className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {isSuperAdmin && (
                  <div className="pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">Admin Management</h2>
                    <div className="space-y-4 max-w-lg">
                        <form onSubmit={handleAddAdmin} className="flex items-center gap-2">
                            <input
                                type="email"
                                value={newAdminEmail}
                                onChange={e => setNewAdminEmail(e.target.value)}
                                placeholder="new.admin@email.com"
                                className="flex-grow p-3 bg-brand-light-gray border-transparent focus:ring-2 focus:ring-brand-primary focus:outline-none rounded-md"
                            />
                             <button type="submit" className="py-3 px-5 bg-slate-600 text-white rounded-md font-semibold hover:bg-slate-700">
                                Add Admin
                            </button>
                        </form>
                        {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
                        <div className="space-y-2">
                          <h3 className="font-semibold">Current Admins:</h3>
                          <ul className="list-disc list-inside bg-slate-50 p-4 rounded-md">
                              {admins.map(adminEmail => (
                                  <li key={adminEmail} className="flex justify-between items-center">
                                      <span>{adminEmail} {adminEmail === SUPER_ADMIN_EMAIL && <span className="text-xs font-bold text-amber-600">(Super)</span>}</span>
                                      {adminEmail !== SUPER_ADMIN_EMAIL && (
                                          <button onClick={() => handleRemoveAdmin(adminEmail)} className="text-red-500 hover:text-red-700 p-1">
                                              <XIcon className="h-4 w-4" />
                                          </button>
                                      )}
                                  </li>
                              ))}
                          </ul>
                        </div>
                    </div>
                  </div>
                )}

            </div>
        </div>
    </div>
  );
};

export default AdminDashboardPage;