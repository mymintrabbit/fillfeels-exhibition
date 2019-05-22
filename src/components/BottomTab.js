import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import styled from 'styled-components'
import { pathRoutes } from '../routes'
import ICON_BUDDY from '../assets/icon_buddy.svg'
import ICON_BUDDY_ACTIVE from '../assets/icon_buddy_active.svg'
import ICON_HOME from '../assets/icon_home.svg'
import ICON_HOME_ACTIVE from '../assets/icon_home_active.svg'
import ICON_PROFILE from '../assets/icon_profile.svg'
import ICON_PROFILE_ACTIVE from '../assets/icon_profile_active.svg'
import ICON_TALK from '../assets/icon_talk.svg'
import ICON_TALK_ACTIVE from '../assets/icon_talk_active.svg'
import ICON_UPDATE from '../assets/icon_update.svg'
import ICON_UPDATE_ACTIVE from '../assets/icon_update_active.svg'

const BottomWrapper = styled.div`
  #tab-bar {
    display: flex;
    flex-direction: column;
  }
  
  #tab-bar {
    height: 40px;
  }
  
  .am-tab-bar-bar {
    background-color: #fafafa !important;
  }
  
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
`

class BottomTab extends Component {
  state = {
    selectedTab: '/home',
  }

  onChangeTab = tab => {
    this.setState({ selectedTab: tab })
    this.props.history.push(tab)
  }

  render() {
    const routeTabs = { ...pathRoutes }

    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/') {
      return null
    }

    return (
      <BottomWrapper>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_HOME})`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_HOME_ACTIVE}) #FFFFFF`,
                }}
              />
            }
            selected={this.state.selectedTab === routeTabs.Home.path}
            onPress={() => {
              this.onChangeTab(routeTabs.Home.path)
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_BUDDY})`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_BUDDY_ACTIVE}) #FFFFFF`,
                }}
              />
            }
            selected={this.state.selectedTab === routeTabs.Buddy.path}
            onPress={() => {
              this.onChangeTab(routeTabs.Buddy.path)
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_UPDATE})`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_UPDATE_ACTIVE}) #FFFFFF`,
                }}
              />
            }
            selected={this.state.selectedTab === routeTabs.UpdateStepOne.path}
            onPress={() => {
              this.onChangeTab(routeTabs.UpdateStepOne.path)
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_TALK})`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_TALK_ACTIVE}) #FFFFFF`,
                }}
              />
            }
            selected={this.state.selectedTab === routeTabs.Talk.path}
            onPress={() => {
              this.onChangeTab(routeTabs.Talk.path)
            }}
          />
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_PROFILE})`,
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${ICON_PROFILE_ACTIVE}) #FFFFFF`,
                }}
              />
            }
            selected={this.state.selectedTab === routeTabs.Profile.path}
            onPress={() => {
              this.onChangeTab(routeTabs.Profile.path)
            }}
          />
        </TabBar>
      </BottomWrapper>
    )
  }
}

export default withRouter(BottomTab)
