import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FileText, Clock, TrendingUp } from 'lucide-react';

interface Resume {
  id: string;
  filename: string;
  created_at: string;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [resumesRes, analysesRes] = await Promise.all([
          api.get('/resumes'),
          api.get('/analyze')
        ]);
        setResumes(resumesRes.data);
        setAnalyses(analysesRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const averageScore = analyses.length > 0
    ? Math.round(analyses.reduce((sum, item) => sum + item.overall_score, 0) / analyses.length)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Dashboard</h1>
        <Link to="/analyze" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md transform hover:-translate-y-0.5 transition font-medium">
          New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-xl"><FileText className="text-indigo-600 h-8 w-8" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Uploads</p>
            <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl"><TrendingUp className="text-green-600 h-8 w-8" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Score</p>
            <p className="text-2xl font-bold text-gray-900">{averageScore !== null ? `${averageScore}%` : '--'}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="bg-indigo-100 p-3 rounded-xl"><Clock className="text-indigo-600 h-8 w-8" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Analysis</p>
            <p className="text-2xl font-bold text-gray-900">
              {resumes.length > 0 ? new Date(resumes[0].created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Resumes</h2>
      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse font-medium">Loading data...</div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No resumes uploaded yet</h3>
          <p className="mt-1 text-gray-500">Get started by analyzing your first resume against a job description.</p>
          <div className="mt-6">
            <Link to="/analyze" className="text-indigo-600 font-semibold hover:text-indigo-500">Start Analysis &rarr;</Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl overflow-hidden">
          <ul role="list" className="divide-y divide-gray-100">
            {resumes.map((resume) => (
              <li key={resume.id} className="flex justify-between gap-x-6 py-5 px-6 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex min-w-0 gap-x-4 items-center">
                  <div className="h-10 w-10 flex-none rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{resume.filename}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Uploaded on {new Date(resume.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
