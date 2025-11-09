import React from "react";
import {
  FaChartLine,
  FaRobot,
  FaBalanceScale,
  FaChartPie,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";
import Footer from "../components/common/Footer";

const features = [
  {
    icon: <FaChartLine className="text-primary text-3xl" />,
    title: "Predictive Cash Flow",
    description:
      "Gain precise liquidity forecasts powered by historical data and market insights. Stay prepared for every financial situation.",
  },
  {
    icon: <FaChartPie className="text-primary text-3xl" />,
    title: "Dynamic Budgeting",
    description:
      "Smart AI-driven budgeting that adapts automatically to your real-time business performance and growth goals.",
  },
  {
    icon: <FaBalanceScale className="text-primary text-3xl" />,
    title: "Consolidated Reporting",
    description:
      "Simplify your decision-making with unified financial dashboards and cross-platform analytics — all in one place.",
  },
  {
    icon: <FaShieldAlt className="text-primary text-3xl" />,
    title: "Compliance Monitoring",
    description:
      "Stay compliant effortlessly. Receive instant alerts on regulatory updates and policy changes that affect your business.",
  },
  {
    icon: <FaRobot className="text-primary text-3xl" />,
    title: "Ask FinAI Chatbot",
    description:
      "Interact with our intelligent assistant for real-time financial advice, insights, and personalized recommendations.",
  },
  {
    icon: <FaLightbulb className="text-primary text-3xl" />,
    title: "Growth Opportunity Finder",
    description:
      "Discover new market opportunities and expansion paths through advanced data analytics powered by FinAI.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="uppercase text-sm tracking-[3px] font-semibold text-[#0f766e] dark:text-[#14b8a6]">
            FinAI's Powerful Features
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3">
            Intelligence for Smarter Growth
          </h1>
          <div className="mt-4 w-24 h-[3px] bg-gradient-to-r from-[#0f766e] to-[#14b8a6] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Empower your business with data-driven intelligence, seamless
            automation, and real-time financial visibility.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 
              hover:border-[#14b8a6]/60 dark:hover:border-[#14b8a6]/60 hover:shadow-[0_0_25px_#0f766e80]
              transition-all duration-300 rounded-2xl p-8 flex flex-col items-start hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#14b8a6]/10 border border-[#0f766e] mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                {feature.description}
              </p>
              <a
                href="#"
                className="mt-6 inline-block text-[#14b8a6] font-medium hover:underline hover:text-[#0f766e] transition-colors"
              >
                Explore Tool →
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
