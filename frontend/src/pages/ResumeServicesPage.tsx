import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  CheckCircle, 
  Download, 
  Briefcase, 
  Terminal, 
  TrendingUp, 
  RefreshCw 
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: string;
  layoutType: string;
}

export default function ResumeServicesPage() {
  const [activeTab, setActiveTab] = useState<'coverletter' | 'bullets' | 'templates'>('coverletter');

  // AI Cover Letter States
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [skills, setSkills] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Bullet point Optimizer States
  const [rawBullet, setRawBullet] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedBullets, setOptimizedBullets] = useState<string[]>([]);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  // Templates list
  const templates: Template[] = [
    {
      id: "t1",
      name: "Technical Minimalist",
      category: "Developer / Engineer",
      description: "LaTeX-inspired single column layout. Ideal for software engineers, data scientists, and technical specialists who need high information density.",
      difficulty: "Highly Recommended for ATS",
      layoutType: "latex"
    },
    {
      id: "t2",
      name: "Executive Classic",
      category: "Management / Finance",
      description: "Harvard-standard traditional layout. Features centered headers and horizontal divider lines. Clean, trustworthy, and timeless.",
      difficulty: "Standard ATS Compliant",
      layoutType: "classic"
    },
    {
      id: "t3",
      name: "Modern Professional",
      category: "Marketing / Design",
      description: "Minimalist formatting with a subtle warm sidebar. Balances visual aesthetics with strict ATS parsing readability rules.",
      difficulty: "Modern ATS Checked",
      layoutType: "modern"
    }
  ];

  const handleGenerateCoverLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !companyName || !jobDesc) {
      alert("Please fill out the Job Title, Company, and Job Description fields.");
      return;
    }
    
    setIsGenerating(true);
    setGeneratedLetter('');
    setCopiedLetter(false);

    setTimeout(() => {
      const skillsSection = skills 
        ? `Given my experience with ${skills}, I am confident in my ability to hit the ground running.`
        : "With my background in software development and technical systems, I am excited to contribute to your core deliverables from day one.";

      const letterText = `Dear Hiring Team at ${companyName},

I am writing to express my strong interest in the ${jobTitle} position currently open at ${companyName}. With a strong background in software engineering, a curiosity for implementing cutting-edge solutions, and a track record of driving system optimizations, I am eager to bring my capabilities to your engineering team.

${skillsSection} During my recent projects, I focused heavily on integrating intelligent architectures, streamlining database workflows, and designing responsive components. I pride myself on writing clean, scalable code and collaborating effectively to resolve complex engineering bottlenecks.

I am particularly drawn to ${companyName} because of your commitment to technical innovation and developer-friendly ecosystems. I would welcome the opportunity to discuss how my technical expertise and problem-solving skills align with your current goals.

Thank you for your time and consideration.

Sincerely,
[Your Name]`;

      // Typewriter simulator
      let currentLength = 0;
      const interval = setInterval(() => {
        currentLength += 20;
        setGeneratedLetter(letterText.slice(0, currentLength));
        if (currentLength >= letterText.length) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 30);
    }, 1000);
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const handleOptimizeBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawBullet.trim()) {
      alert("Please paste a bullet point first!");
      return;
    }

    setIsOptimizing(true);
    setOptimizedBullets([]);
    setCopiedBulletIdx(null);

    setTimeout(() => {
      const cleaned = rawBullet.trim().replace(/^[-•*]\s*/, "");
      
      const option1 = `🚀 Spearheaded the implementation of "${cleaned}" using scalable system practices, boosting workflow efficiency by 28%.`;
      const option2 = `📈 Tailored and optimized "${cleaned}" across production applications, eliminating data bottlenecks and reducing load latency by 35%.`;
      const option3 = `💡 Refactored codebase modules to support "${cleaned}," collaborating with team loops to deliver features 2 weeks ahead of schedule.`;
      
      setOptimizedBullets([option1, option2, option3]);
      setIsOptimizing(false);
    }, 1200);
  };

  const handleCopyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(index);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleDownloadTemplate = (templateName: string) => {
    alert(`Downloading ${templateName}_ATS_Template.docx. Make sure to edit this in MS Word or Google Docs using a single-column layout!`);
  };

  return (
    <div className="bg-[#fffcf8] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-[#ff6900] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full border border-orange-100 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Resume Optimization Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Developer Services & Tools
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Enhance your career profiles with our custom self-service tooling. Generate tailored AI cover letters, rewrite bullet points with impact metrics, or download strict ATS-compatible template architectures.
          </p>
        </div>

        {/* TAB BUTTONS BAR */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl border border-orange-100/50 shadow-md shadow-orange-100/5 flex gap-1">
            <button
              onClick={() => setActiveTab('coverletter')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'coverletter'
                  ? 'bg-[#ff6900] text-white shadow-md shadow-orange-500/10'
                  : 'text-gray-600 hover:text-[#ff6900] hover:bg-orange-50/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              AI Cover Letter Writer
            </button>
            <button
              onClick={() => setActiveTab('bullets')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'bullets'
                  ? 'bg-[#ff6900] text-white shadow-md shadow-orange-500/10'
                  : 'text-gray-600 hover:text-[#ff6900] hover:bg-orange-50/50'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Bullet Point Optimizer
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'templates'
                  ? 'bg-[#ff6900] text-white shadow-md shadow-orange-500/10'
                  : 'text-gray-600 hover:text-[#ff6900] hover:bg-orange-50/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              ATS Templates Hub
            </button>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="max-w-5xl mx-auto">
          
          {/* TAB 1: COVER LETTER WRITER */}
          {activeTab === 'coverletter' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Form Input Left */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100/50 shadow-xl shadow-orange-100/5">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-[#ff6900]" />
                  Letter Generator
                </h3>
                <form onSubmit={handleGenerateCoverLetter} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Job Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Frontend Engineer" 
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                      className="bg-[#fffcf8] border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Company Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Google" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="bg-[#fffcf8] border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Keywords / Skills to Highlight</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React, TypeScript, TailwindCSS" 
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="bg-[#fffcf8] border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Job Description *</label>
                    <textarea 
                      placeholder="Paste key responsibilities or requirements from the posting..." 
                      rows={5}
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      required
                      className="bg-[#fffcf8] border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isGenerating}
                    className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition w-full shadow-md shadow-orange-500/10 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isGenerating ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Writing Tailored Letter...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Generate Cover Letter</>
                    )}
                  </button>
                </form>
              </div>

              {/* Output Display Right */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100/50 shadow-xl shadow-orange-100/5 flex flex-col min-h-[460px] justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-orange-50/50 rounded-full blur-xl"></div>
                
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">AI Tailored Draft</h3>
                    {generatedLetter && (
                      <button 
                        onClick={handleCopyLetter}
                        className="text-[#ff6900] hover:text-[#e05d00] text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-100/70 hover:bg-orange-50/30 transition cursor-pointer"
                      >
                        {copiedLetter ? (
                          <><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy Text</>
                        )}
                      </button>
                    )}
                  </div>

                  {generatedLetter ? (
                    <div className="bg-[#fffcf8] p-5 rounded-2xl border border-orange-100/30 font-mono text-[11px] text-gray-800 whitespace-pre-wrap max-h-[340px] overflow-y-auto leading-relaxed shadow-inner">
                      {generatedLetter}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 text-gray-400 gap-3">
                      <FileText className="w-12 h-12 text-gray-200" />
                      <p className="text-xs font-bold">Fill in the job details on the left and click generate to write your tailored cover letter.</p>
                    </div>
                  )}
                </div>

                {generatedLetter && (
                  <p className="text-[10px] text-gray-400 font-bold mt-4 text-center leading-normal italic">
                    💡 Tip: Be sure to replace the bracketed placeholders [Your Name] before exporting.
                  </p>
                )}

              </div>

            </div>
          )}

          {/* TAB 2: BULLET OPTIMIZER */}
          {activeTab === 'bullets' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Form Input Left */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100/50 shadow-xl shadow-orange-100/5">
                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-1.5">
                  <Terminal className="w-4.5 h-4.5 text-[#ff6900]" />
                  Bullet Enhancer
                </h3>
                <form onSubmit={handleOptimizeBullet} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Original Bullet Point *</label>
                    <textarea 
                      placeholder="e.g. Worked on fixing bugs and adding some python scripts for backend stuff." 
                      rows={6}
                      value={rawBullet}
                      onChange={(e) => setRawBullet(e.target.value)}
                      required
                      className="bg-[#fffcf8] border border-orange-100 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 w-full focus:outline-none focus:border-[#ff6900] focus:ring-1 focus:ring-[#ff6900] font-bold resize-none leading-relaxed"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isOptimizing}
                    className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition w-full shadow-md shadow-orange-500/10 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isOptimizing ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Tailoring with Metrics...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Optimize Bullet Point</>
                    )}
                  </button>
                </form>
              </div>

              {/* Outputs Right */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-orange-100/50 shadow-xl shadow-orange-100/5 min-h-[380px] flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4.5 h-4.5 text-green-500" />
                    High-Impact Google X-Y-Z Variations
                  </h3>

                  {optimizedBullets.length > 0 ? (
                    <div className="space-y-4">
                      {optimizedBullets.map((bullet, idx) => (
                        <div 
                          key={idx}
                          className="bg-[#fffdfa] p-4 rounded-xl border border-orange-100/30 hover:border-[#ff6900]/30 transition duration-200 relative group flex items-start justify-between gap-3"
                        >
                          <p className="text-xs text-slate-800 font-medium leading-relaxed pr-8">
                            {bullet}
                          </p>
                          <button 
                            onClick={() => handleCopyBullet(bullet, idx)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-[#ff6900] transition cursor-pointer"
                          >
                            {copiedBulletIdx === idx ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16 text-gray-400 gap-3">
                      <Terminal className="w-12 h-12 text-gray-200" />
                      <p className="text-xs font-bold max-w-xs">Input your current resume description on the left. We will rewrite it into quantifiable, action-oriented engineering bullet points.</p>
                    </div>
                  )}
                </div>

                {optimizedBullets.length > 0 && (
                  <p className="text-[10px] text-gray-400 font-bold mt-6 text-center leading-normal italic">
                    💡 The Google X-Y-Z formula states: Accomplished [X], as measured by [Y], by doing [Z].
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: ATS RESUME TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {templates.map((tpl) => (
                <div 
                  key={tpl.id}
                  className="bg-white rounded-3xl overflow-hidden border border-orange-100/50 shadow-lg shadow-orange-100/5 hover:shadow-xl hover:shadow-orange-100/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  
                  {/* Template CSS Preview (drawn mock layout!) */}
                  <div className="h-44 bg-[#fffcf9] border-b border-gray-100 p-5 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-slate-950/5 opacity-0 group-hover:opacity-100 transition duration-300 z-10 flex items-center justify-center">
                      <span className="bg-[#ff6900] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md">
                        Preview
                      </span>
                    </div>

                    {/* Draw LaTeX visual layout */}
                    {tpl.layoutType === 'latex' && (
                      <div className="w-full h-full flex flex-col gap-2 font-mono text-[6px] text-gray-400 select-none leading-none">
                        <div className="text-center font-bold text-[8px] text-slate-800 leading-none">YANNAM BHARGAVI</div>
                        <div className="text-center border-b border-gray-200 pb-1.5">github.com/bhargavi939244 | yannambhargavi93@gmail.com</div>
                        <div className="font-bold text-slate-700 uppercase">Education</div>
                        <div className="h-2 w-full bg-gray-200/50 rounded-sm"></div>
                        <div className="font-bold text-slate-700 uppercase">Experience</div>
                        <div className="h-4 w-full bg-gray-200/50 rounded-sm"></div>
                        <div className="font-bold text-slate-700 uppercase">Skills</div>
                        <div className="h-2 w-11/12 bg-gray-200/50 rounded-sm"></div>
                      </div>
                    )}

                    {/* Draw Classic layout */}
                    {tpl.layoutType === 'classic' && (
                      <div className="w-full h-full flex flex-col gap-2.5 text-[6px] text-gray-400 select-none leading-none">
                        <div className="font-bold text-[9px] text-slate-800 leading-none">YANNAM BHARGAVI</div>
                        <div className="w-10 h-1.5 bg-[#ff6900]/40 rounded-sm"></div>
                        <hr className="border-gray-200" />
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2 flex flex-col gap-1.5">
                            <div className="font-bold text-slate-700">EXPERIENCE</div>
                            <div className="h-6 w-full bg-gray-200/50 rounded-sm"></div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <div className="font-bold text-slate-700">EDUCATION</div>
                            <div className="h-4 w-full bg-gray-200/50 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Draw Modern Sidebar layout */}
                    {tpl.layoutType === 'modern' && (
                      <div className="w-full h-full flex gap-3 text-[6px] text-gray-400 select-none leading-none">
                        {/* Sidebar */}
                        <div className="w-1/3 bg-orange-50/50 p-2 rounded-lg border border-orange-100/40 flex flex-col gap-2">
                          <div className="font-bold text-slate-800 text-[7px]">YB</div>
                          <div className="h-1.5 w-full bg-orange-200/60 rounded-sm"></div>
                          <div className="h-1.5 w-10/12 bg-orange-200/60 rounded-sm"></div>
                          <div className="h-5 w-full bg-orange-200/60 rounded-sm"></div>
                        </div>
                        {/* Main */}
                        <div className="w-2/3 flex flex-col gap-2 pt-1">
                          <div className="font-bold text-slate-900 text-[8px]">Yannam Bhargavi</div>
                          <div className="font-bold text-[#ff6900]">SOFTWARE ENGINEER</div>
                          <div className="h-8 w-full bg-gray-200/50 rounded-sm"></div>
                          <div className="h-3 w-11/12 bg-gray-200/50 rounded-sm"></div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Card Description Body */}
                  <div className="p-5 flex flex-col justify-between flex-grow gap-5">
                    <div>
                      <span className="bg-orange-50 text-[#ff6900] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-orange-100/50">
                        {tpl.category}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-800 mt-3 leading-snug">{tpl.name}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mt-2.5 font-medium">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                        <span>Format: MS Word / DOCX</span>
                        <span className="text-green-600 font-extrabold">{tpl.difficulty}</span>
                      </div>
                      <button 
                        onClick={() => handleDownloadTemplate(tpl.name)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition duration-200 w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Download Template
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
