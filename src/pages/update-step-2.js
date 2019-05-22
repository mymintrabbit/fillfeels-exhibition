import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { getGradient, mapHueToColor } from '../color-picker/utils'
import { TextareaItem, Icon, Modal } from 'antd-mobile'
import { pathRoutes } from '../routes'
import firebase from 'firebase'
import { NO_AVATAR_IMG_URL } from '../config'

const alert = Modal.alert

const ColorCircle = styled.div`
  display: block;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  margin: 0 auto;

  ${props =>
    true
      ? `
    background: ${mapHueToColor(props.hue)};
    background-image: ${getGradient(props.hue, props.hue2)}
  `
      : `
    background: ${mapHueToColor(props.hue)};
  `}
`

const CaptionWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;

  textarea {
    min-width: 220px;
  }
`

const Avatar = styled.img`
  display: block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-size: cover;
`

const Layout = styled.div`
  flex: 1;
  padding: 1.5em;
  padding-top: 100px;
  width: 100%;
  box-sizing: border-box;
`

const UpdateStep2 = props => {
  const { isGradient = true, hue = 0, hue2 = 0 } = props.location.state
  const [imgUrl, setImgUrl] = useState(NO_AVATAR_IMG_URL)
  const [userID, setUserID] = useState(null)
  const [description, setDescription] = useState('')
  const [userPoint, setUserPoint] = useState(0)
  console.log(hue, hue2)
  const getCurrentUserImg = async () => {
    try {
      const { uid } = firebase.auth().currentUser
      const data = await firebase
        .database()
        .ref('/users/' + uid)
        .once('value')
      const url = data.val() && data.val().imgUrl
      const point = data.val() && data.val().point
      setUserID(uid)
      setImgUrl(url)
      setUserPoint(point || 0)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  // useEffect(() => {
  //   getCurrentUserImg()
  // }, [])

  const onShare = async () => {
    try {
      const mood = {
        color: {
          isGradient,
          hue,
          hue2,
        },
        description,
        createdAt: Date.now(),
      }

      await firebase
        .database()
        .ref('/users/' + userID + '/mood')
        .push(mood)

      await firebase
        .database()
        .ref('/users/' + userID + '/lastMood')
        .set(mood)

      const newPoint = userPoint + 3

      await firebase
        .database()
        .ref('/users/' + userID + '/point')
        .set(newPoint)

      alert('Complete', 'You got 3 point from update mood', [{ text: 'Ok' }])
      props.history.push(pathRoutes.Home.path)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  const onLeftClick = () => {
    props.history.push(pathRoutes.UpdateStepOne.path, {
      isGradient,
      hue,
      hue2,
    })
  }
  console.log({hue, hue2})
  return (
    <Layout>
      
      <Navbar
        icon={<Icon type="left" />}
        onLeftClick={() => onLeftClick()}
        rightContent={<div onClick={() => onShare()}>Share</div>}
      >
        Caption your color
      </Navbar>
      <CaptionWrapper>
        <Avatar src={'./mm.jpg'} />
        
        <TextareaItem
          rows={3}
          placeholder="caption"
          value={description}
          onChange={setDescription}
        />
      </CaptionWrapper>
      <ColorCircle isGradient={isGradient} hue={hue} hue2={hue2} />
      {/* <ColorRenderer hue1={hue} hue2={hue2}/> */}
      <div style={{ marginTop: '50px' }}>
        {description}
      </div>
    </Layout>
  )
}

export default UpdateStep2
