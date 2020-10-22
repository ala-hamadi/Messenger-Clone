import React,{useState, useEffect} from 'react';
import './App.css';
import messengerIcon from './messenger.png'
import Message from './Message';
import {FormControl,InputLabel,Input,IconButton,CircularProgress } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
function App() {
  const [input,setInput]=useState('');
  const [messages,setMessages]=useState([]);
  const [username,setUsername]=useState('');
  const [toogle,setToogle]=useState(true);
  
  useEffect(()=>{
    setUsername(prompt('Enter your name'));
  },[])

  useEffect(()=>{
    db.collection('messages').orderBy('createdAt','desc').onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
    });
  },[])
  const handleChange=(e)=>{
    setInput(e.target.value);
  }
  const sendMessages=(e)=>{
    e.preventDefault();
    db.collection('messages').add({
      text:input,
      username:username,
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  const toogleForm=()=>{
    setToogle(!toogle)
  }

  
  return (
    <div className="App">
        <img src={messengerIcon} alt="messenger-icon" className="messengerIcon"/>
        <h2 style={{marginBottom:"70px"}}>Welcome {username ? username : "Anonymous"}</h2>
        
        {toogle ? 
          <IconButton 
              variant="contained" 
              color="primary" 
              onClick={toogleForm}
              className="app__iconColor app__iconButton"
            >
              <OpenInBrowserIcon style={{fontSize:50}}/>  
          </IconButton>
          :
            <form className="app__form">
              <IconButton 
                  variant="contained" 
                  color="primary" 
                  className="app__iconColor"
                  onClick={toogleForm}
                  style={{marginLeft:-36}}
                >
                  <CancelPresentationIcon style={{fontSize:50}}/>  
                </IconButton>
              <FormControl className="app__formControl">
                <InputLabel >Enter a message</InputLabel>
                <Input value={input} onChange={handleChange} className="app__input" />
                <IconButton 
                  variant="contained" 
                  color="primary" 
                  disabled={!input} 
                  type="submit" 
                  onClick={sendMessages}
                  className="app__iconColor"
                >
                  <SendIcon />  
                </IconButton>
              </FormControl>
            </form>
          }
          
        <FlipMove>
          {
            messages.length===0 ? 
            <CircularProgress size={200} className="app__loading"/> :
            messages.map(message=>(
              <Message key={message.id} username={username} message={message.data} />
            ))
          }
        </FlipMove>
    </div>
  );
}

export default App;
