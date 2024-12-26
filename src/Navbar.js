import logo from './pngwing.png'
import { Link  } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useState,useContext } from 'react';
import { AuthContext } from "./AuthContext";

const NavBar = ({userState}) => {
    const [caseIsUp, setCaseIsUp] = useState(false)
    const {socket, logout} = useContext(AuthContext)

    const HandleUserBurg = () => {
        if(caseIsUp) {
            setCaseIsUp(false)
        } else {
            setCaseIsUp(true)
        }
    }

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
        <div className="navWrapper">
            <div className="logoholder">
                <Link to='/'><img src={logo} alt="/" /></Link>
            </div>
            <div className='btnNavHolder'>
                <Link to='/'><button>Home</button></Link>
                <Link to='/'><button>F A Q</button></Link>
                <Link to='/'><button>Feathers</button></Link>
                {userState ? (<FaUser onClick={HandleUserBurg} className='d' />) : null}
            </div>
            {caseIsUp ? (<div className='userRouting'>
                <div className='userLinkis' to='/'><span>Profile</span></div>
                <div className='userLinkis' to='/'><span>Tickets</span></div>
                <div className='userLinkis' onClick={handleLogout} to='/'><span>Sign out</span></div>
            </div>) : null}
        </div>
     );
}
 
export default NavBar;