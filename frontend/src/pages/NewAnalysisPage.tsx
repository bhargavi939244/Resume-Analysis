import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobTitle || !jobDescription) {
      setError("Please fill out all fields and select a file.");
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // 1. Upload Resume
      const formData = new FormData();
      formData.append('file', file);
      const resumeRes = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const resumeId = resumeRes.data.id;

      // 2. Create Job Description
      const jobRes = await api.post('/jobs', {
        title: jobTitle,
        content: jobDescription
      });
      const jobId = jobRes.data.id;

      // 3. Trigger Analysis
      const analysisRes = await api.post(`/analyze?resume_id=${resumeId}&job_id=${jobId}`);
      const analysisId = analysisRes.data.id;

      navigate(`/analysis/${analysisId}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred during analysis.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">New ATS Analysis</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center font-medium">
          <AlertCircle className="h-5 w-5 mr-2" /> {error}
        </div>
      )}

      <form onSubmit={handleAnalyze} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-4">1. Upload your Resume (PDF/DOCX)</label>
          <div className="mt-2 flex justify-center rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-10 hover:bg-indigo-50 transition cursor-pointer relative" onClick={() => document.getElementById('file-upload')?.click()}>
            <div className="text-center">
              {file ? (
                <div className="flex flex-col items-center">
                   <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" aria-hidden="true" />
                   <p className="mt-4 text-sm font-semibold text-gray-900">{file.name}</p>
                   <p className="mt-1 text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="mx-auto h-14 w-14 text-indigo-400" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.docx" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500 mt-2 font-medium">PDF or DOCX up to 10MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
           <label className="block text-lg font-bold text-gray-900 mb-4">2. Enter Job Details</label>
           <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Job Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="mt-2 block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Job Description</label>
                <textarea
                  required
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="mt-2 block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
           </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analyzing Match...</>
            ) : 'Analyze Match'}
          </button>
        </div>

      </form>
    </div>
  );
}
