import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Head from 'next/head';

const Gurudev = ({ page }: { page: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'rchat', text: 'Hellow, Gurudev Narsi is here !' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  let settimeout: NodeJS.Timeout | null = null;
  let setnewtimeout: NodeJS.Timeout | null = null;

  const appendTypingAnimation = () => {
    // Clear existing "Typing..." messages
    setMessages((prevMessages) => prevMessages.filter(msg => msg.text !== 'Typing...'));

    // Add new "Typing..." message
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'rchat', text: 'Typing...' },
    ]);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setIsSending(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'schat', text: inputValue },
      ]);
      setInputValue('');
      // Simulate typing animation
      appendTypingAnimation();

      try {
        const response = await fetch(
          `https://WellinformedHeavyBootstrapping.yasirmecom.repl.co/ask?question=users,${encodeURIComponent(
            inputValue
          )}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        let responseData: any;

        // Check if the response has the 'content-type' header and it's JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
        } else {
          // If not JSON, handle plain text or other formats
          responseData = { answer: await response.text() };
        }

        console.log('API Response Data:', responseData);
        if (setnewtimeout) {
          clearTimeout(setnewtimeout);
        }

        // Remove typing animation and display AI response
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
          { type: 'rchat', text: responseData.answer },
        ]);

        setIsSending(false);
      } catch (error) {
        console.error('Error during API call:', error);

        // Display an error message
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => msg.text !== 'Typing...'), // Remove all "Typing..." messages
          { type: 'rchat', text: 'An error occurred during the API call.' },
        ]);

        setIsSending(false);
      }
    }

    setInputValue('');
  };

  useEffect(() => {
    if (messages) {
      if (settimeout) {
        clearTimeout(settimeout);
      }
      if (setnewtimeout) {
        clearTimeout(setnewtimeout);
      }
    }
  }, [settimeout, setnewtimeout, messages]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
      </Head>
      <Header page="Gurudev" />
      <main>
        <div className="topper">
          <div className="icon"></div>
          <div className="name" id='dazzle' >Dazzlone</div>
        </div>
        <div className="msgs_cont">
          <ul id="list_cont">
            {messages.map((message, index) => (
              <li key={index} className={message.type}>
                {message.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom">
          <div id="input">
            <input
              type="text"
              id="txt"
              placeholder="Send a message"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={isSending}
            >
              <h1 className='Sendcolor'> Send</h1>
            </button>
          </div>
        </div>
      </main>
      <style jsx>{`
        .name {
          font-size: 36px;
        }

        .send-btn {
          background: linear-gradient(45deg, #ff8a00, #e52e71);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .send-btn:hover {
          background: linear-gradient(45deg, #e52e71, #ff8a00);
        }
      `}</style>
    </>
  );
};

export default Gurudev;
