import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { SET_AUTH } from '../../actions/auth';
import agent from '../../agent';
import { context, GlobalContext } from '../../App';
import defaultConfigurations from '../../config/auth';
import StyledContainer from "./styles";

const Layout = () => {
  const navigate = useNavigate();
  const location =  useLocation();
  const { state : { auth }, dispatch } = useContext<context>(GlobalContext);
  const { credentials, token } = defaultConfigurations;
  const accessTokenFromLocalStorage = localStorage.getItem(token)
  const [isAppReady, setIsAppReady] = useState(accessTokenFromLocalStorage ? true : false);
  //custom redirect as of now
  useEffect(() => {
    if(location.pathname === "/"){
      navigate('/contact')
    }
  }, [location, navigate]);
  
  useEffect(() => {
    if(!auth.accessToken || !accessTokenFromLocalStorage){
      setIsAppReady(false);
      autoLogin();
    }
  }, [auth.accessToken, accessTokenFromLocalStorage])

  const autoLogin = () => 
    agent.Auth.getAccessToken(credentials.teamId, auth.refreshToken || credentials.refreshToken).then(data => {
    localStorage.setItem(token, data?.access_token)
    setIsAppReady(true);
    dispatch({
      type: SET_AUTH,
      payload: data?.access_token
    })
  })
  
  if(!isAppReady || !auth.isLoggedIn){
    return (
      <StyledContainer>
        <Box
          width="100%"
          height="100vh" 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant='h3' fontWeight={600} >Loading...</Typography>
        </Box>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer  disableGutters>
      <Outlet />
    </StyledContainer>
  )
}

export default Layout