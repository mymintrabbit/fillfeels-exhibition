import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import styled from 'styled-components'
import Expand from '../assets/expand.svg'
import Navbar from '../components/Navbar'
import ICON_TALK from '../assets/icon_talk.svg'
import ICON_TAKECARE from '../assets/icon_profile_takecare.svg'
import ICON_TALK_ACTIVE from '../assets/icon_talk_active.svg'
import ICON_TAKECARE_ACTIVE from '../assets/icon_profile_takecare_active.svg'
// import { pathRoutes } from '../routes'
import { Modal } from 'antd-mobile'
import { mapHueToColor, getGradient } from '../color-picker/utils'
import { getDateDiff } from '../utils'
import { pathRoutes } from '../routes'

const alert = Modal.alert

const Layout = styled.div`
  flex: 1;
  padding: 60px 1.5em 1.5em;
  width: 100%;
  box-sizing: border-box;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-row-gap: 1em;
`

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em 0;
  padding-bottom: 4em;

  &:not(last-child) {
    border-bottom: 1px solid #efefef;
  }
`

const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`

const Avatar = styled.img`
  display: block;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 0.5em;
`

const ContentImage = styled.div`
  display: block;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  margin: 1em auto;

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

const ContentDescription = styled.div`
  text-align: left;
  word-break: break-word;
`

const Time = styled.div`
  position: absolute;
  top: 4px;
  right: 0;
  // font-size: 12px !important;
  font-weight: normal !important;
`

const ActionButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0px 1fr;
  margin-top: 1em;
  padding: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  max-height: 50px;
`

const ActionButton = styled.div`
  max-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
`

const VerticalLine = styled.div`
  flex: 1;
  height: 100%;
  width: 0;
  border-right: 1px solid gray;
`

const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  object-fit: cover;
`

const GiveCall = styled.img`
  width: 100%;
`

const GiveCallText = styled.a`
  position: relative;
  top: -1.75em;
  color: white !important;
`

const Home = ({ history }) => {
  const [moodList, setMoodList] = useState([])
  const [uid, SetUid] = useState(null)
  const [userPoint, setUserPoint] = useState(0)

  const onTakeCare = async (mood, index, isCare) => {
    if (!uid) {
      return alert('Error', 'Session is expired please login again', [{ text: 'Ok' }])
      // if no user data then we return
    }

    if (isCare) {
      return alert('Error', 'You already care this mood!', [{ text: 'Ok' }])
    }

    if (userPoint - 2 < 0) {
      return alert('Error', 'Takecare required 2 point. Please update your mood to get the point', [
        { text: 'Ok' },
      ])
    }

    await firebase
      .database()
      .ref('/users/' + uid + '/point/')
      .set(userPoint - 2)

    history.push(pathRoutes.Takecare.path, {
      ...mood,
    })

    // await firebase
    //   .database()
    //   .ref('/users/' + uid + '/mood/' + mood.key)
    //   .set({
    //     ...mood,
    //     isCare: !mood.isCare,
    //   })
    //
    // const newMoodList = {
    //   ...moodList,
    //   [index]: {
    //     ...mood,
    //     isCare: !mood.isCare,
    //   },
    // }
    //
    // setMoodList(Object.values(newMoodList))
  }

  const onTalkAbout = async (mood, index, isTalk) => {
    if (!uid) {
      return alert('Error', 'Session is expired please login again', [{ text: 'Ok' }])
      // if no user data then we return
    }

    if (isTalk) {
      return alert('Error', 'You already talk about this mood!', [{ text: 'Ok' }])
    }

    if (userPoint - 2 < 0) {
      return alert(
        'Error',
        'Talk about required 2 point. Please update your mood to get the point',
        [{ text: 'Ok' }],
      )
    }

    await firebase
      .database()
      .ref('/users/' + mood.userID + '/mood/' + mood.key)
      .set({
        ...mood,
        isTalk: !mood.isTalk,
      })

    await firebase
      .database()
      .ref('/users/' + mood.userID + '/lastMood/')
      .set({
        ...mood,
      })

    await firebase
      .database()
      .ref('/users/' + uid + '/point/')
      .set(userPoint - 2)

    const newMoodList = {
      ...moodList,
      [index]: {
        ...mood,
        isTalk: !mood.isTalk,
      },
    }

    setMoodList(Object.values(newMoodList))
    return alert('Complete', 'You use 2 point to talk about this.', [{ text: 'Ok' }])
  }

  useEffect(() => {
    const getMood = async () => {
      try {
        const { uid } = firebase.auth().currentUser

        const ref = await firebase
          .database()
          .ref('users/')
          .once('value')

        const users = ref && ref.val()
        const userPoint = users[uid].point || 0
        setUserPoint(userPoint)

        const moodList = Object.values(users).reduce((result, user) => {
          let userMood = []
          if (user.mood) {
            userMood = Object.entries(user.mood).map(([key, mood]) => {
              return {
                key,
                display: user.display,
                email: user.email,
                imgUrl: user.imgUrl,
                tel: user.tel,
                userID: user.uid,
                isCare: (mood.caresBy && mood.caresBy[uid]) || false,
                withAction: user.uid !== uid,
                ...mood,
              }
            })
          }

          result = [...result, ...userMood]
          return result
        }, [])
console.log(moodList)
        moodList.sort((a, b) => b.createdAt - a.createdAt)
        setMoodList(moodList)
      } catch ({ message }) {
        alert('Error', message, [{ text: 'Ok' }])
      }
    }

    const getUserData = async () => {
      const { uid = null } = (await firebase.auth().currentUser) || {}
      SetUid(uid)
    }

    getMood()
    getUserData()
  }, [])

  const moods = moodList.map((mood, index) => (
    <ContentItem key={index}>
      <ContentTitle>
        <Avatar src={mood.imgUrl} />
        {mood.display}
        <Time>{getDateDiff(mood.createdAt)}</Time>
      </ContentTitle>
      <ContentImage {...mood.color} />
      <ContentDescription>{mood.description}</ContentDescription>
      {mood.withAction ? (
        <React.Fragment>
          <ActionButtonWrapper>
            <ActionButton onClick={() => onTakeCare(mood, index, mood.isCare)}>
              <ActionIcon src={!mood.isCare ? ICON_TAKECARE : ICON_TAKECARE_ACTIVE} />
              Take care
            </ActionButton>
            <VerticalLine />
            <ActionButton onClick={() => onTalkAbout(mood, index, mood.isTalk)}>
              <ActionIcon src={!mood.isTalk ? ICON_TALK : ICON_TALK_ACTIVE} />
              Talk about
            </ActionButton>
          </ActionButtonWrapper>
          <GiveCall src={Expand} />
          <GiveCallText href={`tel:${mood.tel}`}>Give a call</GiveCallText>
        </React.Fragment>
      ) : null}
    </ContentItem>
  ))

  return (
    <Layout>
      <Navbar> Home </Navbar>
      <ContentWrapper>{moods}</ContentWrapper>
    </Layout>
  )
}

export default Home
