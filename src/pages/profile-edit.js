import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { Icon, InputItem, ImagePicker, Modal } from 'antd-mobile'
import { pathRoutes } from '../routes'
import firebase from 'firebase'
import { NO_AVATAR_IMG_URL } from '../config'

const alert = Modal.alert

const Layout = styled.div`
  flex: 1;
  padding: 1.5em;
  padding-top: 60px;
  width: 100%;
  box-sizing: border-box;
`

const Avatar = styled.img`
  display: block;
  width: 85px;
  height: 85px;

  margin: 0 auto;
  border-radius: 50%;
`

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #68bbdd;
  font-weight: bold;
  margin-top: 10px;
`

const GridField = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 10px;
  align-items: center;
  justify-items: start;
`

const Picker = styled(ImagePicker)`
  display: none;
`

const ProfileEdit = ({ history, ...props }) => {
  const [files, setFiles] = useState([])

  const [imgUrl, setImgUrl] = useState(NO_AVATAR_IMG_URL)
  const [displayName, setDisplayName] = useState('...')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')

  const getCurrentUserData = async () => {
    try {
      const { uid } = firebase.auth().currentUser
      const data = await firebase
        .database()
        .ref('/users/' + uid)
        .once('value')
      const { imgUrl, display, email, tel } = data.val()

      setImgUrl(imgUrl)
      setDisplayName(display)
      setEmail(email)
      setTel(tel)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  useEffect(() => {
    getCurrentUserData()
  }, [])

  const onChangePhoto = () => {
    const input = document.getElementsByClassName('am-image-picker-upload-btn')
    input[0].querySelector('input').click()
  }

  const onChange = (files, type, index) => {
    setFiles(files)
  }

  const onLeftClick = () => {
    history.push(pathRoutes.Profile.path)
  }

  const onDone = async () => {
    try {
      const { uid } = await firebase.auth().currentUser
      const ref = (Math.random() * 100000).toFixed(0).toString() + '.jpg'
      let downloadUrl = null

      const fileRef = await firebase
        .storage()
        .ref()
        .child(ref)

      const fileUrl = (files.length > 0 && files[0].url) || null
      if (fileUrl) {
        await fileRef.putString(fileUrl, 'data_url')
        downloadUrl = await fileRef.getDownloadURL()
      }

      const userData = await firebase
        .database()
        .ref('users/' + uid)
        .once('value')

      const users = {
        ...userData.val(),
        uid,
        display: displayName,
        tel,
        imgUrl: downloadUrl || imgUrl,
        email,
      }

      await firebase
        .database()
        .ref('users/' + uid)
        .set(users)

      history.push(pathRoutes.Profile.path)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  return (
    <Layout>
      <Navbar
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick}
        rightContent={<div onClick={onDone}>Done</div>}
      >
        Edit Profile
      </Navbar>
      <AvatarWrapper>
        <Avatar src={(files.length > 0 && files[0].url) || imgUrl} />
      </AvatarWrapper>
      <Label onClick={onChangePhoto}>Change Photo</Label>
      <Picker
        files={[]}
        onChange={onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 7}
      />
      <GridField>
        <div>Email</div>
        <InputItem disabled value={email} onChange={setEmail} />
        <div>Username</div>
        <InputItem value={displayName} onChange={setDisplayName} />
        <div>Phone</div>
        <InputItem value={tel} onChange={setTel} />
      </GridField>
    </Layout>
  )
}

export default ProfileEdit
