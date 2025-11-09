import React, { useState, useRef, useEffect } from 'react';

const COLORS = {
  headerGreen: '#38765A',
  headerLight: '#A0D68F',
  pageBackground: '#EAEAEA',
  chatBackground: '#F3F4F6',
  cardBackground: '#FFFFFF',
  textDark: '#333333',
  inputFill: '#D1D1D1',
  sendButton: '#38765A',
  quickActionText: '#333333',
  quickActionBG: '#E0E0E0',
  chatBorder: '#5E8B7A',
};

// FinAI Q&A
const FINAI_QA = {
  "Show today's profit": "Today's profit is $4,320.",
  "What's my cash flow?": "Your current cash flow is positive with $12,500 inflow and $8,200 outflow.",
  "Expense breakdown": "Expenses: Salaries $4,000, Marketing $1,200, Rent $800, Utilities $300.",
  "Best loan options": "Recommended loans: Bank A (5% APR, 12 months), Bank B (4.8% APR, 18 months).",
  "Analyze Q3 sales data": "Q3 sales increased by 18% compared to Q2, driven by product X and service Y.",
  "Projected growth rate": "The projected growth rate for the next quarter is 12%.",
};

const MOCK_MESSAGES = [
  { id: 1, sender: 'FinAI', type: 'text', text: "Hi! I'm FinAI, your AI financial assistant. How can I help you today?" },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickActions = Object.keys(FINAI_QA);

  // Show only 3 random suggestions at a time
  const getRandomSuggestions = () => {
    const shuffled = quickActions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };
  const [visibleSuggestions, setVisibleSuggestions] = useState(getRandomSuggestions());

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newUserMessage = { id: Date.now(), sender: 'user', type: 'text', text };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    setTimeout(() => {
      const answer = FINAI_QA[text] || "I'm sorry, I don't have that information right now.";
      const botReply = { id: Date.now() + 1, sender: 'FinAI', type: 'text', text: answer };
      setMessages(prev => [...prev, botReply]);
      // Voice reply
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(answer);
        window.speechSynthesis.speak(utterance);
      }
    }, 500);

    // Refresh suggestions
    setVisibleSuggestions(getRandomSuggestions());
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      handleSendMessage(transcript);
    };
    recognition.onend = () => setIsListening(false);

    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/images/chat.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '100px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        width: '500px',
        height: '700px',
        backgroundColor: COLORS.chatBackground,
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        border: `1px solid ${COLORS.chatBorder}`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 20px',
          background: `linear-gradient(to right, ${COLORS.headerGreen}, ${COLORS.headerLight})`,
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '10px',
              fontSize: '20px',
              color: COLORS.headerGreen,
              fontWeight: 'bold',
            }}>FI</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Ask FinAI</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Always ready to help</p>
            </div>
          </div>
          <button
            onClick={toggleListening}
            style={{ background: 'none', border: 'none', color: isListening ? 'red' : 'white', fontSize: '20px', cursor: 'pointer' }}
            title="Voice Input"
          >
            {isListening ? '🎙️ Listening...' : '🎤'}
          </button>
        </div>

        {/* Messages */}
        <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto', height: 'calc(100% - 140px)' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
              <div style={{
                maxWidth: '75%',
                padding: '10px 15px',
                borderRadius: '15px',
                backgroundColor: msg.sender === 'user' ? COLORS.headerLight : COLORS.cardBackground,
                color: COLORS.textDark,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                borderTopLeftRadius: msg.sender === 'FinAI' ? '5px' : '15px',
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div style={{ marginTop: '20px', borderTop: `1px solid ${COLORS.inputFill}`, paddingTop: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: COLORS.textDark }}>Quick actions :</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {visibleSuggestions.map((action, i) => (
                <button key={i} onClick={() => handleSendMessage(action)} style={{
                  padding: '8px 12px',
                  borderRadius: '15px',
                  border: 'none',
                  backgroundColor: COLORS.quickActionBG,
                  color: COLORS.quickActionText,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}>
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderTop: `1px solid ${COLORS.inputFill}` }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            style={{ flexGrow: 1, padding: '12px 20px', borderRadius: '20px', border: 'none', backgroundColor: COLORS.inputFill, fontSize: '16px' }}
            disabled={isListening}
          />
          <button
            onClick={() => handleSendMessage(inputMessage)}
            style={{ marginLeft: '10px', padding: '10px', borderRadius: '50%', backgroundColor: COLORS.sendButton, color: 'white', border: 'none', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={!inputMessage.trim() || isListening}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
