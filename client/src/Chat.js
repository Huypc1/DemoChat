import React,{useState,useEffect} from "react";
function Chat ({socket,username,room}){
    const [currentMessage,setCurrentMessage] = useState('');
    const [messageList,setmessageList] = useState([]);
    const sendMessage = async (event) => {
        event.preventDefault(); // Prevent form submission and page refresh
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setmessageList((list) => [...list, messageData]);
            setCurrentMessage(''); // Clear the input after sending the message
        }
    };
    
    useEffect(() => {
        // Lắng nghe sự kiện "receive_message" khi component được tạo (mount)
        socket.on("receive_message", (data) => {
            setmessageList((list) => [...list, data]);
        });
    
        // Hủy đăng ký lắng nghe khi component unmount
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);
    console.log(username);
 return(
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p> 
        </div>
        <div className="chat-body">
            {messageList.map((messageContent)=>(
             <div className="message" id={username === messageContent.author ? "other":"you"}>
                <div>
                    <div className="message-content">
                        <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className="chat-footer">
            <input type="text" placeholder="Key.."  value={currentMessage}   onChange={(event) => {setCurrentMessage(event.target.value)}}
            onKeyPress={(event) => {event.key === "Enter" && sendMessage()}} />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
 )
}
export default Chat