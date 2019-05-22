import { Route } from 'react-router-dom'
import React from 'react'
import UpdateStepOnePage from './pages/update-step-1'
import UpdateStepTwoPage from './pages/update-step-2'
import BuddyPage from './pages/buddy'
import HomePage from './pages/home'
import ProfileEditPage from './pages/profile-edit'
import ProfilePage from './pages/profile'
import TalkPage from './pages/talk'
import TalkChatPage from './pages/talk-chat'
import LoginPage from './pages/login'
import TakecarePage from './pages/takecare'

export const pathRoutes = {
  UpdateStepOne: {
    path: '/update-step-1',
    component: UpdateStepOnePage,
  },
  UpdateStepTwo: {
    path: '/update-step-2',
    component: UpdateStepTwoPage,
  },
  Buddy: {
    path: '/buddy',
    component: BuddyPage,
  },
  Home: {
    path: '/home',
    component: HomePage,
  },
  ProfileEdit: {
    path: '/profile-edit',
    component: ProfileEditPage,
  },
  Profile: {
    path: '/profile',
    component: ProfilePage,
  },
  Talk: {
    path: '/talk',
    component: TalkPage,
  },
  TalkChat: {
    path: '/talk-chat',
    component: TalkChatPage,
  },
  Login: {
    path: '/login',
    component: LoginPage,
  },
  Takecare: {
    path: '/takecare',
    component: TakecarePage,
  }
}

export const Routes = Object.values(pathRoutes).map(route => (
  <Route key={`route-${route.path}`} {...route} />
))

Routes.push(<Route key={'Landing-1'} path="/" exact component={LoginPage} />)
Routes.push(<Route key="NotFound" render={() => <div>404 Page not found.</div>} />)

export default Routes
