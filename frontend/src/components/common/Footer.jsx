import React from "react";

const Footer = () => {
  const PRIMARY_COLOR = "text-[#00C6AE]";

  return (
    <footer className="bg-gray-50 dark:bg-gradient-to-b from-[#0a0f1a] via-[#0b1725] to-[#001f1f] text-gray-600 dark:text-gray-300 py-16 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* === Main Footer Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-16 lg:gap-x-24 text-center md:text-left">
          {/* === Logo + Description === */}
          <div>
            <div className="mb-6 flex justify-center md:justify-start items-center space-x-1">
              <span className={`text-3xl font-extrabold ${PRIMARY_COLOR}`}>Fi</span>
              <span className="text-3xl font-extrabold text-gray-800 dark:text-white">nAI</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:pr-6">
              Empowering SMEs with <span className={PRIMARY_COLOR}>AI-driven</span> financial management. 
              Make smarter, data-backed decisions with confidence and clarity.
            </p>
          </div>

          {/* === Quick Links === */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#00C6AE] after:mt-2 after:mx-auto md:after:mx-0">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {["Features", "About Us", "Contact"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-[#00C6AE] transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* === Legal === */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-5 relative inline-block after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#00C6AE] after:mt-2 after:mx-auto md:after:mx-0">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              {["Privacy Policy", "Terms of Service"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-[#00C6AE] transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Divider === */}
        <div className="mt-14 border-t border-gray-200 dark:border-gray-700/60"></div>

        {/* === Copyright === */}
        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-800 dark:text-white">FinAI</span> — Developed by{" "}
          <span className="text-[#00C6AE] font-medium">Team TetraNex</span>, IIUC, Bangladesh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;