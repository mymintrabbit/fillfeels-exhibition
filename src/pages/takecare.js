import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import ICON_TAKECARE_IMAGE from '../assets/icon_takecare_image.svg'
import ICON_TAKECARE_LINK from '../assets/icon_takecare_link.svg'
import { ImagePicker, Modal } from 'antd-mobile'
import firebase from 'firebase'
import { pathRoutes } from '../routes'
import ICON_TAKECARE_BTN from '../assets/takecare.svg'

const { alert, prompt } = Modal

const Layout = styled.div`
  flex: 1;
  padding: 60px 1.5em 1.5em;
  width: 100%;
  box-sizing: border-box;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-row-gap: 2em;
  padding-bottom: 70px;
`

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
`

const ImageIcon = styled.img`
  width: 50%;
`

const ImageStorage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  background-size: cover;
  object-fit: cover;
  position: relative;
`

const Picker = styled(ImagePicker)`
  display: none;
`

const Tapping = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.7;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`

const TakeCareButtonImage = styled.img`
  object-fit: cover;
`

const takecare = ({ location, history }) => {
  const [files, setFiles] = useState([])
  const [userMood, setUserMood] = useState(null)
  const [storageUrl, setStorageUrl] = useState([
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%203%404x-100.jpg?alt=media&token=71448faa-57dd-4846-912d-e54489f43be9',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%204%404x-100.jpg?alt=media&token=2c0b4912-a16b-4632-a0c2-efc6d366e2b1',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%205%404x-100.jpg?alt=media&token=d1ea38d4-433b-404f-9e75-701c83c7f399',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%206%404x-100.jpg?alt=media&token=39d76faf-591a-4c7a-b0f4-a61b2d9d87a2',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%207%404x-100.jpg?alt=media&token=4c0f7194-53db-482c-bf46-83d2018dffd5',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%208%404x-100.jpg?alt=media&token=54c3c74e-b819-40bf-95b1-c7ce55b0dd5b',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%209%404x-100.jpg?alt=media&token=c5d33401-ae66-41ec-af20-15bf8da288c0',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%2010%404x-100.jpg?alt=media&token=17424a09-4c77-476f-90f7-1a35ebbdeb8f',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%2011%404x-100.jpg?alt=media&token=1b758f85-41c2-45c7-9b62-b3da24c0d0b3',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%2012%404x-100.jpg?alt=media&token=148f7e80-fea9-4673-97cd-68686110c74c',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%2013%404x-100.jpg?alt=media&token=60a9fd8f-3b21-4397-8c12-8f34b9f3f039',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%20copy%2014%404x-100.jpg?alt=media&token=2f4a767e-051a-4780-919c-00b67f7ac761',
      isLink: false,
      isTapped: false,
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/moodtracker-cu.appspot.com/o/Artboard%202%404x-100.jpg?alt=media&token=e70f89c4-f9dc-4f73-8e55-60c9ea2af911',
      isLink: false,
      isTapped: false,
    },
  ])

  const onClickImage = () => {
    const input = document.getElementsByClassName('am-image-picker-upload-btn')
    input[0].querySelector('input').click()
  }

  const onClickLink = () => {
    prompt('Link', 'please paste the link below here', [
      { text: 'Cancel' },
      {
        text: 'Send',
        onPress: async link => {
          const { uid } = await firebase.auth().currentUser

          try {
            let userData = await firebase
              .database()
              .ref('/users/' + uid)
              .once('value')
            userData = userData && userData.val()

            let caresBy = userMood.caresBy || {}

            caresBy = {
              ...caresBy,
              [userData.uid]: {
                uid: userData.uid,
                createdAt: Date.now(),
                careUrl: link,
                display: userData.display,
                imgUrl: userData.imgUrl,
                isLink: true,
                color: userMood.color,
              },
            }

            await firebase
              .database()
              .ref('/users/' + userMood.userID + '/mood/' + userMood.key)
              .set({
                color: userMood.color,
                createdAt: userMood.createdAt,
                description: userMood.description,
                caresBy,
              })

            alert('Complete', 'You use 2 point to takecare', [{ text: 'Ok' }])
            history.push(pathRoutes.Home.path)
          } catch ({ message }) {
            alert('Error', message, [{ text: 'Ok' }])
          }
        },
      },
    ])
  }

  const onSendasCare = async index => {
    const { uid } = await firebase.auth().currentUser

    try {
      let userData = await firebase
        .database()
        .ref('/users/' + uid)
        .once('value')
      userData = userData && userData.val()

      let caresBy = userMood.caresBy || {}

      caresBy = {
        ...caresBy,
        [userData.uid]: {
          uid: userData.uid,
          createdAt: Date.now(),
          careUrl: storageUrl[index].url,
          display: userData.display,
          imgUrl: userData.imgUrl,
          isLink: storageUrl[index].isLink,
          color: userMood.color,
        },
      }

      await firebase
        .database()
        .ref('/users/' + userMood.userID + '/mood/' + userMood.key)
        .set({
          color: userMood.color,
          createdAt: userMood.createdAt,
          description: userMood.description,
          caresBy,
        })

      alert('Complete', 'You use 2 point to takecare', [{ text: 'Ok' }])
      history.push(pathRoutes.Home.path)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  const onChange = async (files, type, index) => {
    setFiles(files)

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

      let userData = await firebase
        .database()
        .ref('/users/' + uid)
        .once('value')
      userData = userData && userData.val()

      let caresBy = userMood.caresBy || {}

      caresBy = {
        ...caresBy,
        [userData.uid]: {
          uid: userData.uid,
          createdAt: Date.now(),
          careUrl: downloadUrl,
          display: userData.display,
          imgUrl: userData.imgUrl,
        },
      }

      await firebase
        .database()
        .ref('/users/' + userMood.userID + '/mood/' + userMood.key)
        .set({
          color: userMood.color,
          createdAt: userMood.createdAt,
          description: userMood.description,
          caresBy,
        })

      alert('Complete', 'You use 2 point to takecare', [{ text: 'Ok' }])
      history.push(pathRoutes.Home.path)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  const onClickStorage = index => {
    const newStorageUrl = [...storageUrl]
    newStorageUrl[index].isTapped = !newStorageUrl[index].isTapped

    setStorageUrl(newStorageUrl)
  }

  useEffect(() => {
    setUserMood(location.state)
  }, [])

  const storages = storageUrl.map((storage, index) => (
    <ImageWrapper key={index} onClick={() => onClickStorage(index)}>
      <ImageStorage src={storage.url} />{' '}
      {storage.isTapped ? (
        <Tapping>
          <TakeCareButtonImage src={ICON_TAKECARE_BTN} onClick={() => onSendasCare(index)} />
        </Tapping>
      ) : null}
    </ImageWrapper>
  ))

  return (
    <Layout>
      <Navbar> TakeCare </Navbar>
      <ContentWrapper>
        <ImageWrapper>
          <Picker
            files={[]}
            onChange={onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 7}
          />
          <ImageIcon src={ICON_TAKECARE_LINK} onClick={onClickImage} />
          <ImageIcon src={ICON_TAKECARE_IMAGE} onClick={onClickLink} />
        </ImageWrapper>
        {storages}
      </ContentWrapper>
    </Layout>
  )
}

export default takecare
