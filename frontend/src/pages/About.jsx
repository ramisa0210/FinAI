import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

export default function Team() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-500">
      {/* ===== Shared Header ===== */}
      <Header />

      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-teal-800 dark:to-emerald-900 text-center py-16 text-white transition-colors duration-500">
        <h1 className="text-4xl font-bold mb-2">Meet Our Team Tetranex</h1>
        <p className="text-md max-w-2xl mx-auto">
          We're a group of passionate students from IIUC, Bangladesh, dedicated to
          empowering SMEs with AI-driven financial tools
        </p>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 px-10 py-16 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-950 dark:to-teal-950 transition-colors duration-500">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-emerald-300">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Small and Medium Enterprises are the backbone of Bangladesh's economy,
            but many struggle with financial management and lack access to advanced
            analytical tools. FinAI was born from the idea that every business
            owner, regardless of their technical expertise, should have access to
            powerful AI-driven insights that help them make smarter financial
            decisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            We're committed to democratizing financial intelligence and helping SMEs
            grow with confidence.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="./images/about.jpg"
            alt="AI Financial Analysis"
            className="rounded-lg shadow-lg dark:shadow-emerald-900/40"
          />
        </div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-teal-950 py-16 text-center transition-colors duration-500">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-emerald-300">The Team</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Meet the minds behind FinAI
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {/* Member 1 */}
          <div className="bg-gradient-to-b from-emerald-600 to-teal-500 dark:from-teal-700 dark:to-emerald-800 text-white rounded-lg py-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-400 dark:bg-emerald-500 mx-auto rounded-full flex items-center justify-center text-2xl font-bold">
              ZT
            </div>
            <h3 className="mt-4 font-semibold text-lg">Zarin Tasneem</h3>
            <p className="text-gray-100 text-sm mt-1">
              Team Leader Researcher & AI/ML Engineer
            </p>
          </div>

          {/* Member 2 */}
          <div className="bg-gradient-to-b from-emerald-600 to-teal-500 dark:from-teal-700 dark:to-emerald-800 text-white rounded-lg py-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-400 dark:bg-emerald-500 mx-auto rounded-full flex items-center justify-center text-2xl font-bold">
              TT
            </div>
            <h3 className="mt-4 font-semibold text-lg">Tasmiya Tithi</h3>
            <p className="text-gray-100 text-sm mt-1">UI/UX Designer</p>
          </div>

          {/* Member 3 */}
          <div className="bg-gradient-to-b from-emerald-600 to-teal-500 dark:from-teal-700 dark:to-emerald-800 text-white rounded-lg py-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-400 dark:bg-emerald-500 mx-auto rounded-full flex items-center justify-center text-2xl font-bold">
              WJ
            </div>
            <h3 className="mt-4 font-semibold text-lg">Waziha Jannat</h3>
            <p className="text-gray-100 text-sm mt-1">Full Stack Web Developer</p>
          </div>

          {/* Member 4 */}
          <div className="bg-gradient-to-b from-emerald-600 to-teal-500 dark:from-teal-700 dark:to-emerald-800 text-white rounded-lg py-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-emerald-400 dark:bg-emerald-500 mx-auto rounded-full flex items-center justify-center text-2xl font-bold">
              TT
            </div>
            <h3 className="mt-4 font-semibold text-lg">Maryam Tahira</h3>
            <p className="text-gray-100 text-sm mt-1">
              Video Editor
            </p>
          </div>
        </div>
      </section>

      {/* ===== Shared Footer ===== */}
      <Footer />
    </div>
  );
}
