export interface Blog {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  readTime: string;
  date: string;
  author: string;
  gradient: string;
  content: string;
}

export interface AINews {
  id: string;
  title: string;
  sector: string;
  summary: string;
  source: string;
  time: string;
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "How to Beat the ATS: The Definitive Guide for Software Engineers",
    category: "Resume",
    tags: ["ATS", "Resume", "Career", "Software"],
    description: "Learn how Applicant Tracking Systems filter resumes and discover actionable strategies to format your resume for maximum compatibility.",
    readTime: "6 min read",
    date: "May 25, 2026",
    author: "Elena Vance",
    gradient: "from-orange-500 to-amber-500",
    content: `Many job seekers don't realize that their resumes are filtered by a machine before a human recruiter ever sees them. These machines are Applicant Tracking Systems (ATS), and they are used by over 90% of Fortune 500 companies.

Here is how you can optimize your resume to pass these automated screenings and get more interview callbacks:

1. Use standard headings and section titles
Ensure your resume uses recognizable sections like "Work Experience", "Education", "Skills", and "Projects". ATS parsers look for these standard terms to categorize your information. If you use creative headings like "Where I've Been" or "Academic Pedigree", the system might skip them entirely.

2. Match keywords from the job description
Analyze the job posting and identify key technical skills, methodologies, and frameworks. Incorpate these exact terms naturally into your work history bullets. For example, if the job description mentions "React Native", make sure you don't just write "mobile development".

3. Keep your formatting simple and clean
Avoid placing critical details inside tables, text boxes, headers, or footers, as many ATS parsers cannot read them. Stick to standard fonts like Arial, Calibri, or Helvetica, and avoid graphic-heavy CV formats.

- Save your file as a PDF or DOCX file.
- Use bullet points rather than dense paragraphs.
- Keep your layout in a single-column format for easier readability.

By implementing these structural tweaks, you will significantly boost your resume's searchability and matching score in modern recruiting databases.`
  },
  {
    id: "2",
    title: "Cracking the Tech Interview in 2026: What's Changed",
    category: "Interview",
    tags: ["Interview", "AI Tools", "System Design", "Coding"],
    description: "The technical hiring landscape has evolved. Understand how AI assistants, live debugging sessions, and system design evaluations shape modern tech interviews.",
    readTime: "8 min read",
    date: "May 22, 2026",
    author: "Marcus Aurelius",
    gradient: "from-indigo-600 to-purple-600",
    content: `The tech interview process has undergone a massive transformation. The days of simply memorizing Leetcode algorithms on a whiteboard are giving way to more realistic, collaborative evaluations.

Here are the key shifts in tech interviews and how you can prepare:

1. The rise of "AI-Collaborative" coding challenges
With tools like GitHub Copilot and ChatGPT becoming standard parts of a developer's workflow, progressive companies are now allowing—or even requiring—candidates to use AI tools during the interview. The evaluation shifts from syntax recall to system decomposition, prompt engineering, and code verification.

2. Focus on practical debugging and code review
Instead of writing code from scratch, many interviews now present you with a broken, undocumented codebase. You will be asked to identify bugs, write unit tests, and refactor the code. This mirrors real-world engineering responsibilities.

3. System design and integration are prioritized
Even for junior roles, understanding how microservices interact, database scaling, caching strategies, and event-driven architecture is highly valued. Be prepared to explain trade-offs between SQL vs NoSQL, or polling vs WebSockets.

- Explain your thinking process out loud at all times.
- Ask clarifying questions before starting to write code.
- Focus on code readability, modularity, and error handling.

Staying adaptable and demonstrating how you collaborate with modern AI tools will set you apart in the 2026 job market.`
  },
  {
    id: "3",
    title: "Leveraging AI Tools in Your Job Search (Without Sounding Robotic)",
    category: "AI",
    tags: ["AI", "Resume", "Job Search", "ChatGPT"],
    description: "AI can save you hours of work in writing cover letters and tailoring bullet points, but only if you maintain your unique human voice.",
    readTime: "5 min read",
    date: "May 18, 2026",
    author: "Sarah Connor",
    gradient: "from-emerald-500 to-teal-500",
    content: `Using generative AI to write your job application materials is a double-edged sword. While it dramatically speeds up the process, sending generic, AI-generated text is a quick way to get rejected by recruiters who are becoming experts at spotting "robotic" cover letters.

Here is how to use AI as a collaborator while keeping your application human:

1. Use AI to brainstorm and restructure, not write
Instead of prompting ChatGPT with "Write me a cover letter for a frontend developer role," use AI to analyze the job description and compare it to your resume. Ask: "What are the top three gaps between my resume and this job, and how can I describe my React experience to address them?"

2. Refine your impact bullets with metric generators
AI is fantastic at helping you rephrase passive sentences into impact-driven statements. Provide your raw work bullets and ask: "Rewrite these to follow the Google X-Y-Z formula (Accomplished [X] as measured by [Y], by doing [Z])." Then, edit the output to sound natural.

3. Watch out for AI buzzwords and clichés
AI models love terms like "leveraged", "pioneered", "utilized", "dynamic environment", and "testament to my passion". Remove these words and replace them with direct, simple active verbs like "built", "designed", "led", or "fixed".

- Always write the first draft of your cover letter yourself.
- Use AI to proofread and suggest optimizations.
- Read every AI-suggested change out loud to ensure it sounds like you.

By treating AI as an editor rather than a ghostwriter, you maintain your authenticity while accelerating your job search.`
  }
];

export const aiNews: AINews[] = [
  {
    id: "n1",
    title: "AI-Powered Drug Discovery Targets Multi-Drug Resistant Superbugs",
    sector: "Healthcare",
    summary: "Biomedical researchers used generative deep learning models to design novel synthetic molecules capable of neutralizing resistant bacterial strains in pre-clinical trials.",
    source: "MIT Technology Review",
    time: "15m ago"
  },
  {
    id: "n2",
    title: "Next-Gen Humanoid Robots Deployed in Automotive Assembly Plants",
    sector: "Robotics",
    summary: "Major automakers are testing humanoid robots for complex logistics and precision wiring installation, showing a 30% improvement in shift efficiency.",
    source: "TechCrunch",
    time: "1h ago"
  },
  {
    id: "n3",
    title: "Autonomous Coding Agents Resolve 15% of Production Issues Without Human Intervention",
    sector: "DevTools",
    summary: "A new cloud runtime integrates autonomous agent loops to monitor telemetry, write hotfixes, run unit tests, and deploy patches to production environments.",
    source: "Wired",
    time: "3h ago"
  },
  {
    id: "n4",
    title: "AI Smart Grid Optimizes Energy Routing Across Five US States",
    sector: "Energy",
    summary: "A neural-network-driven power grid dynamically predicts load fluctuations and reroutes renewable energy in real-time, reducing carbon emissions by 8%.",
    source: "Bloomberg Technology",
    time: "6h ago"
  },
  {
    id: "n5",
    title: "Algorithmic Arbitrage Firm Introduces Zero-Latency Sentiment Trading",
    sector: "Finance",
    summary: "Large language models running on specialized hardware process global news and regulatory filings in sub-milliseconds to adjust high-frequency trading positions.",
    source: "Financial Times",
    time: "12h ago"
  }
];
