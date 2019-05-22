import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { pathRoutes } from '../routes'
import { Icon, Modal } from 'antd-mobile'
import firebase from 'firebase'
import { mapHueToColor, getGradient } from '../color-picker/utils'
import { getDateDiff } from '../utils'

const alert = Modal.alert

const Layout = styled.div`
  flex: 1;
  padding: 1.5em;
  padding-top: 130px;
  padding-bottom: 120px;
  width: 100%;

  box-sizing: border-box;
`

const Theme = styled.div`
  position: absolute;
  left: 0;
  top: 40px;

  width: 100%;
  height: 70px;

  background: #f5f5f5;

  ${props =>
    props.isGradient
      ? `
  background: ${mapHueToColor(props.hue)};
  background-image: ${getGradient(props.hue, props.hue2)};
`
      : `
  background: ${mapHueToColor(props.hue)};
`}
`

const ChatWrapper = styled.div`
  margin-top: 1.5em;
  display: grid;
  grid-row-gap: 1em;
  position: relative;
`

const LastUpdate = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px !important;
  font-weight: normal !important;
`

const ChatSelf = styled.div`
  max-width: 60%;
  margin-left: auto;
  border: 1px solid gray;
  border-radius: 25px;
  text-align: left;
  padding: 0.25em 1em;
  word-break: break-word;
`

const Avatar = styled.img`
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-size: cover;
  background: #f5f5f5;
`

const ChatOppositeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const ChatOpposite = styled(ChatSelf)`
  margin-left: 10px;
`

const ChatBoxWrapper = styled.div`
  padding: 5px 1em;

  position: fixed;
  bottom: 50px;
  left: 0;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  background: white;
`

const InputBox = styled.input`
  flex: 1;
  border: 1px solid gray;
  border-radius: 25px;
  margin-left: 5px;
  padding: 0 0.5em;
  box-sizing: border-box;
  transition: all 0.6s;
`

const SendButton = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 0 5px;
  margin-left: auto;
`

const TalkChat = ({ history, location, ...props }) => {
  const { uid = 0, display = 'Test', lastMood = null } = location.state
  const [chatList, setChatList] = useState([])
  const [input, setInput] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [lastTalk, setLastTalk] = useState(Date.now())

  useEffect(() => {
    const onChat = async () => {
      let userID = (await firebase.auth().currentUser) || 0
      if (userID) {
        userID = userID.uid
      }

      const userData = await firebase
        .database()
        .ref('users/' + userID)
        .once('value')

      const data = userData && userData.val()
      const { imgUrl = '', lastTalk = {} } = data || {}

      setLastTalk(lastTalk.createdAt)
      setImgUrl(imgUrl)

      firebase
        .database()
        .ref('users/' + userID + '/friends/' + uid + '/chats/')
        .on('value', snapshot => {
          const data = snapshot && snapshot.val()

          setChatList((data && Object.values(data)) || [])
        })
    }

    onChat()
  }, [])

  const onBack = () => history.push(pathRoutes.Talk.path)

  const onSend = async () => {
    if (!input) {
      return null
    }

    let userID = (await firebase.auth().currentUser) || 0
    if (userID) {
      userID = userID.uid
    }

    const chatData = {
      uid: userID,
      text: input,
      createdAt: Date.now(),
      imgUrl,
    }

    try {
      setInput('')

      await firebase
        .database()
        .ref('users/' + userID + '/friends/' + uid + '/chats')
        .push(chatData)
      await firebase
        .database()
        .ref('users/' + uid + '/friends/' + userID + '/chats')
        .push(chatData)

      firebase
        .database()
        .ref('users/' + userID + '/lastTalk')
        .set(chatData)
      firebase
        .database()
        .ref('users/' + uid + '/lastTalk')
        .set(chatData)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  const chats = chatList.map((chat, index) => {
    return chat.uid !== uid ? (
      <ChatSelf key={index}>{chat.text}</ChatSelf>
    ) : (
      <ChatOppositeWrapper key={index}>
        <Avatar src={chat.imgUrl} />
        <ChatOpposite>{chat.text}</ChatOpposite>
      </ChatOppositeWrapper>
    )
  })

  const ThemeMood = () => (lastMood ? <Theme {...lastMood.color} /> : null)

  const Update = () =>
    getDateDiff(lastTalk) !== 'Now' && <LastUpdate>update: {getDateDiff(lastTalk)}</LastUpdate>

  return (
    <Layout>
      <Navbar icon={<Icon type="left" onClick={onBack} />}>{display}</Navbar>
      <ThemeMood />
      <ChatWrapper>
        {chats}
        <Update />
      </ChatWrapper>
      <ChatBoxWrapper>
        <Avatar src={imgUrl} />
        <InputBox onChange={e => setInput(e.target.value)} value={input} />
        <SendButton className="send-btn" onClick={onSend}>
          send
        </SendButton>
      </ChatBoxWrapper>
    </Layout>
  )
}

export default TalkChat
