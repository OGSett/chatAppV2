import './App.css';
import Home from './Home';
import Register from './Register';
import ChatVotComp from './ChatComp';
import Login from './Login';
import { io } from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import HomeAfter from './HomeAfter';

function App() {
    const [socket, setSocket] = useState(null);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            const newSocket = io('https://chatappbackend-kozz.onrender.com', { auth: { token } });
            setSocket(newSocket);

            newSocket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            return () => {
                newSocket.disconnect();
            };
        } else {
            console.warn('No token found. Redirecting to login...');
        }
    }, [token]);

    console.log('Using AuthContext to get token info:', token);
    console.log('Using AuthContext to get user info:', user);
    console.log('Socket is:', socket);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/chat"
                    element={
                        socket ? (
                            <ChatVotComp socket={socket} userName1={user?.username} />
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                />
                <Route path="/home" element={<HomeAfter />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/login"
                    element={
                        <Login renderHomeComp={true} />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
