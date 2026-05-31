import { Link } from 'react-router-dom';
import { Shield, ChevronLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-5rem)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-sm mb-8 transition gap-1">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-500">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-slate-500 mt-1">Last Updated: May 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm">
              <strong>Educational Practice Disclaimer:</strong> This web application (Resume Analysis) is a personal project created strictly for educational practice and portfolio demonstration. It is not a commercial service.
            </div>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Scope of the Application</h2>
              <p>
                This project was created by <strong>Yannam Bhargavi</strong> to practice and showcase software engineering skills, including React, TypeScript, FastAPI, and AI API integrations. Since this is an educational sandbox, it does not collect, process, or sell any personal data for commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Uploaded Resumes and Data</h2>
              <p>
                Any resumes, CV files, or text descriptions uploaded to this platform are parsed and analyzed purely to show user interface feedback. The data is stored in a local development database and can be deleted at any time. We strongly advise against uploading confidential, highly sensitive, or real personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. Content Sourcing and Attribution</h2>
              <p>
                Some educational materials, articles, layouts, and system icons used throughout this web application were sourced from public repositories, tutorials, and standard internet examples. All copied resources are utilized strictly for practice, training, and design exploration. We do not claim exclusive ownership over public template layouts or boilerplate items copied to build this demo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Third-Party Integrations</h2>
              <p>
                Resume Analysis integrates with third-party service providers (like Google Sign-In and OpenAI/Gemini/Ollama API endpoints) to demonstrate complete feature implementation. Any credentials inputted or tokens used are processed on-the-fly and are subject to their respective platforms' developer privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">5. Updates and Contact</h2>
              <p>
                Since this is an active training project, features and mock policies may change as development continues. For questions, you can reach the developer at <a href="mailto:yannambhargavi93@gmail.com" className="text-orange-600 hover:underline">yannambhargavi93@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
