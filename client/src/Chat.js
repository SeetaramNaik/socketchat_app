import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        userName: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes() +
          ':' +
          new Date(Date.now()).getSeconds(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);

      setMessageList((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);
  // console.log(messageList);
  return (
    //chat-window
    <div className='chat'>  
    {/* chat-header */}
      <div className='header'>
        <h3>Do some chat buddy...</h3>
      </div>
      {/* chat-body */}
      <div className='body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
            return (
              <div
                className='message'
                id={username === messageContent.userName ? 'you' : 'other'}
              >
                <div>
                  <div className='message-content'>
                    <h5 className='msg'>{messageContent.message}</h5>
                  </div>
                  <div className='message-info'>
                    {/* id:time */}
                    <p className='time'>{messageContent.time}</p>
                   {/* id:author */}
                    <p className='user'>{messageContent.userName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      {/* chat-footer */}
      <div className='footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Type something...'
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onClick={sendMessage}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#10148;</button>
      </div>
    </div>
  );
}

export default Chat;
