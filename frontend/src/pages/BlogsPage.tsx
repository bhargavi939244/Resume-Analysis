import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  X, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  Cpu, 
  Compass, 
  CheckCircle,
  Heart
} from 'lucide-react';
import { blogs, aiNews } from '../services/blogsData';
import type { Blog, AINews } from '../services/blogsData';

// Sector badge color helper
const getSectorStyles = (sector: string) => {
  switch (sector.toLowerCase()) {
    case 'healthcare':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
    case 'robotics':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
    case 'devtools':
      return 'bg-purple-50 text-purple-700 border-purple-200/50';
    case 'energy':
      return 'bg-amber-50 text-amber-700 border-amber-200/50';
    case 'finance':
      return 'bg-blue-50 text-blue-700 border-blue-200/50';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200/50';
  }
};

const mockNewUpdates: AINews[] = [
  {
    id: "n-add-1",
    title: "AI-Controlled Fusion Reactor Sustains Stable Net-Energy Plasma",
    sector: "Energy",
    summary: "Deep reinforcement learning models successfully regulated magnetic containment fields in a tokamak reactor, maintaining stable plasma for an unprecedented 15 minutes.",
    source: "Wired Science",
    time: "Just now"
  },
  {
    id: "n-add-2",
    title: "Open-Source AI Agent Completes 84% of Complex Software Tasks in Standard Benchmark",
    sector: "DevTools",
    summary: "A new lightweight model beats proprietary AI systems, autonomously modifying files and running builds to solve software bugs in repository test beds.",
    source: "Hacker News",
    time: "2m ago"
  },
  {
    id: "n-add-3",
    title: "AI Diagnoses Early-Stage Retinal Diseases with 99.4% Accuracy",
    sector: "Healthcare",
    summary: "Clinical trials of a newly approved ophthalmology model demonstrate capability to detect anomalies months before typical hardware scanners.",
    source: "Nature Medicine",
    time: "8m ago"
  }
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  // AI News State
  const [newsList, setNewsList] = useState<AINews[]>(aiNews);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsUpdateIndex, setNewsUpdateIndex] = useState(0);
  const [showRefreshToast, setShowRefreshToast] = useState(false);
  
  // Blog Interactivity (Simulated)
  const [likes, setLikes] = useState<Record<string, number>>({ "1": 42, "2": 28, "3": 35 });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Categories list
  const categories = ["All", "Resume", "Interview", "AI"];

  // Filter logic for blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured Hero Blog (always the first blog in list if available)
  const featuredBlog = blogs[0];
  const regularBlogs = blogs.slice(1);

  // Filter regular blogs based on filters
  const displayBlogsList = selectedCategory === "All" && searchQuery === "" 
    ? regularBlogs 
    : filteredBlogs;

  // Handle news refresh simulation
  const handleRefreshNews = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    setTimeout(() => {
      if (newsUpdateIndex < mockNewUpdates.length) {
        const newItem = mockNewUpdates[newsUpdateIndex];
        setNewsList(prev => [newItem, ...prev]);
        setNewsUpdateIndex(prev => prev + 1);
        setShowRefreshToast(true);
        setTimeout(() => setShowRefreshToast(false), 3000);
      } else {
        alert("The AI trends feed is currently up to date!");
      }
      setIsRefreshing(false);
    }, 1200);
  };

  const handleLike = (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[blogId]) {
      setLikes(prev => ({ ...prev, [blogId]: prev[blogId] - 1 }));
      setHasLiked(prev => ({ ...prev, [blogId]: false }));
    } else {
      setLikes(prev => ({ ...prev, [blogId]: prev[blogId] + 1 }));
      setHasLiked(prev => ({ ...prev, [blogId]: true }));
    }
  };

  // Scroll reading progress calculation in modal
  const [scrollProgress, setScrollProgress] = useState(0);
  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPercent = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    // Reset scroll progress when active blog changes
    setScrollProgress(0);
  }, [selectedBlog]);

  return (
    <div className="bg-[#fffcf8] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-[#ff6900] text-[11px] font-extrabold px-3 py-1.5 rounded-full border border-orange-100 uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Insights & Innovation
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Resume Analysis Hub
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Get expert career advice, optimize your resume for ATS algorithms, and stay informed on how artificial intelligence is rewriting industry landscapes in real-time.
          </p>
        </div>

        {/* 1. FEATURED ARTICLE HERO BANNER */}
        {featuredBlog && selectedCategory === "All" && searchQuery === "" && (
          <div className="mb-12 bg-white rounded-[2.5rem] border border-orange-100/50 shadow-xl shadow-orange-100/10 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/20 transition-all duration-500">
            <div className="flex flex-col lg:flex-row min-h-[420px]">
              
              {/* Graphic Left */}
              <div className="lg:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 text-white">
                {/* Floating decor blobs */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>
                
                {/* Custom dynamic visual element */}
                <div className="absolute inset-0 opacity-15 font-mono text-[10px] select-none p-6 overflow-hidden pointer-events-none text-left leading-normal whitespace-pre">
                  {"// ATS Evaluation Algorithm\nfunction analyzeCV(resume) {\n  let score = 0;\n  const matches = parseKeywords(resume.text, jobDescription.keywords);\n  score = (matches.length / jobDescription.keywords.length) * 100;\n  return {\n    atsScore: Math.round(score),\n    hasFormattingBugs: detectTablesAndImages(resume.structure),\n    missingTerms: getMissingTerms(matches)\n  };\n}"}
                </div>

                <div className="flex justify-between items-start z-10">
                  <span className="bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/25">
                    ★ Featured Article
                  </span>
                  <span className="text-white/80 font-bold text-xs uppercase tracking-wide flex items-center gap-1 bg-black/15 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <div className="z-10 mt-16 lg:mt-24">
                  <span className="text-orange-100 font-bold text-xs uppercase tracking-widest">{featuredBlog.category} Guide</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 leading-tight drop-shadow-md">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-orange-50/90 text-sm mt-4 leading-relaxed font-medium max-w-xl">
                    {featuredBlog.description}
                  </p>
                </div>

                <div className="z-10 mt-8 flex justify-between items-center border-t border-white/20 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm uppercase">
                      {featuredBlog.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-xs">{featuredBlog.author}</p>
                      <p className="text-[10px] text-orange-200 font-semibold">{featuredBlog.date}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Text & Quick Review Right */}
              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ff6900]"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Why it matters</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug">
                    Resumes are the keys to interviews. Optimization is no longer optional in an automated hiring ecosystem.
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100/50">
                      <p className="text-[#ff6900] text-sm font-bold">Standard Formats</p>
                      <p className="text-xs text-gray-600 font-medium mt-1 leading-normal">Using standard tables and single-column formatting guarantees the reader reads it.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-orange-50/40 border border-orange-100/50">
                      <p className="text-[#ff6900] text-sm font-bold">Keyword Density</p>
                      <p className="text-xs text-gray-600 font-medium mt-1 leading-normal">Tailor technical skills and tools directly matching descriptions to rank higher.</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed">
                    Most companies utilize software systems (ATS) that parse, evaluate, and rank applicants. Elena Vance breaks down formatting protocols, files constraints, and keyword matching.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                  <button 
                    onClick={() => setSelectedBlog(featuredBlog)}
                    className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold py-3.5 px-8 rounded-2xl text-xs uppercase tracking-wider transition duration-300 shadow-md shadow-orange-500/20 flex items-center gap-2 group cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Full Guide
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                    <button 
                      onClick={(e) => handleLike(featuredBlog.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition ${
                        hasLiked[featuredBlog.id] 
                          ? 'text-red-500 bg-red-50 border-red-200' 
                          : 'hover:text-red-500 hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${hasLiked[featuredBlog.id] ? 'fill-current' : ''}`} />
                      {likes[featuredBlog.id] || 0} Likes
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 2-COLUMN SPLIT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT COLUMN: Search, Filters, and Blogs Grid (2/3 width) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Search & Filter Component */}
            <div className="bg-white p-5 rounded-3xl border border-orange-100/50 shadow-md shadow-orange-100/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-grow max-w-sm">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search articles, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#fffbf5] border border-orange-100/70 rounded-xl text-xs text-gray-900 placeholder-gray-500 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold transition-all"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all duration-200 border ${
                      selectedCategory === category
                        ? "bg-[#ff6900] border-[#ff6900] text-white shadow-md shadow-orange-500/10"
                        : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:text-[#ff6900]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

            </div>

            {/* List Header */}
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#ff6900]" />
                {selectedCategory === "All" && searchQuery === "" ? "More Career Resources" : "Search Results"}
              </h2>
              <span className="text-xs font-bold text-gray-500">
                Showing {displayBlogsList.length} articles
              </span>
            </div>

            {/* Grid list of blogs */}
            {displayBlogsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayBlogsList.map((blog) => (
                  <article 
                    key={blog.id} 
                    className="bg-white rounded-3xl overflow-hidden border border-orange-100/40 shadow-md shadow-orange-100/5 hover:shadow-xl hover:shadow-orange-100/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
                  >
                    
                    {/* Card Gradient Header Graphic */}
                    <div className={`h-40 w-full bg-gradient-to-br ${blog.gradient} relative overflow-hidden flex items-center justify-center p-6 text-white`}>
                      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
                      
                      <div className="text-center z-10">
                        <span className="inline-block bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2.5 border border-white/25">
                          {blog.category}
                        </span>
                        <h3 className="font-extrabold text-base leading-snug px-1.5 text-white drop-shadow-md">
                          {blog.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Details Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      
                      {/* Meta dates and times */}
                      <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {blog.readTime}
                        </span>
                      </div>

                      {/* Snippet summary */}
                      <p className="text-gray-600 text-xs leading-relaxed mb-4 flex-grow">
                        {blog.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {blog.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-orange-50 text-[#ff6900] text-[9px] font-bold px-2 py-0.5 rounded-full border border-orange-100/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions footer */}
                      <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-2">
                        <button 
                          onClick={() => setSelectedBlog(blog)}
                          className="text-[#ff6900] font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 group-hover:text-[#e05d00] transition"
                        >
                          Read Article
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                        </button>
                        
                        <button 
                          onClick={(e) => handleLike(blog.id, e)}
                          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full transition ${
                            hasLiked[blog.id] 
                              ? 'text-red-500 bg-red-50' 
                              : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasLiked[blog.id] ? 'fill-current' : ''}`} />
                          {likes[blog.id] || 0}
                        </button>
                      </div>

                    </div>

                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-orange-100/40 shadow-inner">
                <p className="text-gray-500 font-bold text-sm mb-1">No articles matched your search filters.</p>
                <p className="text-[11px] text-gray-400">Try searching for other keywords or reset your categories filter.</p>
              </div>
            )}

            {/* Newsletter CTA at the bottom of the list */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden border border-gray-800 mt-6 shadow-lg shadow-indigo-950/10">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
                    Weekly Career Accelerator
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 leading-normal max-w-md">
                    Subscribe to receive tailored resume advice, interview guides, and key AI updates directly in your inbox. No spam.
                  </p>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to Resume Analysis Accelerator!");
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="flex w-full md:w-auto max-w-sm gap-2"
                >
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    required
                    className="bg-white/10 text-white text-xs px-4 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-orange-400 placeholder-gray-400 flex-grow font-bold"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#ff6900] hover:bg-[#e05d00] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-orange-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: AI INVENTIONS & NEWS FEED SIDEBAR (1/3 width) */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-24">
            
            <div className="bg-white rounded-[2rem] border border-orange-100/50 shadow-xl shadow-orange-100/5 p-6 overflow-hidden relative">
              
              {/* Floating notification for live sync */}
              {showRefreshToast && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-20 animate-bounce">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                  Live Sync Complete!
                </div>
              )}

              {/* Feed Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-[#ff6900] border border-orange-100">
                    <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-none">AI Inventions Feed</h3>
                    <div className="flex items-center gap-1 mt-1 leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                      <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Live Updates</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Live Sync Button */}
                <button 
                  onClick={handleRefreshNews}
                  disabled={isRefreshing}
                  className={`flex items-center gap-1.5 bg-[#fffcf8] hover:bg-orange-50 text-[#ff6900] border border-orange-100 px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 cursor-pointer disabled:opacity-50`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Sync Feed
                </button>
              </div>

              {/* Feed Description */}
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4 border-b border-gray-50 pb-3">
                Tracking breakthroughs and inventions in artificial intelligence that are transforming industry requirements. Keep your skills aligned.
              </p>

              {/* News Items List */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {newsList.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#fffdfa] border border-orange-100/30 hover:border-[#ff6900]/30 hover:bg-orange-50/10 transition-all duration-200 flex flex-col gap-2 relative group"
                  >
                    {/* Top Row: Sector Badge and Timestamp */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getSectorStyles(item.sector)}`}>
                        {item.sector}
                      </span>
                      <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">{item.time}</span>
                    </div>

                    {/* Headline Title */}
                    <h4 className="font-extrabold text-xs text-slate-800 leading-snug group-hover:text-[#ff6900] transition-colors">
                      {item.title}
                    </h4>

                    {/* Summary */}
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Publisher Source */}
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold tracking-wide mt-1">
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>Source: {item.source}</span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Feed bottom tip */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-medium leading-normal italic">
                  💡 Tip: Add these key emerging technologies to your skills bank as you upskill!
                </p>
              </div>

            </div>

          </aside>

        </div>

      </div>

      {/* ARTICLE READER MODAL DIALOG */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fffdfb] w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden border border-orange-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Scroll Progress Bar */}
            <div className="w-full bg-gray-100 h-1.5 sticky top-0 z-30">
              <div 
                className="bg-gradient-to-r from-[#ff6900] to-amber-500 h-1.5 transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Modal Header banner */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${selectedBlog.gradient} text-white flex justify-between items-start relative`}>
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-36 w-36 bg-white/10 rounded-full blur-xl"></div>
              
              <div className="z-10 pr-6">
                <span className="bg-white/20 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/25">
                  {selectedBlog.category} Guide
                </span>
                <h2 className="text-xl sm:text-2xl font-black mt-3 leading-tight drop-shadow-md">
                  {selectedBlog.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-[10px] font-bold uppercase tracking-wider mt-4 border-t border-white/15 pt-3.5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    By {selectedBlog.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedBlog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedBlog.readTime}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedBlog(null)}
                className="bg-white/15 hover:bg-white/25 text-white p-2 rounded-xl transition duration-200 z-10 focus:outline-none flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Scroll Container */}
            <div 
              className="p-6 sm:p-10 overflow-y-auto flex-grow bg-white"
              onScroll={handleModalScroll}
            >
              <div className="prose max-w-none text-gray-700 text-[14px] leading-relaxed space-y-6">
                
                {/* Highlights Summary banner */}
                <p className="text-slate-900 font-bold text-base border-l-4 border-[#ff6900] pl-4.5 italic bg-[#fffdf8] py-3.5 pr-4 rounded-r-xl">
                  {selectedBlog.description}
                </p>

                {/* Paragraph Content parsing */}
                <div className="space-y-5 text-gray-700 font-medium">
                  {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                    const text = paragraph.trim();
                    if (!text) return null;
                    
                    // Style bullet lists or section steps nicely
                    if (text.startsWith("1.") || text.startsWith("2.") || text.startsWith("3.") || text.startsWith("4.")) {
                      return (
                        <div key={index} className="bg-orange-50/20 p-5 rounded-2xl border border-orange-100/50 my-4 text-gray-800">
                          <p className="font-bold text-slate-900 text-sm">{text.split('\n')[0]}</p>
                          {text.split('\n').slice(1).map((line, i) => (
                            <p key={i} className="mt-2 text-xs text-gray-600 font-medium leading-relaxed">{line}</p>
                          ))}
                        </div>
                      );
                    }
                    
                    if (text.startsWith("-")) {
                      return (
                        <div key={index} className="flex items-start gap-2.5 pl-3.5 my-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                          <span className="text-[#ff6900] font-black text-sm mt-0.5">•</span>
                          <p className="text-xs text-slate-800 font-medium">{text.replace(/^[-\s]+/, '')}</p>
                        </div>
                      );
                    }

                    return <p key={index} className="leading-relaxed">{text}</p>;
                  })}
                </div>

              </div>

              {/* Tags panel inside modal */}
              <div className="flex flex-wrap gap-2 mt-8 pt-5 border-t border-gray-100">
                {selectedBlog.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-[#fff9f2] text-[#ff6900] text-[10px] font-extrabold px-3 py-1 rounded-full border border-orange-100/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Related Articles Suggestion (Horizontal Cards) */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#ff6900]" />
                  Related Career Advice
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blogs
                    .filter(b => b.id !== selectedBlog.id)
                    .slice(0, 2)
                    .map((relatedBlog) => (
                      <div 
                        key={relatedBlog.id}
                        onClick={() => setSelectedBlog(relatedBlog)}
                        className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-[#fffdf8] transition-all duration-200 cursor-pointer flex flex-col gap-1.5"
                      >
                        <span className="text-[9px] font-black text-[#ff6900] uppercase tracking-widest">{relatedBlog.category}</span>
                        <h5 className="font-extrabold text-xs text-slate-800 leading-snug">{relatedBlog.title}</h5>
                        <p className="text-[11px] text-gray-500 font-medium line-clamp-2 mt-1 leading-relaxed">{relatedBlog.description}</p>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={(e) => handleLike(selectedBlog.id, e)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition ${
                  hasLiked[selectedBlog.id] 
                    ? 'text-red-500 bg-red-50 border-red-200' 
                    : 'text-gray-500 bg-white hover:text-red-500 hover:bg-gray-50 border-gray-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked[selectedBlog.id] ? 'fill-current' : ''}`} />
                {likes[selectedBlog.id] || 0} Likes
              </button>

              <button 
                onClick={() => setSelectedBlog(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2 px-6 rounded-xl text-xs uppercase tracking-wider transition duration-200 cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
