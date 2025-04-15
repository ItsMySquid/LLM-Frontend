import { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

function ChatApp() {
    const [messages, setMessages] = useState(() =>
        JSON.parse(localStorage.getItem("myChatHistory")) || []
    );
    const [input, setInput] = useState("");
    const chatAreaRef = useRef();

    useEffect(() => {
        // Scroll automatisch naar beneden bij nieuwe berichten
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = input.trim();
        if (!prompt) return;

        const newMessages = [...messages, { sender: 'user', text: prompt }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: newMessages.map(msg => [msg.sender === "user" ? "human" : "assistant", msg.text])
                })
            });

            if (!response.ok) {
                throw new Error(`Serverfout: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { sender: "bot", text: data.message };

            const updatedMessages = [...newMessages, botMessage];
            setMessages(updatedMessages);
            localStorage.setItem("myChatHistory", JSON.stringify(updatedMessages));
        } catch (err) {
            const errorMessage = { sender: "bot", text: "Er ging iets mis met het ophalen van een antwoord." };
            const fallback = [...newMessages, errorMessage];
            setMessages(fallback);
            localStorage.setItem("myChatHistory", JSON.stringify(fallback));
        }
    };

    return (
        <div className="chat-background">
            <div className="background-overlay" />
            <h1 className="title">Skyblock Bot</h1>
            <div className="chat-container">
                <p className="subtitle">Stel je vraag over Skyblock-items</p>

                <div className="chat-area" ref={chatAreaRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-bubble ${msg.sender}`}>
                            <img
                                className="avatar"
                                src={msg.sender === 'user'
                                    ? "https://mc-heads.net/avatar/Steve/50"
                                    : "https://mc-heads.net/avatar/5b09e3561de24bbfa5471873fcd72904"}
                                alt={`${msg.sender} avatar`}
                            />
                            <div className="message">{msg.text}</div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Typ je vraag hier..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">Verstuur</button>
                </form>
            </div>
        </div>
    );
}

export default ChatApp;
