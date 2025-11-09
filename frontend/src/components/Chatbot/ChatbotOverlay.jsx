import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiChat3Fill } from 'react-icons/ri';

export default function ChatbotOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: open ? 1 : 0.9, opacity: open ? 1 : 0 }}
        transition={{ type: 'spring' }}
        className={`fixed bottom-6 right-6`}
      >
        {open && (
          <div className="w-80 h-96 bg-white shadow-lg rounded-xl p-3 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">FinAI Chatbot</div>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto text-sm text-gray-700">
              <div className="text-xs text-gray-400 mb-2">AI is ready to help with budgeting, loans and insights.</div>
              {/* placeholder conversation */}
              <div className="space-y-2">
                <div className="text-right">
                  <div className="inline-block bg-primary text-white px-3 py-2 rounded-lg">How can I improve cash flow?</div>
                </div>
                <div className="text-left">
                  <div className="inline-block bg-gray-100 px-3 py-2 rounded-lg">Try reducing recurring costs by 10% and push invoice terms shorter.</div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <input className="w-full rounded-md border px-3 py-2" placeholder="Ask FinAI..." />
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl"
          aria-label="chatbot"
        >
          <RiChat3Fill size={20} />
        </button>
      </motion.div>
    </>
  );
}
