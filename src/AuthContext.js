import React, { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Wrap logout with useCallback
    const logout = useCallback(() => {
        if (socket) {
            socket.disconnect();
        }
        setUser(null);
        setSocket(null);
        setToken(null);
        localStorage.removeItem("token");
        window.location.href = "/login";
    }, [socket]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                console.warn("No token found. Redirecting to login...");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/users/user-info", {
                    headers: { "x-auth-token": token },
                });
                setUser(response.data.user);

                const newSocket = io("http://localhost:5000", { auth: { token } });
                setSocket(newSocket);
            } catch (error) {
                if (error.response?.status === 401) {
                    console.warn("Token expired or invalid. Logging out...");
                    logout(); // Use stable logout function
                } else {
                    console.error("Error fetching user info:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, logout]); // Add logout to the dependency array

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("token", tokenData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, token, socket, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
