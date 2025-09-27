"use client"

import { useState, useRef, useEffect } from "react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm VitalBot, your AI health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const suggestionQuestions = [
    "Who created this website?",
    "What are the benefits of VitalWarrior?",
    "How accurate is the facial recognition?",
    "What health metrics can be detected?",
    "Is the scanning process safe?",
    "How long does a health scan take?",
    "What technology powers VitalWarrior?",
    "Can I use this on mobile devices?",
    "How does the AI analysis work?",
    "What makes VitalWarrior different?",
    "Is my health data secure?",
    "How often should I use the scanner?",
    "What if the scan shows health concerns?",
    "Can multiple people use the system?",
    "How do I get started with VitalWarrior?"
  ]

  const faqData = [
    {
      question: "Who developed VitalWarrior?",
      answer: "VitalWarrior was developed by UE-Caloocan CS2G Group: Dave Punzalan, Paul Salazar, and Bien Grafil as part of their innovative health technology project."
    },
    {
      question: "What are the main benefits of using VitalWarrior?",
      answer: "VitalWarrior offers instant health detection (under 2 seconds), 99.9% accuracy, non-contact scanning, AI-powered analysis, real-time results, and 24/7 monitoring capabilities for comprehensive health surveillance."
    },
    {
      question: "How does the facial recognition technology work?",
      answer: "Our advanced AI uses computer vision and machine learning algorithms to analyze facial features, detect vital signs through micro-expressions, thermal patterns, and biometric data with exceptional precision."
    },
    {
      question: "Is my personal health data secure and private?",
      answer: "Yes, all health data is encrypted end-to-end, stored securely, and complies with healthcare privacy standards. We prioritize user privacy and data protection above all else."
    },
    {
      question: "What should I do if the scan detects health concerns?",
      answer: "If unusual health indicators are detected, the system will provide recommendations and suggest consulting with healthcare professionals. VitalWarrior is a monitoring tool, not a replacement for medical advice."
    }
  ]

  const botResponses = {
    "who created this website": "VitalWarrior was created by the talented UE-Caloocan CS2G Group consisting of Dave Punzalan, Paul Salazar, and Bien Grafil. They developed this innovative health monitoring system as part of their advanced computer science project.",
    "benefits": "VitalWarrior offers incredible benefits: ⚡ Instant health detection in under 2 seconds, 🎯 99.9% accuracy rate, 🛡️ Non-contact safe scanning, 🧠 AI-powered analysis, ⏱️ Real-time results, 👁️ 24/7 monitoring, and comprehensive health insights!",
    "accuracy": "Our facial recognition system boasts an impressive 99.9% accuracy rate! This is achieved through advanced AI algorithms, machine learning models, and continuous system improvements.",
    "health metrics": "VitalWarrior can detect multiple health indicators including: body temperature, heart rate, respiratory patterns, stress levels, fatigue indicators, and other vital signs through advanced facial analysis.",
    "safe": "Absolutely! VitalWarrior uses completely non-contact scanning technology. There's no physical interaction required - just position yourself in front of the camera for a safe, hygienic health check.",
    "time": "A complete health scan takes less than 2 seconds! Our optimized AI processes your facial data instantly to provide immediate health insights.",
    "technology": "VitalWarrior is powered by cutting-edge AI technology including computer vision, machine learning algorithms, thermal analysis, and advanced biometric recognition systems.",
    "mobile": "Yes! VitalWarrior is designed to work seamlessly across all devices including mobile phones, tablets, and desktop computers with camera access.",
    "ai analysis": "Our AI analyzes micro-expressions, facial color variations, thermal patterns, and subtle movements to detect vital signs and health indicators that aren't visible to the naked eye.",
    "different": "What sets VitalWarrior apart: lightning-fast scanning, non-contact operation, university-grade accuracy, comprehensive health analysis, and innovative AI technology developed specifically for health monitoring.",
    "secure": "Your health data is protected with enterprise-grade encryption, secure cloud storage, and strict privacy protocols. We never share personal health information without your explicit consent.",
    "frequency": "For optimal health monitoring, we recommend using VitalWarrior daily or whenever you want a quick health check. It's perfect for routine wellness monitoring!",
    "health concerns": "If VitalWarrior detects potential health concerns, it will provide recommendations and suggest consulting with healthcare professionals. Remember, this is a monitoring tool to support, not replace, professional medical care.",
    "multiple people": "Yes! VitalWarrior can be used by multiple people. The system recognizes different individuals and can maintain separate health profiles for family members or groups.",
    "get started": "Getting started is easy! Simply click the 'Start Health Scan' button, position yourself in front of the camera with good lighting, and let our AI do the rest. It's that simple!"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    handleSendMessage(suggestion)
  }

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response
      }
    }
    
    return "Thanks for your question! I'm here to help with VitalWarrior-related inquiries. You can ask about our features, benefits, the development team, or how to get started. Is there something specific you'd like to know?"
  }

  const handleSendMessage = (messageText = inputValue) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: "bot",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section id="chatbot" className="chatbot-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI Assistant & FAQ</h2>
          <p className="section-subtitle">
            Get instant answers about VitalWarrior from our intelligent chatbot
          </p>
        </div>

        <div className="chatbot-grid">
          {/* FAQ Section */}
          <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">
                    <i className="fas fa-question-circle"></i>
                    {faq.question}
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Chatbot Interface */}
          <div className="chatbot-container">
            <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
              <div className="chatbot-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="chatbot-info">
                <h4>VitalBot Assistant</h4>
                <span className="status">Online - Ready to help!</span>
              </div>
              <button className="toggle-btn">
                <i className={`fas fa-chevron-${isOpen ? 'down' : 'up'}`}></i>
              </button>
            </div>

            <div className={`chatbot-interface ${isOpen ? 'open' : ''}`}>
              <div className="messages-container">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="timestamp">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="suggestions-container">
                <p className="suggestions-title">Quick Questions:</p>
                <div className="suggestions-grid">
                  {suggestionQuestions.slice(0, 6).map((suggestion, index) => (
                    <button 
                      key={index} 
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about VitalWarrior..."
                    className="chat-input"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    className="send-btn"
                    disabled={!inputValue.trim()}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chatbot-section {
          background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 25%, #dc2626 50%, #b91c1c 75%, #7f1d1d 100%);
          padding: 80px 0;
          position: relative;
        }

        .chatbot-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        .chatbot-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }

        .faq-section h3 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .faq-question {
          padding: 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .faq-question i {
          color: #3b82f6;
        }

        .faq-answer {
          padding: 0 20px 20px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .chatbot-container {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          overflow: hidden;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .chatbot-header {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chatbot-header:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .chatbot-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
        }

        .chatbot-info h4 {
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .status {
          color: #10b981;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .toggle-btn {
          margin-left: auto;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .toggle-btn:hover {
          color: white;
        }

        .chatbot-interface {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .chatbot-interface.open {
          max-height: 600px;
        }

        .messages-container {
          height: 250px;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          position: relative;
        }

        .message.bot .message-content {
          background: rgba(59, 130, 246, 0.2);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .message.user .message-content {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-content p {
          margin: 0 0 4px 0;
          line-height: 1.4;
        }

        .timestamp {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .suggestions-container {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .suggestions-title {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .suggestions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .suggestion-btn {
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .suggestion-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .input-container {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-wrapper {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .chat-input:focus {
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.1);
        }

        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .send-btn {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 1024px) {
          .chatbot-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .chatbot-container {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .suggestions-grid {
            grid-template-columns: 1fr;
          }
          
          .chatbot-interface.open {
            max-height: 500px;
          }
          
          .messages-container {
            height: 200px;
          }
        }
      `}</style>
    </section>
  )
}