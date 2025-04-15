import { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

function ChatApp() {
    const [messages, setMessages] = useState(() =>
        JSON.parse(localStorage.getItem("myChatHistory")) || []
    );
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);  // Timer state
    const chatAreaRef = useRef();

    useEffect(() => {
        // Scroll automatisch naar beneden bij nieuwe berichten
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, [messages]);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = input.trim();
        if (!prompt || isLoading) return;

        setIsLoading(true);

        const newMessages = [...messages, { sender: 'user', text: prompt }];
        const updatedMessages = [...newMessages, { sender: 'bot', text: "" }]; // Leeg botbericht om op te bouwen
        setMessages(updatedMessages);
        setInput("");

        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            });

            if (!response.ok) {
                new Error(`Serverfout: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                for (let char of chunk) {
                    fullResponse += char;
                    updatedMessages[updatedMessages.length - 1].text = fullResponse;
                    setMessages([...updatedMessages]);
                    await sleep(30); // Vertraag de weergave (30ms per karakter)
                }
            }

            localStorage.setItem("myChatHistory", JSON.stringify(updatedMessages));
        } catch (err) {
            const errorMessage = { sender: "bot", text: "Er ging iets mis met het ophalen van een antwoord." };
            const fallback = [...newMessages, errorMessage];
            setMessages(fallback);
            localStorage.setItem("myChatHistory", JSON.stringify(fallback));
        } finally {
            setIsLoading(false);
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
                    <button type="submit" disabled={isLoading}>Verstuur</button>  {/* Button disabled tijdens wachten */}
                </form>
            </div>
        </div>
    );
}

export default ChatApp;
