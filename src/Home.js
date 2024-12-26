import { Link  } from 'react-router-dom';
import NavBar from './Navbar';
import './NewCss.css'



const Home = () => {

    return (
        <div className='homewrapper'>
            <NavBar />
            <div>
                <header>
                    <h1>Welcome to LETS-CHAT!</h1>
                    <p>Connect, communicate, and collaborate with ease. LETS-CHAT is your go-to platform for seamless and secure real-time messaging. Whether you’re chatting one-on-one or in a group, we bring people closer with modern and user-friendly features.</p>
                </header>
                <main>
                    <section>
                        <h2>Why Choose LETS-CHAT?</h2>
                        <ul>
                            <li><strong>Real-Time Conversations:</strong> Instant messaging with real-time updates.</li>
                            <li><strong>User-Friendly Interface:</strong> Clean and intuitive design for smooth navigation.</li>
                            <li><strong>Secure Communication:</strong> Your privacy is our priority, with robust data encryption.</li>
                            <li><strong>Flexible Features:</strong> Chat privately, create groups, and share media effortlessly.</li>
                            <li><strong>Always Connected:</strong> Stay in touch with online/offline status and notifications.</li>
                        </ul>
                    </section>
                    <section>
                        <p>Start your journey today and experience the next level of communication.</p>
                        <p><a href="/register" className="btn">Sign up now and join the conversation!</a></p>
                    </section>
                </main>
            </div>
            <div className='homeBtnHolder'>
            <Link to="/register">
                    <button>Register</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            <footer>
                <span>Yussef MK 2024 ©</span>
            </footer>
        </div>
    );
};

export default Home;
