import React from "react";
import { MdOutlineAnalytics, MdOutlineQuestionAnswer } from "react-icons/md";
import { FaLaptopCode, FaTimesCircle, FaGlobe } from "react-icons/fa";
import Footer from "../components/common/Footer";

const Homepage = () => {
  const ACCENT = "text-[#00C6AE]"; // Teal color
  const ACCENT_HEX = "#00C6AE"; // Teal Hex for custom shadows

  return (
    <div className="bg-white dark:bg-[#0b1120] text-gray-800 dark:text-white min-h-screen font-sans">
      
      {/* ===== HERO SECTION (Added Glowing Shadow to h1.png) ===== */}
      <section className="relative overflow-hidden pt-40 pb-28 bg-gray-50 dark:bg-gradient-to-br from-[#05070d] via-[#0b1a2a] to-[#003d3b]">
        {/* Soft gradient glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00C6AE]/20 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[160px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* TEXT CONTENT */}
          <div className="md:w-1/2 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
              Empower Your <br />
              <span className={ACCENT}>Financial Future</span> <br />
              with FinAI
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-base md:text-lg leading-relaxed max-w-lg">
              Unlock the potential of AI-driven financial insights. FinAI helps
              small and medium enterprises automate analytics, forecast trends,
              and make data-backed decisions for sustainable growth.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="bg-gradient-to-r from-[#00C6AE] to-blue-500 hover:scale-105 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-[#00C6AE]/40 transition duration-300">
                Get Started
              </button>
              <button className="border border-[#00C6AE] hover:bg-[#00C6AE]/10 text-[#00C6AE] font-semibold py-3 px-8 rounded-full text-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* HERO IMAGE (SHADES APPLIED) */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
            <div className="absolute w-[400px] h-[400px] bg-[#00C6AE]/20 rounded-full blur-[100px] top-20 right-20"></div>
            <img
              src="/images/h1.png"
              alt="AI Interface"
              // <<< Glowing shadow added here >>>
              className={`max-w-[420px] w-full relative rounded-lg 
                drop-shadow-[0_0_20px_rgba(0,198,174,0.4)] transition duration-500 hover:drop-shadow-[0_0_35px_rgba(0,198,174,0.6)]`}
            />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION (Dark Background Match) ===== */}
      <section className="bg-gray-100 dark:bg-[#0f172a] py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">
          The Challenges <span className={ACCENT}>SMEs</span> Face
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Traditional finance management is slowing innovation
        </p>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaTimesCircle className="text-red-500 text-4xl mb-4 mx-auto" />,
              title: "Limited Insights",
              desc: "Manual processes prevent real-time analysis and accurate forecasting.",
            },
            {
              icon: <FaTimesCircle className="text-red-500 text-4xl mb-4 mx-auto" />,
              title: "Inefficient Reporting",
              desc: "Businesses waste time on data entry instead of strategic planning.",
            },
            {
              icon: <FaTimesCircle className="text-red-500 text-4xl mb-4 mx-auto" />,
              title: "Lack of Automation",
              desc: "Critical financial actions depend on outdated spreadsheets.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#141b2e] p-8 rounded-xl shadow-xl border-t-4 border-[#00C6AE]/40 hover:scale-105 transition duration-300"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AI THAT WORKS SECTION (Already has Glowing Shadow) ===== */}
      <section className="bg-white dark:bg-[#0b1120] py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center relative">
            {/* Optional: Add a subtle background glow for depth */}
            <div className="absolute w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <img
              src="/images/h2.jpg"
              alt="AI Analytics"
              className={`rounded-lg shadow-2xl max-w-[420px] w-full relative 
                drop-shadow-[0_0_20px_rgba(0,198,174,0.4)] transition duration-500 hover:drop-shadow-[0_0_35px_rgba(0,198,174,0.6)]`}
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-4xl font-extrabold mb-6 leading-snug">
              Smarter. Faster. <span className={ACCENT}>AI-Powered Finance</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              FinAI adapts to your business — turning complex data into
              real-time insights, helping you make confident financial
              decisions.
            </p>
            <ul className="space-y-5">
              {[
                "Analyze and visualize key metrics automatically.",
                "Generate AI-driven forecasts and reports.",
                "Get instant recommendations for growth and savings.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#00C6AE] to-blue-500 rounded-full text-sm font-bold mr-4 text-white">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200 text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION (Dark Background Match) ===== */}
      <section className="bg-gray-100 dark:bg-[#0f172a] py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">Why FinAI?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Explore the intelligent tools built for the future of finance
        </p>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <MdOutlineAnalytics className="text-[#00C6AE] text-5xl mb-4 mx-auto" />,
              title: "Real-Time Analytics",
              desc: "Interactive dashboards that simplify financial data.",
            },
            {
              icon: <FaLaptopCode className="text-[#00C6AE] text-5xl mb-4 mx-auto" />,
              title: "AI Decision Engine",
              desc: "Automated analysis with actionable recommendations.",
            },
            {
              icon: <MdOutlineQuestionAnswer className="text-[#00C6AE] text-5xl mb-4 mx-auto" />,
              title: "Smart Chat Assistant",
              desc: "Instant answers to financial questions, powered by AI.",
            },
            {
              icon: <FaGlobe className="text-[#00C6AE] text-5xl mb-4 mx-auto" />,
              title: "Global Integration",
              desc: "Seamlessly connect across currencies and regions.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#141b2e] p-6 rounded-xl shadow-lg border-t-4 border-[#00C6AE]/40 hover:scale-105 hover:shadow-[#00C6AE]/10 transition duration-300"
            >
              {f.icon}
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION (Corrected Dark Gradient) ===== */}
      <section className="relative py-24 bg-gray-50 dark:bg-gradient-to-br from-[#05070d] via-[#0b1a2a] to-[#003d3b] text-center">
        {/* Background Glows for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C6AE]/10 to-blue-500/10 blur-3xl opacity-50"></div>
        
        <div className="relative max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Revolutionize Your Business?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
            Join the growing community of businesses using FinAI for smarter,
            faster financial decisions.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="bg-gradient-to-r from-[#00C6AE] to-blue-500 hover:scale-105 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg shadow-[#00C6AE]/30 transition duration-300">
              Try FinAI Now
            </button>
            <button className="border border-[#00C6AE] hover:bg-[#00C6AE]/10 text-[#00C6AE] font-medium py-3 px-10 rounded-full text-lg transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;