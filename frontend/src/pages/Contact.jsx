import React, { useState } from "react";
import Footer from "../components/common/Footer"; // adjust path if needed

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between bg-white dark:bg-[#0b1120] transition-colors duration-500">
      <div className="flex justify-center items-start pt-28 px-4">
        <div className="flex max-w-4xl w-full rounded-2xl shadow-lg border overflow-hidden border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-[0_0_25px_#0b8b7250]">
          {/* ===== Left Panel ===== */}
          <div className="w-2/5 text-white p-10 flex flex-col justify-between bg-gradient-to-b from-[#0b4741] to-[#0e5b52]">
            <div>
              <h2 className="text-3xl border-b-2 pb-2 mb-6 border-[#0b8b72] font-semibold">
                Get in Touch
              </h2>
              <p className="mb-6 text-base opacity-90">
                Have questions about FinAI? Reach out to our dedicated support
                team — we’re here to help you grow.
              </p>
              <div className="text-base space-y-2 opacity-95">
                <p>📞 +880 123 456 789</p>
                <p>📧 support@finai.com</p>
                <p>📍 Chittagong, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* ===== Right Panel ===== */}
          <div className="w-3/5 p-10 bg-white dark:bg-[#0b1120] transition-colors duration-500">
            <h2 className="text-2xl font-bold mb-6 text-[#0b8b72]">
              Send Us a Message
            </h2>

            {status && (
              <p
                className={`font-bold mb-4 ${
                  status.includes("sent") ? "text-[#0b8b72]" : "text-red-500"
                }`}
              >
                {status}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {["name", "email", "subject"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-[#0e5b52] 
                  text-gray-800 dark:text-white bg-gray-50 dark:bg-[#0b4741] focus:border-[#0b8b72] 
                  outline-none transition hover:bg-[#0f544d10] dark:hover:bg-[#0f544d30]"
                  required
                />
              ))}

              <textarea
                name="message"
                placeholder="Your Message..."
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 rounded-md border border-gray-300 dark:border-[#0e5b52] 
                text-gray-800 dark:text-white bg-gray-50 dark:bg-[#0b4741] focus:border-[#0b8b72] 
                outline-none transition hover:bg-[#0f544d10] dark:hover:bg-[#0f544d30]"
                required
              />

              <button
                className="w-full py-3 font-bold rounded-md bg-[#0b4741] hover:bg-[#0b8b72]
                text-white transition-all duration-300"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
