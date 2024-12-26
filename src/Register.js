import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import NavBar from "./Navbar";

const Register = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(token) {
            navigate('/home')
        }
    },[token, navigate])


    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            setMessage(response.data.message);
            navigate('/home')
        } catch (err) {
            setMessage(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="LoginPage" >
            <NavBar/>
            <div className="loginWrapper">
                <form onSubmit={handleSubmit} >
                    <div className="inputHolder">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputHolder">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputHolder">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <footer>
                <span>Yussef MK 2024 ©</span>
            </footer>
        </div>
    );
};

export default Register;
