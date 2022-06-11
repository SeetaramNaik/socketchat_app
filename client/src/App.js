import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:4001');
// const socket = io.connect('http://localhost', {
//   transports: ['websocket'],
//   upgrade: false,
// });
function App() {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && roomId !== '') {
      socket.emit('join_room', roomId);
      setShowChat(true);
    }
  };

  return (
    <div className='App'>
      {!showChat ? (
      //joinChatContainer
       <div className='container'>    
          <h1>JOIN CHAT</h1>
          <input
            type='text'
            value={userName}
            placeholder='Enter your name'
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type='text'
            value={roomId}
            placeholder='Enter room ID'
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <button className='join-btn' onClick={joinRoom}>JOIN ROOM</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={roomId} />
      )}
    </div>
  );
}

export default App;
