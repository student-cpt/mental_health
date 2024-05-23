import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Loader from 'react-js-loader';
import Navbar from '../navbar/Navbar';
import './Therapist.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Analyse the user's input and give suggestions or talk with them and provide an answer in paragraphs with spaces between paragraphs and points. Respond as if you are talking to the user in the first person, not the third person:\n\nUser: ${input}\nTherapist:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let aiMessage = await response.text();

      // Replace **word** with <strong>word</strong>
      aiMessage = aiMessage.replace(/\*\*(.*?)\*\*/g, '$1');

      setMessages([...messages, newMessage, { sender: 'ai', text: aiMessage }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages([...messages, newMessage, { sender: 'ai', text: 'An error occurred while generating the response.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <Navbar />
      <div className="therapist-container">
        <h1 className="heading">Your Personal AI Assistant</h1>
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="message loading">
              <Loader type="spinner-cub" bgColor={"#000000"} color={"#FFFFFF"} title={"spinner-cub"} size={30} />
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-field"
          />
          <button onClick={handleSend} className="send-button">Send</button>
        </div>
      </div>
    </>
  );
};

export default Therapist;
