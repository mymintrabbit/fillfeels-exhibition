import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { pathRoutes } from '../routes'
import { COLOR_MAPPING, NO_AVATAR_IMG_URL } from '../config'
import firebase from 'firebase'
import { Modal } from 'antd-mobile'
import ICON_EDIT from '../assets/icon_profile_edit.svg'
import ICON_CARE from '../assets/icon_profile_care.svg'
import ICON_MONTH from '../assets/icon_profile_month.svg'
import ICON_MONTH_ACTIVE from '../assets/icon_profile_month_active.svg'
import ICON_STATS from '../assets/icon_profile_stats.svg'
import ICON_STATS_ACTIVE from '../assets/icon_profile_stats_active.svg'
import ICON_TAKECARE from '../assets/icon_profile_takecare.svg'
import ICON_TAKECARE_ACTIVE from '../assets/icon_profile_takecare_active.svg'
import ICON_TABLINE from '../assets/icon_profile_tabline.svg'
import ICON_PROFILE_BORDER from '../assets/icon_profile_avatar_border.svg'
import ICON_PROFILE_BORDER_SMALL from '../assets/icon_profile_avatar_border_small.svg'
import ICON_UPDATE from '../assets/icon_update.svg'
import ICON_UPDATE_WHITE from '../assets/icon_update_white.svg'
import ICON_PROFILE_EMPTY from '../assets/icon_profile_empty.svg'
import Dot from '../components/Dot'
import moment from 'moment'
import { mapHueToRangeColor } from '../color-picker/utils'
import { getDateDiff } from '../utils'

export const styles = {
  dotStyle: {
    medium: {
      width: '35px',
      height: '35px',
    },
    small: {
      width: '30px',
      height: '30px',
    },
  },
}

const alert = Modal.alert

const Wrapper = styled.div``

const Layout = styled.div`
  flex: 1;
  padding: 60px 1.5em 1.5em;
  width: 100%;
  box-sizing: border-box;
`

const Avatar = styled.img`
  display: block;
  width: ${props => props.width || '85'}px;
  height: ${props => props.width || '85'}px;

  margin: 0 auto;
  border-radius: 50%;
`

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;

  padding: 5px 15px 5px 5px;
  background-image: url(${ICON_PROFILE_BORDER});
`

const AvatarWrapperSmall = styled(AvatarWrapper)`
  position: unset;
  padding: 2px 5px 3px 3px;
  background-image: url(${ICON_PROFILE_BORDER_SMALL});
`

const AvatarDetailsLine = styled.div`
  content: '';
  border: 1px solid black;
  height: 0;
  width: 100%;
  top: 16px;
  display: flex;
  position: relative;
`

const MenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;

  margin-left: 10px;
`

const AlignTop = styled.div`
  margin-bottom: auto;
`

const AlignBottom = styled.div`
  margin-top: auto;
`

const HorizontalLine = styled.div`
  width: 100%;
  height: 0;
  border: 1px solid #efefef;
`

const TabWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-row-gap: 5px;
`

const TabLine = styled.img`
  width: 100%;
  grid-column: span 3;
`

const TabIcon = styled.img`
  width: 25px;
  height: 25px;
`

const TabContent = styled.div`
  padding: 1em 0;
`

const StatMonth = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  padding: 10px;
  border: 1px solid darkgray;
  justify-items: start;
  align-items: center;

  ${props => props.override};
`

const MonthCare = styled.div`
  padding: 0 15px;
  height: 100%;
  border-left: 1px solid gray;
  border-right: 1px solid gray;

  display: flex;
  justify-content: center;
  align-items: center;
`

const DotWrapper = styled.div`
  padding-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const DayWrapper = styled.div`
  margin-top: 1em;
  color: gray;
  text-align: left;
  font-size: 14px;
`

const TimelineWrapper = styled.div`
  margin-top: 10px;
`

const TimelineItem = styled.div`
  padding: 0 0 0 4em;
  position: relative;
  color: black;
  border-left: 2px solid #363636;

  &:before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "${props => props.day}";
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    background: white;
    border: 2px solid #363636;
    left: -18px;
    margin-top: 0;
  }

  &:not(:last-child) {
    padding-bottom: 1.5em;
  }

  &:last-child {
    border-image: linear-gradient(to bottom, #363636 40%, white 100%) 1 100%;
  }
`

const TimelineItemHeader = styled.div`
  min-height: 36px;
  line-height: 2.5;

  &:before {
    content: '';
    width: 38px;
    border-bottom: 1px solid black;
    height: 1px;
    position: absolute;
    top: 16px;
    left: 18px;
  }
`

const TimelineEmpty = styled.div`
  height: 100%;
  width: 75%;
  font-size: 12px;
  background: black;
  text-align: center;
  word-wrap: break-word;
  border-radius: 25px;
  color: white;
  font-weight: normal;
  line-height: 1.5;
`

const DotInline = styled(Dot)`
  display: inline-block;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const MonthBoxWrapper = styled.div`
  margin-bottom: 1.5em;
`

const MonthStatGridLayout = styled.div`
  padding: 0.5em 1em 1em;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border: 1px solid black;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

const DotDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const EmptyTakeCareWrapper = styled.div`
  margin: 4em;
`

const CareLinkWrapper = styled.div`
  margin: 2em 0;
`

const CareItemWrapper = styled.img`
  width: 100%;
  max-height: 200px;
  margin-bottom: 1em;
  object-fit: cover;
`

const ProfileDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 36px auto 30px;
`

const AvatarDetailsWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const AvatarDetailsUser = styled.div`
  margin-left: 5px;
  font-size: 12px;
`

const AvatarDetailsTime = styled.div`
  font-size: 12px;
  margin-right: 5px;
  color: gray;
`

const Profile = ({ history, ...props }) => {
  const [imgUrl, setImgUrl] = useState(NO_AVATAR_IMG_URL)
  const [displayName, setDisplayName] = useState('Profile')
  const [activeTab, setActiveTab] = useState(1)
  const [userMoodList, setUserMoodList] = useState([[{ date: moment().date(), isEmpty: true }]])
  const [userLastMood, setUserLastMood] = useState({})
  const [userPoint, setUserPoint] = useState(0)
  const [userMoodLength, setUserMoodLength] = useState(0)
  const [currentMonth] = useState(moment().format('MMMM'))
  const [userMoodListYear, setUserMoodListYear] = useState([])
  const [userTakecare, setUserTakecare] = useState([])

  const getCurrentUserData = async () => {
    try {
      const { uid } = firebase.auth().currentUser
      const data = await firebase
        .database()
        .ref('/users/' + uid)
        .once('value')
      const userData = data.val()
      setImgUrl(userData.imgUrl)
      setDisplayName(userData.display)
      setUserPoint(userData.point || 0)

      const { mood = {}, lastMood = {} } = userData

      const moodListMonth = Object.values(mood).filter(mood => {
        return moment(mood.createdAt).month() === moment().month()
      })

      let moodListCurrentMonth = moodListMonth

        .map(mood => ({ ...mood, date: moment(mood.createdAt).date() }))
        .reduce((result, mood) => {
          result[mood['date']] = [...(result[mood['date']] || []), mood]
          return result
        }, [])
        .filter(ref => ref)
        .reverse()

      const [[{ date = null } = {}] = []] = moodListCurrentMonth

      if (date !== moment().date() || !date) {
        moodListCurrentMonth = [[{ date: moment().date(), isEmpty: true }], ...moodListCurrentMonth]
      }

      const moodListYear = Object.values(mood)
        .map(mood => ({ ...mood, month: moment(mood.createdAt).month() }))
        .reduce((result, mood) => {
          result[mood['month']] = [...(result[mood['month']] || []), mood]
          return result
        }, [])
        .filter(ref => ref)
        .reverse()
        .map(moodMonth => ({
          month: moodMonth[0].month,
          length: moodMonth.length,
          maxMood: moodMonth.reduce(
            (result, mood) => {
              result[mapHueToRangeColor(mood.color.hue)] += 1
              if (result.max < result[mapHueToRangeColor(mood.color.hue)]) {
                result.max = result[mapHueToRangeColor(mood.color.hue)]
                result.color = mapHueToRangeColor(mood.color.hue)
              }

              return result
            },
            {
              [COLOR_MAPPING.RED]: 0,
              [COLOR_MAPPING.YELLOW]: 0,
              [COLOR_MAPPING.PINK]: 0,
              [COLOR_MAPPING.BLUE_DARK]: 0,
              [COLOR_MAPPING.BLUE]: 0,
              [COLOR_MAPPING.GREEN]: 0,
              max: 0,
              color: COLOR_MAPPING.RED,
            },
          ),
          ...moodMonth.reduce((result, mood) => {
            result[mapHueToRangeColor(mood.color.hue)] = [
              ...(result[mapHueToRangeColor(mood.color.hue)] || []),
              mood,
            ]

            return result
          }, {}),
        }))

      const userTakecare = Object.values(mood).reduce((result, mood) => {
        const moodCaresBy = mood.caresBy || {}
        result = [...result, ...Object.values(moodCaresBy)]
        return result
      }, [])

      userTakecare.sort((a, b) => b.createdAt - a.createdAt)

      setUserMoodListYear(moodListYear)
      setUserMoodLength(moodListMonth.length)
      setUserLastMood(lastMood)
      setUserMoodList(moodListCurrentMonth)
      setUserTakecare(userTakecare)
    } catch ({ message }) {
      alert('Error', message, [{ text: 'Ok' }])
    }
  }

  useEffect(() => {
    getCurrentUserData()
  }, [])

  const onEdit = () => {
    history.push(pathRoutes.ProfileEdit.path)
  }

  const TimelineItems = userMoodList.map((mood, index) => (
    <TimelineItem day={mood[0].date} key={index}>
      <TimelineItemHeader>
        {mood[0].isEmpty ? (
          <TimelineEmpty>
            no updating <br />
            Let's Update your mood.
          </TimelineEmpty>
        ) : (
          mood.map((moodItem, index) => (
            <DotInline key={index} {...styles.dotStyle.small} {...moodItem.color} />
          ))
        )}
      </TimelineItemHeader>
    </TimelineItem>
  ))

  const TimelineYearItems = (userMoodListYear.length > 0 &&
    userMoodListYear.map((moodMonth, index) => (
      <MonthBoxWrapper key={index}>
        <StatMonth override={`background: black;color: white;`}>
          <Wrapper>
            {moment()
              .month(moodMonth.month)
              .format('MMMM')}
          </Wrapper>
          <Wrapper>
            <MonthCare>
              <img src={ICON_UPDATE_WHITE} alt={'update-icon'} /> &nbsp;= {moodMonth.length}
            </MonthCare>
          </Wrapper>
          <DotWrapper>
            <Dot {...styles.dotStyle.medium} background={moodMonth.maxMood.color} />
          </DotWrapper>
        </StatMonth>
        <Wrapper>
          <MonthStatGridLayout>
            {Object.values(COLOR_MAPPING).map((colorKey, index) => (
              <DotDetails key={index}>
                <Wrapper>{(moodMonth[colorKey] && moodMonth[colorKey].length) || 0}</Wrapper>
                <Dot {...styles.dotStyle.medium} background={colorKey} />
              </DotDetails>
            ))}
          </MonthStatGridLayout>
        </Wrapper>
      </MonthBoxWrapper>
    ))) || (
    <MonthBoxWrapper>
      <StatMonth override={`background: black;color: white;`}>
        <Wrapper>{moment().format('MMMM')}</Wrapper>
        <Wrapper>
          <MonthCare>
            <img src={ICON_UPDATE_WHITE} alt={'update-icon'} /> &nbsp;= 0
          </MonthCare>
        </Wrapper>
        <DotWrapper>
          <Dot {...styles.dotStyle.medium} />
        </DotWrapper>
      </StatMonth>
      <Wrapper>
        <MonthStatGridLayout>
          {Object.values(COLOR_MAPPING).map((colorKey, index) => (
            <DotDetails key={index}>
              <Wrapper>0</Wrapper>
              <Dot {...styles.dotStyle.medium} background={colorKey} />
            </DotDetails>
          ))}
        </MonthStatGridLayout>
      </Wrapper>
    </MonthBoxWrapper>
  )

  const takecareItems = (userTakecare.length > 0 &&
    userTakecare.map((care, index) => (
      <CareLinkWrapper key={index}>
        {care.isLink ? (
          <iframe
            title="youtube-iframe"
            width="320"
            height="300"
            src={care.careUrl.replace('watch?v=', 'embed/')}
          />
        ) : (
          <CareItemWrapper src={care.careUrl} />
        )}
        <ProfileDetailsWrapper>
          <AvatarWrapperSmall>
            <Avatar src={care.imgUrl} width="30" height="30" />
          </AvatarWrapperSmall>
          <Wrapper>
            <AvatarDetailsLine />
            <AvatarDetailsWrapper>
              <AvatarDetailsUser>{care.display}</AvatarDetailsUser>
              <AvatarDetailsTime>{getDateDiff(care.createdAt)}</AvatarDetailsTime>
            </AvatarDetailsWrapper>
          </Wrapper>
          <Dot width="30px" height={'30px'} {...care.color} />
        </ProfileDetailsWrapper>
      </CareLinkWrapper>
    ))) || (
    <EmptyTakeCareWrapper>
      <img src={ICON_PROFILE_EMPTY} alt={'empty'} />
    </EmptyTakeCareWrapper>
  )

  return (
    <Layout>
      <Navbar>{displayName}</Navbar>
      <Wrapper>
        <AvatarWrapper>
          <Avatar src={imgUrl} />
          <MenuWrapper>
            <AlignTop onClick={onEdit}>
              <img alt="edit-icon" src={ICON_EDIT} />
            </AlignTop>
            <HorizontalLine />
            <AlignBottom>
              <img alt="icon_care" src={ICON_CARE} />
            </AlignBottom>
            <Wrapper>{userPoint}</Wrapper>
          </MenuWrapper>
        </AvatarWrapper>
      </Wrapper>
      <TabWrapper>
        <TabIcon
          alt="tab-icon"
          src={activeTab === 1 ? ICON_MONTH_ACTIVE : ICON_MONTH}
          onClick={() => setActiveTab(1)}
        />
        <TabIcon
          alt="tab-icon"
          src={activeTab === 2 ? ICON_STATS_ACTIVE : ICON_STATS}
          onClick={() => setActiveTab(2)}
        />
        <TabIcon
          alt="tab-icon"
          src={activeTab === 3 ? ICON_TAKECARE_ACTIVE : ICON_TAKECARE}
          onClick={() => setActiveTab(3)}
        />
        <TabLine alt="tab_line" src={ICON_TABLINE} />
      </TabWrapper>
      <TabContent>
        {activeTab === 1 && (
          <Wrapper>
            <StatMonth>
              <Wrapper>{currentMonth}</Wrapper>
              <Wrapper>
                <MonthCare>
                  <img src={ICON_UPDATE} alt={'update-icon'} /> &nbsp;= {userMoodLength}
                </MonthCare>
              </Wrapper>
              <DotWrapper>
                <Dot {...styles.dotStyle.medium} {...userLastMood.color} />
              </DotWrapper>
            </StatMonth>
            <DayWrapper>
              Day
              <TimelineWrapper>{TimelineItems}</TimelineWrapper>
            </DayWrapper>
          </Wrapper>
        )}
        {activeTab === 2 && <Wrapper>{TimelineYearItems}</Wrapper>}
        {activeTab === 3 && <Wrapper>{takecareItems}</Wrapper>}
      </TabContent>
    </Layout>
  )
}

export default Profile
