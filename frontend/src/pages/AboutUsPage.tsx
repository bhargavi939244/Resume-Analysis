import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Target, 
  Shield, 
  Heart, 
  Mail,
  History,
  TrendingUp,
  FileCheck,
  Cpu
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarGradient: string;
  initials: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

interface ValueCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export default function AboutUsPage() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [teamLikes, setTeamLikes] = useState<Record<string, number>>({ "Bhargavi": 142 });
  const [hasLikedTeam, setHasLikedTeam] = useState<Record<string, boolean>>({});

  const values: ValueCard[] = [
    {
      title: "Practical AI Integration",
      description: "My primary focus is finding tangible, functional ways to integrate artificial intelligence and machine learning models into real-world applications that solve day-to-day problems.",
      icon: <Cpu className="w-6 h-6 text-orange-600" />,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "Peers Empowerment",
      description: "Designed this project to level the playing field for fellow students and job seekers, helping them analyze their resumes against Applicant Tracking Systems (ATS) rules.",
      icon: <Target className="w-6 h-6 text-indigo-600" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Constant Curiosity",
      description: "Built out of a genuine interest to explore, break things, and learn new technical architectures, experimenting with AI-driven models to build random and exciting projects.",
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const timeline: TimelineEvent[] = [
    {
      year: "2026",
      title: "Project Genesis & AI Integration",
      description: "Resume Analysis was designed and built as a personal project, successfully integrating deep local keyword parsers, OpenAI model matching, and full-stack React-FastAPI architectures into a single portfolio application."
    }
  ];

  const creator: TeamMember = {
    name: "Yannam Bhargavi",
    role: "Software Engineer | Project Creator",
    bio: "I am a Software Engineer with a strong interest in Artificial Intelligence and Machine Learning. Resume Analysis is one of my personal projects, born out of my curiosity to explore AI models and develop random things. My main focus is discovering how to seamlessly integrate AI into applications to make software feel alive and practical.",
    avatarGradient: "from-orange-500 via-rose-500 to-amber-500",
    initials: "YB",
    github: "https://github.com/bhargavi939244",
    linkedin: "https://www.linkedin.com/in/bhargaviyannam/",
    email: "yannambhargavi93@gmail.com"
  };

  const handleLikeMember = (name: string) => {
    const key = name.split(" ")[1] || name; // Bhargavi
    if (hasLikedTeam[key]) {
      setTeamLikes(prev => ({ ...prev, [key]: prev[key] - 1 }));
      setHasLikedTeam(prev => ({ ...prev, [key]: false }));
    } else {
      setTeamLikes(prev => ({ ...prev, [key]: prev[key] + 1 }));
      setHasLikedTeam(prev => ({ ...prev, [key]: true }));
    }
  };

  return (
    <div className="bg-[#fffcf8] min-h-screen pb-20">
      
      {/* 1. MISSION HEADER WITH DARK GLOW GRAPHICS */}
      <section className="bg-[#10141e] text-white py-20 relative overflow-hidden">
        {/* Glow meshes */}
        <div className="absolute top-0 left-0 -mt-24 -ml-24 w-[35rem] h-[35rem] bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mb-24 -mr-24 w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 text-[11px] font-black px-3.5 py-1.5 rounded-full border border-orange-500/20 uppercase tracking-widest mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Project Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Exploring AI to Solve <span className="text-[#ff6900]">Real-World Problems</span>
          </h1>
          <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Resume Analysis is a personal project built to demystify Applicant Tracking Systems (ATS) and test the limits of generative AI integration in resume parsing.
          </p>
        </div>
      </section>

      {/* 2. STATS CHIPS SECTION */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/50 shadow-xl shadow-orange-100/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ff6900] flex items-center justify-center border border-orange-100 mb-3">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">Personal</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Project Classification</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 border-y md:border-y-0 md:border-x border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">AI & ML</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Specialization Focus</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">100%</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Independent Build</p>
          </div>

        </div>
      </section>

      {/* 3. MEET THE CREATOR SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Meet the Developer</h2>
          <p className="text-gray-500 text-sm mt-3 font-medium">The student driving this project out of interest, curiosity, and code.</p>
        </div>

        {/* Centered Large Profile Card */}
        <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-100/5 p-8 md:p-12 hover:shadow-2xl hover:shadow-orange-100/15 transition-all duration-300 relative overflow-hidden group max-w-2xl mx-auto">
          {/* Visual Background Decoration */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-36 h-36 bg-orange-50 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
            {/* Avatar Initials Block */}
            <div className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${creator.avatarGradient} flex items-center justify-center text-white font-extrabold text-2xl shadow-md border-4 border-white flex-shrink-0`}>
              {creator.initials}
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-black text-slate-900">{creator.name}</h3>
              <p className="text-[#ff6900] text-xs font-extrabold uppercase tracking-wider mt-1">{creator.role}</p>
              
              <p className="text-gray-600 text-sm mt-5 leading-relaxed font-medium">
                {creator.bio}
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                {/* Social icons */}
                <div className="flex items-center gap-4">
                  {creator.github && (
                    <a href={creator.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#ff6900] transition">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                  )}
                  {creator.linkedin && (
                    <a href={creator.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#ff6900] transition">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {creator.email && (
                    <a href={`mailto:${creator.email}`} className="text-gray-400 hover:text-[#ff6900] transition">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* React / Like bios */}
                <button 
                  onClick={() => handleLikeMember(creator.name)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition border ${
                    hasLikedTeam["Bhargavi"] 
                      ? 'text-red-500 bg-red-50 border-red-200' 
                      : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLikedTeam["Bhargavi"] ? 'fill-current' : ''}`} />
                  <span>{teamLikes["Bhargavi"] || 0} Likes</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PRINCIPLES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Why I Built Resume Analysis</h2>
          <p className="text-gray-500 text-sm mt-3 font-medium">The vision and educational driving force behind this project.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-orange-100/50 shadow-lg shadow-orange-100/5 hover:shadow-xl hover:shadow-orange-100/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-4">{val.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {val.description}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                <span className={`w-6 h-1.5 rounded-full bg-gradient-to-r ${val.color}`}></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MY JOURNEY (VERTICAL TIMELINE - ONLY 2026) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <History className="w-6 h-6 text-[#ff6900]" />
            Project Milestone
          </h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Click on the milestone to view verification tags</p>
        </div>

        <div className="relative border-l-2 border-orange-100 ml-4 md:ml-28 py-2">
          {timeline.map((event, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <div 
                key={idx}
                onClick={() => setSelectedMilestone(isSelected ? null : idx)}
                className="relative pl-8 md:pl-12 cursor-pointer group"
              >
                {/* Year tag left on larger screens */}
                <div className="hidden md:block absolute right-full mr-10 top-0.5 text-right">
                  <span className="text-2xl font-black text-slate-900">{event.year}</span>
                  <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mt-1">Project Genesis</p>
                </div>

                {/* Timeline dot */}
                <div className={`absolute left-0 -translate-x-[9px] top-2.5 w-4 h-4 rounded-full border-2 bg-white transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#ff6900] scale-125 bg-orange-50' 
                    : 'border-orange-200 group-hover:border-[#ff6900]'
                }`}></div>

                {/* Milestone detail card */}
                <div className={`p-6 rounded-2xl bg-white border transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#ff6900] shadow-md shadow-orange-500/5 bg-orange-50/5' 
                    : 'border-orange-50 group-hover:border-orange-200 group-hover:shadow-sm'
                }`}>
                  <span className="md:hidden inline-block text-xs font-black text-[#ff6900] uppercase tracking-wider mb-1">
                    {event.year} • Milestone
                  </span>
                  <h3 className="text-base font-black text-slate-800 leading-snug group-hover:text-[#ff6900] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
                    {event.description}
                  </p>
                  
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-orange-100 text-[11px] text-[#ff6900] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span>✓ Core Functionality Built & Validated</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
