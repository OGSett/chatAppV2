import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const ChatVotComp = ({ socket, userName1 }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const {user, logout } = useContext(AuthContext)
    const userName = userName1 || localStorage.getItem("userName");
    const [laeba, setLaeba] = useState('')
   
console.log('la la ', user)
    useEffect(() => {
        socket.emit("joinRoom", "general");
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        setLaeba(user?.username)
        return () => {
            socket.off("assignUserInfo");
            socket.off("receiveMessage");
        };
    }, [socket, user]);

    const sendMessage = () => {
        if (!user) {
            alert("Sender ID not ready. Please wait...");
            return;
        }

        if (!input.trim()) {
            alert("Cannot send an empty message!");
            return;
        }
        console.log('msg is ', input)
        socket.emit("sendMessage", {
            room: "general",
            message: input,
        });
        setInput("");
    };

    console.log("Sender ID outside of useEffect:", userName);
    const handleLogout = () => {
        if (socket) {
            socket.disconnect(); 
            console.log('Socket disconnected');
        }
        localStorage.removeItem('token'); 
        localStorage.removeItem('userName'); 
        logout()
        window.location.href = '/login'; 
    };

    return (
        <div className="holder">
            <span>{laeba}</span>
            <div className="msgHolder" style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg.sender === userName ? (
                            <p className="sent">You: {msg.message}</p>
                        ) : (
                            <p className="receive">{msg.sender}: {msg.message}</p>
                        )}
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                style={{ width: "80%", padding: "10px", marginRight: "10px" }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} style={{ padding: "10px" }}>
                Send
            </button>
            <button onClick={handleLogout}>deco</button>
        </div>
    );
};

export default ChatVotComp;
