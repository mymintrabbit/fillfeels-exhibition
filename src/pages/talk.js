import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { pathRoutes } from '../routes'
import firebase from 'firebase'
import { mapHueToColor, getGradient } from '../color-picker/utils'
import ICON_TALK_EMPTY from '../assets/icon_talk_empty.svg'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5em;
  padding-top: 60px;
  width: 100%;

  box-sizing: border-box;
`

const GridUserWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  grid-gap: 1em;
  margin-bottom: 1.5em;
`

const Avatar = styled.img`
  display: block;
  width: 65px;
  height: 65px;
  border-radius: 50%
  background-size: cover;
`

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const UserTitle = styled.div`
  font-weight: bold;
`

const LastTalk = styled.div`
  font-weight: normal !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 155px;
  text-align: left;
`

const Dot = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;
  margin-right: 0;
  border-radius: 50%;
  background: blue;

  background: yellow;

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

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Talk = ({ history, ...props }) => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const { uid = 0 } = (await firebase.auth().currentUser) || {}
      const ref = await firebase
        .database()
        .ref('users/')
        .once('value')

      const users = ref && ref.val()
      const buddies =
        users &&
        Object.values(users)
          .filter(user => user.uid !== uid)
          .map(user => {
            if (user.friends && Object.keys(user.friends).indexOf(uid) > -1) {
              let lastTalk = null
              if (user.lastTalk) {
                lastTalk =
                  (uid === user.lastTalk.uid && 'You: ' + user.lastTalk.text) || user.lastTalk.text
              }
              return { ...user, friend: true, lastTalk }
            }

            return user
          })
          .filter(user => !!user.friend)

      setFriends(buddies)
      console.log(buddies)
    }

    getUsers()
  }, [])

  const onChat = friend => {
    history.push(pathRoutes.TalkChat.path, {
      ...friend,
    })
  }

  const buddies = friends.map((friend, index) => {
    return (
      <GridUserWrapper key={index} onClick={() => onChat(friend)}>
        <Avatar src={friend.imgUrl || 'http://lorempixel.com/g/100/100/'} />
        <UserDetails>
          <UserTitle>{friend.display}</UserTitle>
          <LastTalk>{friend.lastTalk || 'Talk about this'}</LastTalk>
        </UserDetails>
        {friend.lastMood && <Dot {...friend.lastMood.color} />}
      </GridUserWrapper>
    )
  })

  if (friends.length === 0) {
    return (
      <Layout>
        <Navbar>Talks</Navbar>
        <EmptyWrapper>
          <img src={ICON_TALK_EMPTY} alt={'icon-talk-empty'} />
        </EmptyWrapper>
      </Layout>
    )
  }

  return (
    <Layout>
      <Navbar>Talks</Navbar>
      {buddies}
    </Layout>
  )
}

export default Talk
