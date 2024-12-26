import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

const HomeAfter = () => {

    const [userState, setUserState] = useState(false)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const HandleGoToChat = () => {
        if (!user) {
            alert("User details not ready. Please wait.");
            return;
        }
        navigate("/chat" );
    };
    useEffect(()=>{
        if(user) {
            setUserState(true)
        } else {
            setUserState(false)
        }
    }, [user])
    return ( 
        <div className="homeAfterLg">
            <NavBar userState={userState} />
            <div className="roomsWrapper">
                <h1 className="title">ROOMS</h1>
                <div className="room-card">
                    <div className="room-info">
                        <h2 className="room-name">General Chat</h2>
                        <p className="room-participants">Participants: 15</p>
                    </div>
                    <button className="join-button" onClick={HandleGoToChat}>Join</button>
                </div>
                <div className="room-card">
                    <div className="room-info">
                        <h2 className="room-name">Gaming Room</h2>
                        <p className="room-participants">Participants: 10</p>
                    </div>
                    <button className="join-button">Join</button>
                </div>
                <div className="room-card">
                    <div className="room-info">
                        <h2 className="room-name">Study Group</h2>
                        <p className="room-participants">Participants: 7</p>
                    </div>
                    <button className="join-button">Join</button>
                </div>
            </div>
            <footer className="tester">
                <span>Yussef MK 2024 ©</span>
            </footer>
        </div>
     );
}
 
export default HomeAfter;


