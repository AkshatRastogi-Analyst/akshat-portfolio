import { ArrowRight, Download, ExternalLink, X, ChevronRight, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* --- FULL-SCREEN BRIGHT STARRY BACKGROUND COMPONENT --- */
const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const particleCount = 150; // High density

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.2, // Bolder stars
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.6 + 0.4, // Super bright minimum opacity
        alphaSpeed: Math.random() * 0.02 + 0.01
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0.3) {
          p.alphaSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`; // Pure gold
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 215, 0, 1)';
        ctx.fill();
        ctx.shadowBlur = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 220) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - distance / 220;
          ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.8})`; // Brighter constellation lines
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[0]" />;
};

/* --- CURSOR GLOW COMPONENT --- */
const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/15 rounded-full pointer-events-none blur-[120px] z-[0]"
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
    />
  );
};

/* --- CREATIVE SECTION DIVIDER --- */
const SectionDivider = () => (
  <div className="w-full flex items-center justify-center py-16 relative z-10 opacity-70">
    <div className="w-1/4 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
    <div className="w-3 h-3 mx-4 rotate-45 border border-[#D4AF37] shadow-[0_0_15px_#D4AF37] bg-black"></div>
    <div className="w-1/4 md:w-1/3 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
  </div>
);

/* --- MAIN APP --- */
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerReveal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const itemReveal = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const projects = [
    {
      title: "THE TERRACOTTA CAFE",
      category: "WEB PLATFORM & ANALYTICS",
      desc: "An integrated web application tracking daily menu performance, customer order trends, and revenue metrics.",
      tags: ["React", "Web Analytics", "UI/UX"],
      link: "https://the-terracotta-cafe-web.onrender.com", 
      bullets: [
        "Developed an integrated web application tracking daily menu performance and revenue metrics.",
        "Monitored real-time customer order trends to optimize product availability.",
        "Designed interactive user dashboards for streamlined cafe operations."
      ]
    },
    {
      title: "DECATHLON INDIA PERFORMANCE",
      category: "POWER BI & RETAIL ANALYTICS",
      desc: "Developed a comprehensive retail performance dashboard tracking ₹218.50 Cr in revenue across the Indian market.",
      tags: ["Power BI", "Sales Analytics", "Decathlon"],
      link: "https://akshatrastogi-analyst.github.io/decathlon-sales-dashboard/", 
      bullets: [
        "Analyzed a large dataset of 100,000+ store transactions to track over ₹218.50 Crores in yearly revenue.",
        "Found that 'Apparel' is the most popular category, helping drive an average customer bill of ₹21,850.",
        "Showed that Tier-1 cities generate the most sales, meaning better shipping logistics there will save money.",
        "Recommended special financing options for 'Cycles' because they have the highest price tag and room for growth."
      ]
    },
    {
      title: "RETAIL COMMERCIAL ANALYTICS",
      category: "ADVANCED EXCEL",
      desc: "Engineered an interactive commercial analytics dashboard to track over $156M in gross retail revenue and regional profitability.",
      tags: ["Excel", "Data Visualization", "Margin Analysis"],
      link: "https://akshatrastogi-analyst.github.io/sales-performance-dashboard/", 
      bullets: [
        "Built a clean, visual dashboard to track $156.1 Million in total gross revenue across multiple city locations.",
        "Calculated a strong 45.2% overall profit margin by comparing product costs to final sale prices.",
        "Identified Chicago as the top-performing market region for overall retail sales volume.",
        "Discovered that highly-rated products bring in more profit, proving that premium pricing works well for quality items."
      ]
    },
    {
      title: "E-COMMERCE STRATEGY DASHBOARD",
      category: "SQL & AUTOMATED REPORTING",
      desc: "Processed 500,000 raw transaction records to build an automated dashboard tracking total revenue and category margins.",
      tags: ["SQL", "Data Cleansing", "Strategy"],
      link: "https://docs.google.com/spreadsheets/d/1W_VRmLvTFVf-ZGS1YN28ZJtzUWsoy_kG/edit?usp=drivesdk&ouid=100923984874340712192&rtpof=true&sd=true",
      bullets: [
        "Cleaned and organized 500,000 rows of raw sales data to build a fully automated business tracking system.",
        "Tracked over 2 Million total items sold to measure total revenue and category performance accurately.",
        "Found that Electronics sell the most items, but Beauty & Health products actually create the highest profit percentages.",
        "Identified rapid sales growth in Varanasi, showing a massive new opportunity to expand business into Tier-2 cities."
      ]
    }
  ];

  const skills = [
    { name: "SQL (PostgreSQL)", level: 95, bullets: ["Complex query optimization & data extraction", "Relational database structuring & auditing"] },
    { name: "Advanced Excel", level: 95, bullets: ["Power Pivot, VLOOKUP, & DAX mastery", "Automated macro reporting & data validation"] },
    { name: "Power BI", level: 90, bullets: ["Interactive executive dashboard design", "Real-time data visualization & DAX modeling"] },
    { name: "AI", level: 85, bullets: ["Prompt engineering for data parsing & analysis", "Automating repetitive workflows with AI tools"] },
    { name: "Business Strategy & Reporting", level: 90, bullets: ["Translating raw metrics into commercial ROI", "Cross-functional performance tracking"] },
    { name: "Communication", level: 95, bullets: ["Presenting complex findings to stakeholders", "Clear, concise technical documentation"] },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 overflow-x-hidden selection:bg-[#D4AF37] selection:text-black font-body relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;600;800&display=swap');
        .font-cinematic { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
        .font-body { font-family: 'Inter', sans-serif; }
        .gold-text { color: #D4AF37; }
        .gold-bg { background-color: #D4AF37; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}</style>

      {/* FIXED BACKGROUND STARS & CURSOR GLOW ACROSS ALL PAGES */}
      <StarryBackground />
      <CursorGlow />

      {/* PROJECT MODAL POP-UP */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(10px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-[#D4AF37]/30 w-full max-w-4xl p-8 md:p-12 relative shadow-[0_0_80px_rgba(212,175,55,0.15)] overflow-y-auto max-h-[90vh] rounded-xl"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 text-gray-500 hover:text-[#D4AF37] transition-colors bg-gray-900 p-2 rounded-full">
                <X size={24} />
              </button>

              <p className="gold-text font-bold tracking-[0.2em] text-[10px] uppercase mb-4">{selectedProject.category}</p>
              <h3 className="font-cinematic text-4xl md:text-6xl text-white mb-8 leading-none tracking-tight">{selectedProject.title}</h3>
              
              <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-8"></div>

              <div className="space-y-5 mb-10">
                {selectedProject.bullets.map((bullet, i) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} key={i} className="flex items-start gap-4 text-gray-300 text-sm md:text-base leading-relaxed">
                    <ChevronRight className="gold-text shrink-0 mt-1" size={18} />
                    <p>{bullet}</p>
                  </motion.div>
                ))}
              </div>

              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="gold-bg text-black px-8 py-4 text-xs font-black tracking-[0.15em] uppercase hover:bg-yellow-500 transition-colors inline-flex items-center gap-3 rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  VIEW LIVE PLATFORM <ExternalLink size={18} strokeWidth={3} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/90 via-transparent to-transparent backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05, textShadow: "0px 0px 20px rgba(212,175,55,0.8)" }}
          className="text-3xl md:text-4xl font-black tracking-widest text-white cursor-pointer transition-colors duration-300 hover:text-gray-100"
        >
          AKSHAT RASTOGI<span className="text-[#D4AF37]">.</span>
        </motion.div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          <a href="#about" className="hover:text-[#D4AF37] transition-colors hover:shadow-[0_0_10px_#D4AF37]">About</a>
          <a href="#skills" className="hover:text-[#D4AF37] transition-colors hover:shadow-[0_0_10px_#D4AF37]">Skills</a>
          <a href="#projects" className="hover:text-[#D4AF37] transition-colors hover:shadow-[0_0_10px_#D4AF37]">Projects</a>
          <a href="#contact" className="hover:text-[#D4AF37] transition-colors hover:shadow-[0_0_10px_#D4AF37]">Contact</a>
        </div>
      </nav>

      {/* 1. TYPOGRAPHY HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 overflow-hidden z-10 bg-transparent">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center mt-20">
          <motion.div variants={containerReveal} initial="hidden" animate="visible" className="flex flex-col items-center">
            
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.4em] text-xs uppercase mb-8 border border-[#D4AF37]/30 px-6 py-2 rounded-full backdrop-blur-sm bg-black/40">
              Business Analyst & Data Strategist
            </motion.p>
            
            <h1 className="font-cinematic text-[5rem] md:text-[8rem] lg:text-[11rem] uppercase leading-[0.85] text-white mb-6 tracking-tight flex flex-col items-center w-full">
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="hover:scale-105 transition-transform duration-700 cursor-default">I ENGINEER</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="gold-text hover:scale-105 transition-transform duration-700 cursor-default">OPERATIONAL</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="hover:scale-105 transition-transform duration-700 cursor-default">CLARITY.</motion.div></div>
            </h1>
            
            <motion.div variants={itemReveal} className="flex flex-wrap justify-center gap-6 mt-12">
              <a href="#projects" className="gold-bg text-black px-10 py-5 text-xs font-black tracking-[0.15em] uppercase hover:bg-yellow-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-2 rounded-sm">
                EXPLORE MY WORK <ArrowRight size={16} strokeWidth={3} />
              </a>
              <a href="/resume.pdf" download="Akshat_Rastogi_Resume.pdf" className="border border-gray-700 px-10 py-5 text-xs font-black tracking-[0.15em] uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all hover:scale-105 flex items-center gap-2 rounded-sm text-white bg-black/50 backdrop-blur-sm">
                DOWNLOAD RESUME <Download size={16} strokeWidth={3} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* 2 & 3. ABOUT ME WITH BENTO GRID FILLER */}
      <section id="about" className="py-16 px-8 md:px-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerReveal}>
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.2em] text-[10px] uppercase mb-4">01 / ABOUT ME</motion.p>
            <h2 className="font-cinematic text-[4rem] md:text-[5.5rem] uppercase leading-[0.9] text-white mb-8">
              <div className="overflow-hidden"><motion.div variants={itemReveal}>I DON'T JUST</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal}>REPORT DATA.</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="text-gray-600">I FIX PROBLEMS.</motion.div></div>
            </h2>
            <motion.div variants={itemReveal}>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-xl mb-6">
                I am a relentless problem-solver who believes that raw data is useless without a commercial narrative. As a results-driven Business Analyst and B.Com graduate, I don't just build dashboards—I engineer operational clarity.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-xl">
                Whether it's optimizing digital storefronts to increase engagement, or ensuring 100% data integrity during high-pressure live events, my goal is simple: I bridge the gap between complex datasets and actionable business strategy, giving management the exact insights they need to scale gracefully.
              </p>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerReveal} className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
             <motion.div variants={itemReveal} className="bg-[#050505]/80 backdrop-blur-md border border-gray-800 rounded-xl p-8 flex flex-col justify-center hover:border-[#D4AF37] transition-colors group">
               <span className="font-cinematic text-6xl text-white group-hover:text-[#D4AF37] transition-colors">20%</span>
               <span className="text-[10px] text-gray-500 font-bold tracking-widest mt-2 uppercase">Engagement Boost</span>
             </motion.div>
             <motion.div variants={itemReveal} className="bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-xl p-8 flex flex-col justify-center transform translate-y-8 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
               <span className="font-cinematic text-6xl text-black">100%</span>
               <span className="text-[10px] text-black/80 font-bold tracking-widest mt-2 uppercase">Data Accuracy</span>
             </motion.div>
             <motion.div variants={itemReveal} className="bg-[#050505]/80 backdrop-blur-md border border-gray-800 rounded-xl p-8 flex flex-col justify-center hover:border-[#D4AF37] transition-colors group transform -translate-y-4">
               <span className="font-cinematic text-6xl text-white group-hover:text-[#D4AF37] transition-colors">150K+</span>
               <span className="text-[10px] text-gray-500 font-bold tracking-widest mt-2 uppercase">Records Cleansed</span>
             </motion.div>
             <motion.div variants={itemReveal} className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl p-8 flex items-center justify-center translate-y-4 overflow-hidden relative">
               <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-screen animate-pulse"></div>
               <span className="font-bold tracking-[0.3em] text-center text-xs text-gray-400 uppercase leading-loose">Always<br/>Adding<br/><span className="text-white">Value</span></span>
             </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* 4. EXPANDED SKILLS SECTION */}
      <section id="skills" className="py-16 px-8 md:px-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerReveal} className="mb-20">
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.2em] text-[10px] uppercase mb-4">02 / SKILLS ARSENAL</motion.p>
            <h2 className="font-cinematic text-[4rem] md:text-[5.5rem] uppercase leading-[0.9] text-white">
              <div className="overflow-hidden"><motion.div variants={itemReveal}>TECHNICAL</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="text-gray-700">EXPERTISE</motion.div></div>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
            {skills.map((skill, index) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} key={index} className="w-full group">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-white font-bold tracking-widest text-sm uppercase drop-shadow-md">{skill.name}</span>
                  <span className="gold-text font-cinematic text-2xl leading-none">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900/80 rounded-full overflow-hidden mb-6 relative z-10">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="h-full gold-bg shadow-[0_0_15px_#D4AF37]"
                  />
                </div>
                <ul className="space-y-3">
                  {skill.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-xs md:text-sm drop-shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 5. CREATIVE FEATURED WORKS */}
      <section id="projects" className="py-16 px-8 md:px-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerReveal} className="mb-20 text-center lg:text-left">
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.2em] text-[10px] uppercase mb-4">03 / FEATURED WORKS</motion.p>
            <h2 className="font-cinematic text-[4rem] md:text-[5.5rem] uppercase leading-[0.9] text-white">
              <div className="overflow-hidden"><motion.div variants={itemReveal}>SELECTED WORKS.</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="text-gray-700">ENGINEERED VALUE.</motion.div></div>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} key={index} 
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-10 bg-[#050505]/80 backdrop-blur-md border border-gray-800 hover:border-[#D4AF37] transition-all duration-500 cursor-pointer overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-16">
                    <p className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase">{project.category}</p>
                    <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-500 shadow-lg">
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-black transition-colors transform group-hover:-rotate-45" />
                    </div>
                  </div>
                  
                  <h3 className="font-cinematic text-3xl md:text-4xl text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-md">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-8 line-clamp-2 drop-shadow-md">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold tracking-widest px-3 py-1 bg-black/80 border border-gray-800 text-gray-400 uppercase rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#D4AF37] to-[#D4AF37]/90 text-center">
                  <span className="text-black font-black tracking-[0.2em] text-[10px] uppercase">CLICK TO EXPAND PROJECT DETAILS</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 6. AESTHETIC EXPERIENCE TIMELINE */}
      <section id="experience" className="py-16 px-8 md:px-16 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerReveal} className="mb-20 text-center">
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.2em] text-[10px] uppercase mb-4">04 / TIMELINE</motion.p>
            <h2 className="font-cinematic text-[4rem] md:text-[5.5rem] uppercase leading-[0.9] text-white">
              <div className="overflow-hidden"><motion.div variants={itemReveal}>EXPERIENCE &</motion.div></div>
              <div className="overflow-hidden"><motion.div variants={itemReveal} className="text-gray-700">MILESTONES</motion.div></div>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-[#050505] group-hover:border-[#D4AF37] text-gray-500 group-hover:text-[#D4AF37] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                <div className="w-3 h-3 bg-gray-700 group-hover:bg-[#D4AF37] rounded-full transition-colors shadow-[0_0_10px_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_#D4AF37]"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#050505]/80 backdrop-blur-md border border-gray-800 p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/50 transition-colors">
                <div className="flex flex-col mb-4">
                  <h3 className="font-cinematic text-3xl text-white tracking-wide">BANARASI ZAIKA</h3>
                  <time className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] mt-2 uppercase">Business Ops Lead | 04/2023 - 05/2026</time>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">Automated digital marketing workflows to streamline production, driving a 20% increase in digital storefront engagement across Swiggy and Zomato. Managed end-to-end commercial operations and vendor relations.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-[#050505] group-hover:border-[#D4AF37] text-gray-500 group-hover:text-[#D4AF37] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                <div className="w-3 h-3 bg-gray-700 group-hover:bg-[#D4AF37] rounded-full transition-colors shadow-[0_0_10px_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_#D4AF37]"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#050505]/80 backdrop-blur-md border border-gray-800 p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/50 transition-colors">
                <div className="flex flex-col mb-4">
                  <h3 className="font-cinematic text-3xl text-white tracking-wide">MAHINDRA KABIRA</h3>
                  <time className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] mt-2 uppercase">Operations Volunteer | 11/2025</time>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">Managed the ingestion and validation of large-scale attendee records, ensuring operational data accuracy within a highly volatile, fast-paced live festival environment.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-[#050505] group-hover:border-[#D4AF37] text-gray-500 group-hover:text-[#D4AF37] shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_15px_#D4AF37]"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#050505]/80 backdrop-blur-md border border-[#D4AF37]/30 p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col mb-4">
                  <h3 className="font-cinematic text-3xl text-white tracking-wide">ASHA MAHA VIDYALAYA</h3>
                  <time className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] mt-2 uppercase">Bachelor of Commerce (B.Com) | 2022 - 2025</time>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">Core focus on Financial Accounting, Business Economics, and Statistics. Developed an advanced understanding of statistical data validation, business audit principles, and corporate finance.</p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 7. BRAND NEW CONTACT & CLOSING PITCH SECTION */}
      <section id="contact" className="py-32 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#0a0a0a] relative border-t border-[#D4AF37]/20 overflow-hidden z-10 mt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerReveal}>
            
            <motion.p variants={itemReveal} className="gold-text font-bold tracking-[0.3em] text-[10px] uppercase mb-8 drop-shadow-md">WHY ME?</motion.p>
            
            <motion.h2 variants={itemReveal} className="font-cinematic text-4xl md:text-6xl uppercase leading-tight text-white mb-10 drop-shadow-lg">
              "DATA ONLY MATTERS IF IT <br className="hidden md:block"/> <span className="gold-text">DRIVES DECISIONS.</span>"
            </motion.h2>
            
            <motion.p variants={itemReveal} className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-16 drop-shadow-md">
              I don't just hand over spreadsheets; I hand over solutions. By combining my background in commerce with advanced technical skills in SQL, Power BI, and Excel, I translate confusing datasets into crystal-clear roadmaps. If you need a Business Analyst who understands the bottom line as well as the database, let's talk.
            </motion.p>

            <motion.div variants={itemReveal} className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="mailto:akshatrastogi0425@gmail.com" className="w-full md:w-auto gold-bg text-black px-10 py-5 text-xs font-black tracking-[0.15em] uppercase hover:bg-yellow-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3 rounded-sm">
                <Mail size={18} strokeWidth={2.5} /> SEND AN EMAIL
              </a>
              <div className="flex gap-4">
                <a href="https://github.com/AkshatRastogi-Analyst" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110 transition-all bg-[#050505]/80 backdrop-blur-md shadow-lg font-bold tracking-widest text-xs">
                  GH
                </a>
                <a href="tel:+918468037051" className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110 transition-all bg-[#050505]/80 backdrop-blur-md shadow-lg">
                  <Phone size={18} />
                </a>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

    </div>
  )
}