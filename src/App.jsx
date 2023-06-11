import { useState } from 'react'
// import dotenv from 'dotenv';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import './App.css'
import './ani.css'
// dotenv.config();
const ler = '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';
function App() {
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message: "hi,i am your friend! ask me anything..",
      sender: "ChatGPT"
    }
  ])
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
    const newMessages = [...messages, newMessage];//old + new
    setMessages(newMessages)
    setTyping(true)

    //process
    await processMessageToChatGPT(newMessages);
  }
  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = ""
      if (messageObject.sender === 'ChatGPT') { role = "assistant" } else { role = "user" }
      return { role: role, content: messageObject.message }
    })

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like i am 10 years old."
    }
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...apiMessages]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + ler,
        "Content-Type": "Application/json"
      }, body: JSON.stringify(apiRequestBody)

    }).then((data) => { return data.json() }).then((data) => {
      console.log(data)
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }
      ]);
      setTyping(false)
    })
  }
  return (
    <>
      <div className='App'>
        <h5 className='lo'><span className='a'>W</span>elcome to Raj Chatbot<span className='b'>!</span></h5>
        <div class="main">
          <div class="c first">c</div>
          <div class="c second">h</div>
          <div class="c third">a</div>
          <div class="c fourth">t</div>
        </div>
        <div className='jio' style={{ position: "relative", height: 400, width: 390 }}>
          <MainContainer className='f'>
            <ChatContainer className='g'>
              <MessageList
                typingIndicator={typing ? <TypingIndicator content="Wait for response.." /> : null} >
                {
                  messages.map((message, i) => {
                    return <Message key={i} model={message} />
                  })
                }
              </MessageList>
              <MessageInput placeholder='Type your message...' onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
          <p>  <a style={{ color: 'blue', fontWeight: 'bold', fontSize: 12 }} href="https://rjtxt.netlify.app/" target="_blank">Click here to go to Text Editor</a> <span className='c'>.....</span></p>
         
          <p style={{ color: 'black', fontSize: 9, fontWeight: 'bold' }}>Copyright &copy; 2023 | @Raj | All Rights Reserved.</p>
        </div>
      </div>

    </>
  )
}

export default App
