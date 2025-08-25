import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { THEME } from '@theme/index'
import { setCredentials, selectCurrentUser } from '@modules/Auth/authSlice'
import SignInForm from './SignInForm'
import { baseRequest } from '@request/request'
import { OpenNotification } from '@components/common'
import { HotelImg } from '@assets/images'
import { APIURLS } from '@request/apiUrls/urls'
import { toast } from 'react-toastify'

export const Wrapper = styled.div`
  height: 100vh;
  width:100%;
  display:grid;
  background: url(${HotelImg});
  background-size: cover;
  background-position: center;
`

const SignInCard = styled.div`
  background-color:#bde0fe70;
  backdrop-filter:blur(1px);
  padding: 40px 32px;
  border-radius:0px 40px 0px 40px;
  max-width: 450px;
  width: 100%;
  margin: auto;
  height: 50%;
  border: 2px solid #949292;
`

const UserSignin = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleSignIn = async (data) => {
    try {
      const authData = await baseRequest.post(APIURLS.LOGIN, {
        ...data,
      })
      console.log(authData, 'authData');
      // Mock API, add the origin API and payload data
      dispatch(setCredentials(authData.data))
      OpenNotification({
        type: 'success',
        msg: `Welcome Back`
      })
      navigate('/', { replace: true })

    } catch (error) {
      console.error('Getting error while login', error)
      if (error.response.status === 401) {
        toast.error('Please check your credentials !')
      }
    }
  }


  const token = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token) {
      navigate('/signin')
    }
  }, [token])

  return (
    <Wrapper column>
      <SignInCard>
        <SignInForm handleSignIn={handleSignIn} />
      </SignInCard>
    </Wrapper>
  )
}
export default UserSignin
