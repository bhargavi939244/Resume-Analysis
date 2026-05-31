import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, CheckCircle2, Sparkles, ChevronRight, Zap, Send } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Contact Form State
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  const handleUploadClick = () => {
    if (token) {
      navigate('/analyze');
    } else {
      navigate('/register');
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !message) {
      setContactStatus("Please fill in all fields.");
      return;
    }
    setContactStatus("Sending...");
    setTimeout(() => {
      setContactStatus("Thank you! We will get in touch soon.");
      setName("");
      setContact("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="bg-[#fffbf5] min-h-screen flex flex-col font-sans text-gray-900">
      
      {/* 1st SECTION: Original Hero Section (Kept Exactly Same) */}
      <div className="min-h-[calc(100vh-5rem)] bg-[#fffbf5] relative overflow-hidden flex items-center pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-full lg:w-[45%]">
              <div className="flex items-center gap-2 max-w-fit bg-white px-3 py-1.5 rounded-full shadow-sm border border-orange-100">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-gray-800">AI Resume Checker</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-black tracking-tight leading-[1.1]">
                Improve Your ATS Score with <br/>
                <span className="text-[#ff6900]">Resume Analysis</span>
              </h1>
              
              <p className="text-gray-600 text-[15px] max-w-xl">
                  Upload your resume and compare it against any job description in seconds. Resume Analysis analyzes ATS compatibility, identifies missing skills, and provides personalized AI suggestions to help you land more interviews.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button onClick={handleUploadClick} className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-orange-500/30 transition flex items-center gap-2 text-sm uppercase tracking-wide">
                   Check My Resume
                </button>
                <button onClick={() => {
                  const section = document.getElementById("ats-score-info");
                  section?.scrollIntoView({ behavior: 'smooth' });
                }} className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-sm border border-gray-200 transition text-sm">
                   See ATS Score Table
                </button>
              </div>
            </div>
            
            {/* Right Column (Visuals) */}
            <div className="w-full lg:w-[55%] relative">
               <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-orange-100/50 border border-orange-50/50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   {/* Top Left Area */}
                   <div className="relative">
                     <p className="text-[#ff6900] text-[10px] font-bold uppercase tracking-wider mb-2">Resume Score Preview</p>
                     <h3 className="text-[17px] font-extrabold text-gray-900 mb-6 leading-tight">See how well your resume matches the job</h3>
                     
                     <div className="flex justify-center mb-4">
                       <div className="relative w-40 h-40">
                         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                           <circle className="text-gray-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                           <circle className="text-[#ff6900]" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="50.24" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                         </svg>
                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                           <span className="text-4xl font-extrabold text-black">87%</span>
                           <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Job Match Score</p>
                         </div>
                       </div>
                     </div>
                     
                     {/* Floating little card */}
                     <div className="absolute -bottom-6 -left-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden sm:block z-20">
                        <p className="text-[#ff6900] font-bold text-lg">1M+</p>
                        <p className="text-[10px] text-gray-500 font-medium max-w-[120px] leading-tight mt-1">Resumes analyzed and optimized</p>
                     </div>
                   </div>
                   
                   {/* Top Right Area */}
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                     <h3 className="text-[#ff6900] text-2xl font-extrabold mb-1">2x</h3>
                     <p className="text-[13px] font-bold text-gray-800 mb-4 leading-tight">More interview opportunities with AI-powered resume optimization</p>
                     
                     <div className="space-y-3">
                       <div className="flex items-center gap-2">
                         <CheckCircle2 className="h-5 w-5 text-[#ff6900] fill-orange-100" />
                         <span className="text-xs font-extrabold text-gray-800">ATS Compatibility Check</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <CheckCircle2 className="h-5 w-5 text-[#ff6900] fill-orange-100" />
                         <span className="text-xs font-extrabold text-gray-800">Missing Skills Detection</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <CheckCircle2 className="h-5 w-5 text-[#ff6900] fill-orange-100" />
                         <span className="text-xs font-extrabold text-gray-800">Keyword Optimization</span>
                       </div>
                      <div className="flex items-center gap-2">
                         <CheckCircle2 className="h-5 w-5 text-[#ff6900] fill-orange-100" />
                         <span className="text-xs font-extrabold text-gray-800">Actionable AI Suggestions</span>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Bottom Area - Upload */}
                 <div className="mt-8 border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center bg-[#fffcf8] relative z-10">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-[10px] bg-white shadow-sm border border-orange-100 mb-4 text-[#ff6900]">
                     <FileText className="h-6 w-6" />
                   </div>
                   <h4 className="text-lg font-extrabold text-gray-900 mb-2">Upload Resume</h4>
                   <p className="text-[13px] font-medium text-gray-600 mb-6">Upload PDF or DOCX file and get your ATS score.</p>
                   <button onClick={handleUploadClick} className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-2.5 px-8 rounded-md shadow-sm transition text-sm">
                     Upload Resume
                   </button>
                 </div>
                 
               </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* 2nd SECTION: ATS SCORE EXPLANATION */}
      <section id="ats-score-info" className="bg-white py-20 border-t border-orange-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
              Why Does ATS Score Matter in Modern Hiring?
            </h2>
            <p className="mt-6 text-gray-600 text-[15px] leading-relaxed">
              Most companies today use Applicant Tracking Systems (ATS) to filter resumes before recruiters review them. A strong ATS score improves your chances of passing automated screening and reaching hiring managers.
              Resume Analysis analyzes your resume structure, keywords, readability, and job relevance using AI-driven insights to help you create a resume that performs better in real-world hiring systems.
            </p>
          </div>

          {/* Score Range Table */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-orange-100/20 overflow-hidden border border-orange-100/50">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-[#ff6900]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      ATS Match Score
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Resume Evaluation
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Interview Probability
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr className="hover:bg-orange-50/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-black">
                      80 - 100%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Excellent alignment with job requirements and ATS standards
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                       Very High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-black">
                      70 - 79%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                     Strong profile with minor improvements needed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-black">
                      60 - 69%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Moderate match with missing keywords or formatting issues
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#ff6900]">
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-orange-50/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-black">
                      Below 60%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      Resume requires optimization for ATS compatibility
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                       Low
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3rd SECTION: HOW IT WORKS */}
      <section className="bg-[#fffbf5] py-20 border-t border-orange-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#ff6900] text-[10px] font-bold px-3 py-1.5 rounded-full border border-orange-100 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6900] animate-pulse"></span>
              AI Resume Optimization Process
            </span>
          </div>

          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
             How Resume Analysis Analyzes Your Resume
            </h2>
            <p className="mt-4 text-gray-600 text-[15px] leading-relaxed max-w-2xl mx-auto">
              Resume Analysis uses AI and ATS-based analysis to evaluate your resume against industry hiring standards and job descriptions in just a few seconds.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100/50 shadow-lg shadow-orange-100/10 relative overflow-hidden flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-[#ff6900] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-orange-500/20">
                1
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Upload Your Resume</h3>
              <p className="text-sm text-gray-600 leading-relaxed z-10">
                Upload your resume in PDF or DOCX format securely to begin the analysis process.
              </p>
              {/* Background Blob decoration */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-orange-50/70 rounded-full"></div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100/50 shadow-lg shadow-orange-100/10 relative overflow-hidden flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-[#ff6900] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-orange-500/20">
                2
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Add Job Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed z-10">
                Paste the target job description to compare your resume against the required skills and qualifications.
              </p>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-orange-50/70 rounded-full"></div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-orange-100/50 shadow-lg shadow-orange-100/10 relative overflow-hidden flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-full bg-[#ff6900] text-white flex items-center justify-center font-extrabold text-lg mb-6 shadow-md shadow-orange-500/20">
                3
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Receive AI Insights</h3>
              <p className="text-sm text-gray-600 leading-relaxed z-10">
                Get ATS score analysis, missing skill suggestions, keyword improvements, and personalized recommendations instantly..
              </p>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-orange-50/70 rounded-full"></div>
            </div>

          </div>

          {/* Button below */}
          <div className="flex justify-center">
            <button onClick={handleUploadClick} className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/20 transition flex items-center gap-2 text-sm uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              Analyze Resume Now
            </button>
          </div>

        </div>
      </section>

      {/* 4th SECTION: Resume Review Report */}
      <section className="bg-white py-20 border-t border-orange-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column */}
            <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-[#ff6900] mb-6">
                <FileText className="w-6 h-6" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
                Resume Report
              </h2>
              <p className="text-lg font-bold text-gray-800 mb-4">
                Detailed AI Resume Insights
              </p>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                Receive a complete breakdown of your resume performance across multiple ATS and recruiter-focused parameters. Resume Analysis evaluates keyword relevance, formatting quality, readability, technical skills, section organization, and overall job compatibility.
                Our AI-generated insights help you identify weak areas and improve your resume strategically before applying.
              </p>
              
              <button onClick={handleUploadClick} className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-orange-500/30 transition flex items-center gap-2 text-sm uppercase tracking-wide">
                Generate My Report
              </button>
            </div>

            {/* Right Column: Visual Mockup Dashboard Container */}
            <div className="w-full lg:w-[55%]">
              <div className="bg-[#fff9f1] rounded-[2.5rem] p-6 sm:p-8 border border-orange-100 shadow-inner flex flex-col md:flex-row gap-6 relative">
                
                {/* Floating "Top 1%" Badge overlapping on desktop */}
                <div className="absolute top-[110px] left-[55%] transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl border border-orange-100 text-center z-20 w-32 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                  <p className="text-xs font-black text-gray-800">Top 2%</p>
                  <p className="text-[10px] text-[#ff6900] font-bold mt-1">Score Range</p>
                  <p className="text-[10px] text-gray-500 font-bold">90-100</p>
                </div>

                <div className="flex-1 flex flex-col gap-6">
                  {/* Card A: Resume Comparison Graph */}
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-orange-50/50 relative overflow-hidden">
                    <h4 className="text-xs font-bold text-gray-800">Resume Comparison</h4>
                    <p className="text-[9px] text-gray-500 font-medium">Your resume vs Top 2% resumes</p>
                    
                    {/* SVG Graphic Line Chart */}
                    <div className="mt-4">
                      <svg className="w-full h-16" viewBox="0 0 100 30" preserveAspectRatio="none">
                        {/* Top 1% Line (Orange Curve) */}
                        <path d="M 0 22 Q 25 5 50 12 T 100 3" fill="none" stroke="#ff6900" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Your Resume Line (Gray dashed line) */}
                        <path d="M 0 26 Q 25 18 50 20 T 100 13" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round" />
                        
                        {/* Highlights */}
                        <circle cx="50" cy="12" r="2.5" fill="#ff6900" />
                        <circle cx="50" cy="20" r="2.5" fill="#6b7280" />
                      </svg>
                      
                      {/* Graph legend */}
                      <div className="flex justify-between items-center mt-3 text-[8px] font-bold">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#ff6900]"></span>
                          <span className="text-gray-700">Top 2%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 border-b-2 border-dashed border-gray-500"></span>
                          <span className="text-gray-500">Your Resume</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card B: Key Insights */}
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-orange-50/50">
                    <h4 className="text-xs font-bold text-gray-800 mb-3">Key Insights</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-600">Impact</span>
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-[8px] border border-green-100">Strong</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-600">Keywords</span>
                        <span className="bg-orange-50 text-[#ff6900] px-2 py-0.5 rounded text-[8px] border border-orange-100">Needs Improvement</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-600">Experience</span>
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-[8px] border border-green-100">Strong</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card C: Your Resume Score Circle Progress */}
                <div className="w-full md:w-48 bg-white rounded-2xl p-5 shadow-md border border-orange-50/50 flex flex-col justify-between items-center text-center">
                  <h4 className="text-xs font-bold text-gray-800 mb-2">Your Resume Score</h4>
                  
                  {/* Gauge */}
                  <div className="relative w-28 h-28 my-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle className="text-gray-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                      <circle className="text-[#ff6900]" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="70.3" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-2xl font-black text-black">78</span>
                      <span className="text-[10px] text-gray-500 font-bold">/100</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-extrabold text-[#ff6900] uppercase tracking-wide mt-2">
                    Good Start!
                  </p>
                  <p className="text-[8px] text-gray-500 font-medium leading-normal mt-1">
                    Follow suggestions to reach Top 2%
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5th SECTION: CTA SECTION */}
      <section className="bg-[#1e2330] text-white py-16 text-center px-4 relative overflow-hidden border-t border-gray-800">
        {/* Backdrop Glow Grid */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff6900]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff6900]/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#ff6900] font-bold uppercase tracking-widest text-[10px] mb-3">
            — Start Improving Today —
          </p>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
           Build a Resume Recruiters <span className="text-[#ff6900]"> Want to See</span>
          </h2>
          
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed mb-8">
           Increase your chances of getting shortlisted with AI-powered resume analysis, ATS optimization, and personalized improvement suggestions from Resume Analysis.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <button onClick={handleUploadClick} className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/20 transition duration-300 text-sm uppercase tracking-wide inline-flex items-center gap-2">
              <Zap className="w-4 h-4 fill-white" />
              Analyze My Resume
            </button>
            <button onClick={() => {
              const section = document.getElementById("ats-score-info");
              section?.scrollIntoView({ behavior: 'smooth' });
            }} className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg border border-white/20 transition duration-300 text-sm inline-flex items-center gap-2">
              Learn more
            </button>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-bold text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#ff6900]/25 text-[#ff6900] flex items-center justify-center text-[9px]">✔</span>
              <span>Instant ATS Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#ff6900]/25 text-[#ff6900] flex items-center justify-center text-[9px]">✔</span>
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#ff6900]/25 text-[#ff6900] flex items-center justify-center text-[9px]">✔</span>
              <span>Job Description Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#ff6900]/25 text-[#ff6900] flex items-center justify-center text-[9px]">✔</span>
              <span>Resume Optimization Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#141822] text-gray-400 border-t border-gray-800/50 pt-8 pb-12 font-medium text-xs leading-normal">
        
        {/* Breadcrumbs Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 border-b border-gray-800/40 pb-4">
          <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-wider">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">Resume Check Score</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Logo & Address */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link to="/" className="flex items-center space-x-0 text-white font-black text-xl tracking-tight">
              <span className="text-[#ff6900] text-2xl">R</span>
              <span>esume Analysis</span>
            </Link>
            <p className="text-gray-500 leading-relaxed text-[11px]">
              Resume Analysis is an AI-powered resume analysis platform designed to help job seekers improve their ATS performance.
            </p>
          </div>

          {/* Col 2: Company */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">Company</h4>
            <Link to="/about" className="hover:text-white transition">About us</Link>
            <Link to="/blogs" className="hover:text-white transition">Career Blogs</Link>
            <a href="#" className="hover:text-[#ff6900] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#ff6900] transition">Terms of Service</a>
            
          </div>

          {/* Col 3: Job Search Tools */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">Features</h4>
            <Link to="/services" className="hover:text-white transition">Resume Services</Link>
            <a href="#" className="text-[#ff6900] hover:underline transition">ATS Score Checker</a>
            <a href="#" className="hover:text-[#ff6900] transition">Job Match Analysis</a>
            <a href="#" className="hover:text-white transition">AI Suggestions</a>

          </div>

          {/* Col 4: Read More */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">Support</h4>
            <a href="#" className="hover:text-white transition">Career Blogs</a>
    
            <a href="#" className="hover:text-[#ff6900] transition">FAQs</a>
          </div>

          {/* Col 5: Contact Form */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-wider mb-1">
              Need Assistance?
            </h4>
            
            {contactStatus && (
              <div className={`p-2 rounded text-[10px] font-bold mb-2 ${
                contactStatus.includes("Thank you") ? "bg-green-950 text-green-400 border border-green-900" : "bg-orange-950 text-orange-400 border border-orange-900"
              }`}>
                {contactStatus}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Name*" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#1e2330] border border-gray-800 rounded-lg py-2 px-3 text-white text-[11px] w-full focus:outline-none focus:border-[#ff6900] placeholder-gray-500 font-bold transition-colors"
                  required
                />
                <input 
                  type="text" 
                  placeholder="WhatsApp Contact*" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="bg-[#1e2330] border border-gray-800 rounded-lg py-2 px-3 text-white text-[11px] w-full focus:outline-none focus:border-[#ff6900] placeholder-gray-500 font-bold transition-colors"
                  required
                />
              </div>
              <textarea 
                placeholder="Type your message here*" 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[#1e2330] border border-gray-800 rounded-lg py-2 px-3 text-white text-[11px] w-full focus:outline-none focus:border-[#ff6900] placeholder-gray-500 font-bold mt-2 resize-none transition-colors"
                required
              ></textarea>
              
              <button 
                type="submit" 
                className="bg-[#ff6900] hover:bg-[#e05d00] text-white font-bold py-2 px-4 rounded-lg text-[10px] transition duration-300 w-full uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Lower footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800/40 text-center text-gray-600 text-[10px] font-bold uppercase tracking-wider">
          &copy; {new Date().getFullYear()} © 2026 Resume Analysis. All rights reserved.
        </div>

      </footer>

    </div>
  );
}
