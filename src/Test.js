const Test = ({socket,setRenderHomeComp}) => {

    const checkTest = () => {
        if (socket) {
            socket.disconnect(); 
            console.log('Socket disconnected');
        }
        localStorage.removeItem('token'); 
        localStorage.removeItem('userName'); 
        setRenderHomeComp(false)
        window.location.href = '/';
    }
    return ( 
        <div>hh
            <button onClick={checkTest}></button>
        </div>
     );
}
 
export default Test;