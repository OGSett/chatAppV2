import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import NavBar from "./Navbar";

const Login = () => {
    const { login, token } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            navigate('/home')
        }
    },[token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://chatappbackend-kozz.onrender.com/api/users/login", formData);
            login(response.data.user, response.data.token);
            setMessage("Login successful!");
            navigate("/home");
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="LoginPage" >
            <NavBar/>
            <div className="loginWrapper">
                <h1>Log in!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="extrafeatherlogin">
                    <a href="/"><span>Forgot password?</span></a>
                    <span>not registred?<a href="/register"><span>register now!</span></a></span>
                </div>
                {message && <p>{message}</p>}
            </div>
            <footer>
                
            </footer>
        </div>
    );
};

export default Login;
