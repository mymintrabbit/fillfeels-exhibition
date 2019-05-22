import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { SearchBar, Icon, Modal } from 'antd-mobile'
import update from '../assets/update.svg'
import close from '../assets/close.svg'
import firebase from 'firebase'

const alert = Modal.alert

const Wrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  flex: 1;
  justify-content: flex-start;
`

const SearchWrapper = styled.div`
  .am-search {
    background-color: white;
    padding: 0% 5%;
  }
  .am-search-input {
    border: 1px solid lightgray;
    border-radius: 20px;
    height: 40px;
    align-items: center;
  }
  .am-search-input .am-search-synthetic-ph {
    height: 40px;
    line-height: 40px;
  }
  .am-search-input input[type='search'] {
    height: 40px;
  }
  .am-search-input .am-search-clear {
    width: 25px;
    height: 25px;
  }
`

const ListWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 5%;
  margin-top: 25px;
`

const ModalWrapper = styled.div``

const Avatar = styled.img`
  display: block;
  width: ${props => props.size || 50}px;
  height: ${props => props.size || 50}px;
  border-radius: 50%;
  background-size: cover;
  margin: 0 auto;
`

const MyIcon = styled.img`
  ${props => props.close && 'position: absolute'};
  top: 20px;
  right: 20px;
  width: ${props => props.size || 22}px;
  height: ${props => props.size || 22}px;
`

const BuddyBox = styled.div`
  border-radius: 20px;
  border: 1px solid lightgray;
  margin: 40px 5%;
  padding: 35px 25px;
  height: 250px;
  justify-content: center;
  align-items: center;
  position: relative;
`

const AddBuddyBox = styled.div`
  color: white;
  background: black;
  border-radius: 20px;
  border: 1px solid black;
  margin: 30px 5%;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
`

function closest(el, selector) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

class Buddy extends React.Component {
  state = {
    value: '',
    modal: false,
    isShowBuddyBox: false,
    buddies: [
      {
        id: 1,
        name: 'mymint',
        photo: 'http://lorempixel.com/100/100/',
        friend: true,
      },
      {
        id: 2,
        name: 'moon',
        photo: 'http://lorempixel.com/100/100/',
        friend: false,
      },
    ],
    selectedBuddy: {},
  }

  componentDidMount() {
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
              return { ...user, friend: true }
            }

            return user
          })

      this.setState({ buddies })
    }

    getUsers()
  }

  onChange = value => {
    this.setState({ value })
  }

  showModal = (key, buddy) => {
    //e.preventDefault() // Android
    this.setState({
      [key]: true,
      selectedBuddy: buddy,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return
    }
    const pNode = closest(e.target, '.am-modal-content')
    if (!pNode) {
      e.preventDefault()
    }
  }

  triggerBuddyBox = buddy => {
    console.log(buddy)
    this.setState({ isShowBuddyBox: !this.state.isShowBuddyBox, selectedBuddy: buddy })
  }

  onMakeBuddy = async user => {
    try {
      const { uid } = firebase.auth().currentUser
      await firebase
        .database()
        .ref('/users/' + uid + '/friends/' + user.uid)
        .set({ uid: user.uid })

      await firebase
        .database()
        .ref('/users/' + user.uid + '/friends/' + uid)
        .set({ uid: uid })

      const buddies = this.state.buddies.map(buddy =>
        buddy.uid === this.state.selectedBuddy.uid ? { ...buddy, friend: true } : buddy,
      )
      this.setState({ buddies, selectedBuddy: { ...this.state.selectedBuddy, friend: true } })

      alert('Success', 'Make buddy complete', [{ text: 'Ok' }])
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar>Buddies</Navbar>
        <Wrapper>
          <SearchWrapper>
            <SearchBar
              value={this.state.value}
              placeholder="Search"
              cancelText="cancel"
              // onSubmit={value => console.log(value, 'onSubmit')}
              // onClear={value => console.log(value, 'onClear')}
              // onFocus={() => console.log('onFocus')}
              // onBlur={() => console.log('onBlur')}
              // onCancel={() => console.log('onCancel')}
              onChange={this.onChange}
            />
          </SearchWrapper>

          {!this.state.isShowBuddyBox ? (
            this.state.buddies
              .filter(buddy => buddy.display && buddy.display.indexOf(this.state.value) > -1)
              .map((buddy, index) => (
                <ListWrapper key={index} onClick={() => this.triggerBuddyBox(buddy)}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar src={`${buddy.imgUrl}`} />
                    <div style={{ marginLeft: 15 }}>{buddy.display}</div>
                  </div>
                  {buddy.friend ? (
                    <Icon
                      type="ellipsis"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        this.showModal('modal', buddy)
                      }}
                    />
                  ) : null}
                </ListWrapper>
              ))
          ) : (
            <BuddyBox>
              <Avatar src={`${this.state.selectedBuddy.imgUrl}`} size={100} />
              <div style={{ marginTop: 15 }}>{this.state.selectedBuddy.display}</div>
              {!this.state.selectedBuddy.friend ? (
                <AddBuddyBox>
                  <MyIcon src={update} />
                  <div
                    style={{ marginLeft: 15 }}
                    onClick={() => this.onMakeBuddy(this.state.selectedBuddy)}
                  >
                    Make a buddy
                  </div>
                </AddBuddyBox>
              ) : (
                <div style={{ margin: 37, color: 'blue' }}>Already friend</div>
              )}

              <MyIcon
                close
                src={close}
                size={18}
                onClick={() => this.triggerBuddyBox(this.state.selectedBuddy)}
              />
            </BuddyBox>
          )}

          <ModalWrapper>
            <Modal
              visible={this.state.modal}
              transparent
              maskClosable={false}
              onClose={this.onClose('modal')}
              footer={[
                {
                  text: 'Cancel',
                  onPress: () => {
                    console.log('cancel')
                    this.onClose('modal')()
                  },
                },
                {
                  text: 'Ok',
                  onPress: async () => {
                    console.log('ok')
                    const buddies = this.state.buddies.map(buddy =>
                      buddy.uid === this.state.selectedBuddy.uid
                        ? { ...buddy, friend: false }
                        : buddy,
                    )

                    try {
                      const { uid } = firebase.auth().currentUser
                      await firebase
                        .database()
                        .ref('/users/' + uid + '/friends/' + this.state.selectedBuddy.uid)
                        .set(null)

                      await firebase
                        .database()
                        .ref('/users/' + this.state.selectedBuddy.uid + '/friends/' + uid)
                        .set(null)

                      this.setState({ buddies })
                      this.onClose('modal')()
                    } catch ({ message }) {
                      alert('Error', message, [{ text: 'Ok' }])
                    }
                  },
                },
              ]}
              wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
              <div style={{ minheight: 100, padding: 10 }}>
                <Avatar
                  src={this.state.selectedBuddy.imgUrl || 'http://lorempixel.com/100/100/'}
                  size={100}
                />
                <div style={{ marginTop: 15 }}>Remove from buddies?</div>
              </div>
            </Modal>
          </ModalWrapper>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default Buddy
