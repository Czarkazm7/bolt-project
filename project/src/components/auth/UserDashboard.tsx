import React, { useState, useEffect } from 'react';
import { User, Settings, CreditCard, FileText, BarChart3, LogOut, Crown, Calendar, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from './AuthContext';
import { supabase } from '../../lib/supaClient';

interface UserDashboardProps {
  onStartGenerator: () => void;
  onBackToLanding: () => void;
}

interface GenerationRecord {
  id: string;
  topic: string;
  created_at: string;
  payload: any;
}

interface AnalyticsData {
  totalGenerations: number;
  thisWeekGenerations: number;
  thisMonthGenerations: number;
  averagePerWeek: number;
  mostActiveDay: string;
  recentGenerations: GenerationRecord[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onStartGenerator, onBackToLanding }) => {
  const { user, logout, updateUser } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [userCredits, setUserCredits] = useState<number | null>(null);

  if (!user) return null;

  useEffect(() => {
    fetchAnalytics();
    fetchUserCredits();
  }, [user]);

  const fetchUserCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('remaining')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        return;
      }

      setUserCredits(data?.remaining || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setIsLoadingAnalytics(true);

      // Fetch all generation history for the user
      const { data: generations, error } = await supabase
        .from('generation_history')
        .select('id, topic, created_at, payload')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      if (!generations) {
        setAnalytics({
          totalGenerations: 0,
          thisWeekGenerations: 0,
          thisMonthGenerations: 0,
          averagePerWeek: 0,
          mostActiveDay: 'No data',
          recentGenerations: []
        });
        return;
      }

      // Calculate analytics
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const thisWeekGenerations = generations.filter(g => 
        new Date(g.created_at) >= oneWeekAgo
      ).length;

      const thisMonthGenerations = generations.filter(g => 
        new Date(g.created_at) >= oneMonthAgo
      ).length;

      // Calculate average per week (based on account age or 4 weeks, whichever is less)
      const accountCreated = new Date(user.createdAt);
      const weeksActive = Math.max(1, Math.min(4, Math.ceil((now.getTime() - accountCreated.getTime()) / (7 * 24 * 60 * 60 * 1000))));
      const averagePerWeek = Math.round(generations.length / weeksActive);

      // Find most active day of the week
      const dayCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
      generations.forEach(g => {
        const day = new Date(g.created_at).getDay();
        dayCount[day]++;
      });

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const mostActiveDayIndex = Object.keys(dayCount).reduce((a, b) => 
        dayCount[a] > dayCount[b] ? a : b
      );
      const mostActiveDay = dayCount[mostActiveDayIndex] > 0 ? dayNames[mostActiveDayIndex] : 'No data';

      setAnalytics({
        totalGenerations: generations.length,
        thisWeekGenerations,
        thisMonthGenerations,
        averagePerWeek,
        mostActiveDay,
        recentGenerations: generations.slice(0, 10) // Last 10 generations
      });

    } catch (error) {
      console.error('Error calculating analytics:', error);
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const usagePercentage = (user.contentPacksUsed / user.contentPacksLimit) * 100;

  const handleLogout = () => {
    logout();
    onBackToLanding();
  };

  const planFeatures = {
    starter: ['50 content packs/month', 'All 7 content formats', 'Basic tone controls', 'PDF exports'],
    pro: ['200 content packs/month', 'All 7 content formats', 'Advanced controls', 'All exports', 'Priority support'],
    agency: ['Unlimited content packs', 'All features', 'White-label options', 'API access', 'Dedicated support']
  };

  const planColors = {
    starter: 'from-green-500 to-teal-600',
    pro: 'from-blue-500 to-purple-600',
    agency: 'from-purple-500 to-pink-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={onBackToLanding} className="text-xl font-semibold text-gray-900">
                ContentCraft AI
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              {userCredits !== null && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {userCredits} credits left
                </span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={onStartGenerator}
                  className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 border-radius-custom overflow-hidden"
                >
                  <span className="absolute inset-0 border-radius-custom bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 blur-md group-hover:opacity-90 transition-all duration-300"></span>
                  <div className="relative z-10 text-left">
                    <FileText className="w-8 h-8 mb-2" />
                    <h3 className="font-semibold text-lg">Generate Content</h3>
                    <p className="text-blue-100 text-sm">Create your next content pack</p>
                  </div>
                </button>
                
                <button 
                  onClick={fetchAnalytics}
                  className="bg-gray-50 hover:bg-gray-100 p-6 border-radius-custom border border-gray-200 transition-colors text-left"
                >
                  <BarChart3 className="w-8 h-8 text-gray-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Refresh Analytics</h3>
                  <p className="text-gray-600 text-sm">Update your content stats</p>
                </button>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Analytics</h2>
              
              {isLoadingAnalytics ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span className="ml-3 text-gray-600">Loading analytics...</span>
                </div>
              ) : analytics ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 border-radius-custom">
                    <div className="text-2xl font-bold text-blue-600">{analytics.totalGenerations}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                      <FileText className="w-4 h-4 mr-1" />
                      Total Generated
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 border-radius-custom">
                    <div className="text-2xl font-bold text-green-600">{analytics.thisWeekGenerations}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      This Week
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 border-radius-custom">
                    <div className="text-2xl font-bold text-purple-600">{analytics.averagePerWeek}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Avg/Week
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 border-radius-custom">
                    <div className="text-lg font-bold text-orange-600">{analytics.mostActiveDay}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Most Active Day
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Failed to load analytics
                </div>
              )}
            </div>

            {/* Usage Statistics */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage This Month</h2>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Content Packs Generated</span>
                  <span>{user.contentPacksUsed} / {user.contentPacksLimit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${planColors[user.plan]}`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 border-radius-custom">
                  <div className="text-2xl font-bold text-gray-900">{user.contentPacksUsed}</div>
                  <div className="text-sm text-gray-600">Generated</div>
                </div>
                <div className="text-center p-4 bg-gray-50 border-radius-custom">
                  <div className="text-2xl font-bold text-gray-900">{user.contentPacksLimit - user.contentPacksUsed}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
                <div className="text-center p-4 bg-gray-50 border-radius-custom">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(usagePercentage)}%</div>
                  <div className="text-sm text-gray-600">Used</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              
              {isLoadingAnalytics ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  <span className="ml-3 text-gray-600">Loading recent activity...</span>
                </div>
              ) : analytics && analytics.recentGenerations.length > 0 ? (
                <div className="space-y-3">
                  {analytics.recentGenerations.map((generation, index) => (
                    <div key={generation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Content pack: "{generation.topic}"</p>
                          <p className="text-sm text-gray-600">{formatDate(generation.created_at)}</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Completed</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No content generated yet</p>
                  <p className="text-sm text-gray-400">Start creating your first content pack!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                {user.plan === 'agency' && <Crown className="w-5 h-5 text-yellow-500" />}
              </div>
              
              <div className={`bg-gradient-to-r ${planColors[user.plan]} text-white p-4 border-radius-custom mb-4`}>
                <h4 className="font-semibold text-lg capitalize">{user.plan}</h4>
                <p className="text-white/80 text-sm">
                  {user.plan === 'starter' && '$49/month'}
                  {user.plan === 'pro' && '$99/month'}
                  {user.plan === 'agency' && '$299/month'}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {planFeatures[user.plan].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 border-radius-custom transition-colors">
                Upgrade Plan
              </button>
            </div>

            {/* Account Settings */}
            <div className="bg-white border-radius-custom shadow-custom p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center text-left p-3 hover:bg-gray-50 border-radius-custom transition-colors">
                  <User className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Profile Settings</span>
                </button>
                <button className="w-full flex items-center text-left p-3 hover:bg-gray-50 border-radius-custom transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Billing & Payments</span>
                </button>
                <button className="w-full flex items-center text-left p-3 hover:bg-gray-50 border-radius-custom transition-colors">
                  <Settings className="w-5 h-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Preferences</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 border-radius-custom p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Our support team is here to help you get the most out of ContentCraft AI.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 border-radius-custom transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;