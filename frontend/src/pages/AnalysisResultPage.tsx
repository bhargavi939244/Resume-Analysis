import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle2, XCircle, Lightbulb, ChevronLeft } from 'lucide-react';

export default function AnalysisResultPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await api.get(`/analyze/${id}`);
        setAnalysis(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-gray-50"><div className="animate-spin h-10 w-10 border-4 border-indigo-600 rounded-full border-t-transparent"></div></div>;
  }

  if (!analysis) {
    return <div className="p-10 text-center text-red-500 font-medium bg-gray-50 h-[calc(100vh-4rem)]">Analysis not found.</div>;
  }

  const scoreData = [
    { name: 'Match', value: analysis.overall_score },
    { name: 'Gap', value: 100 - analysis.overall_score }
  ];
  const COLORS = ['#ff6900', '#e5e7eb'];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <h1 className="text-3xl font-extrabold relative z-10">ATS Analysis Report</h1>
            <p className="mt-2 text-indigo-100 relative z-10">Detailed breakdown of how your resume matches the job description.</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Score Chart */}
              <div className="flex flex-col items-center justify-center bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Match Score</h2>
                <div className="h-64 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={10}
                      >
                        {scoreData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-extrabold text-indigo-600">{analysis.overall_score}%</span>
                  </div>
                </div>
                <div className="flex w-full justify-around mt-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Skills</p>
                    <p className="font-bold text-lg text-gray-900">{analysis.skills_score}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Experience</p>
                    <p className="font-bold text-lg text-gray-900">{analysis.experience_score}%</p>
                  </div>
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <div className="flex items-center mb-6">
                  <XCircle className="h-7 w-7 text-red-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Missing Keywords</h2>
                </div>
                <p className="text-gray-600 mb-4">These critical skills from the job description are missing in your resume. Add them in context to improve your score.</p>
                {analysis.missing_skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.missing_skills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-semibold rounded-lg border border-red-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Great job! You have all the required keywords.
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-7 w-7 text-amber-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">AI Suggestions for Improvement</h2>
              </div>
              {analysis.suggestions?.length > 0 ? (
                <ul className="space-y-4">
                  {analysis.suggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="flex bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mr-4 mt-0.5">{i+1}</span>
                      <p className="text-gray-800 leading-relaxed font-medium">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No suggestions at this time.</p>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
