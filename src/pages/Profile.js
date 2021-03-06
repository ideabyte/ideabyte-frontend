import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import PageSimple from '../layouts/PageSimple'
import Meta from '../layouts/Meta'
import Center from '../layouts/Center'

import UserProfile from '../components/UserProfile'
import UserButtons from '../components/UserButtons'
import HorizontalRule from '../components/HorizontalRule'
// import UserIdeas from '../components/UserIdeas'

import { logoutUser } from '../redux/actions/logout'
import { decodeToken } from '../helpers'

const Profile = ({ profile, dispatch }) => {
  // only render is both isAuthenticated & token are exist
  if (profile.isAuthenticated && profile.token) {
    const navigateToPostPage = () => {
      // only navigate to post if the profile isAuthenticated
      profile.isAuthenticated && dispatch(push('/post'))
    }

    const logoutUserFromProfile = () => {
      // only logoutUser if the profile isAuthenticated
      profile.isAuthenticated && dispatch(logoutUser(profile))
    }

    // only use helpers.decodeToken() when token is available
    const decodedUser = decodeToken(profile.token)

    // actual render
    return (
      <PageSimple>
        <Meta title="My Profile" />

        <Center>
          {/* avatar, name, email */}
          <UserProfile name={decodedUser.name} email={decodedUser.email} />
          {/* go to post button, logout button */}
          <UserButtons
            navigateToPostPage={navigateToPostPage}
            logoutUserFromProfile={logoutUserFromProfile}
          />
          {/* profile's posted ideas list */}
          {/* <UserIdeas ideas={fakeIdeas} /> */}

          <HorizontalRule color="yellow" />

          {/* decodedUser object */}
          <pre>
            decodedUser = {decodedUser && JSON.stringify(decodedUser, null, 2)}
          </pre>
        </Center>
      </PageSimple>
    )
  } else {
    return (
      <PageSimple>
        <Meta title="Redirecting..." />

        {dispatch(push('/'))}
      </PageSimple>
    )
  }
}

const mapStateToProps = state => {
  return {
    // might contain name, email, token, isAuthenticated
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile)
