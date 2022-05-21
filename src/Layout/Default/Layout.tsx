import { Box, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { SET_AUTH } from '../../actions/auth';
import agent from '../../agent';
import defaultConfigurations from '../../config/auth';
import useContextReader from '../../hooks/common/useContextReader';
import { isEqual } from '../../utils/helper';
import StyledContainer from "./styles";

const Layout = () => {
  const navigate = useNavigate();
  const location =  useLocation();
  const { accessToken, refreshToken, isLoggedIn, dispatch, errorHandler } = useContextReader();
  const { credentials, token: tokenText } = defaultConfigurations;
  const accessTokenFromLocalStorage = localStorage.getItem(tokenText)
  const [isAppReady, setIsAppReady] = useState(accessTokenFromLocalStorage ? true : false);
  
  //custom redirect as of now
  useEffect(() => {
    if(location.pathname === "/"){
      navigate('/contact')
    }
  }, [location, navigate]);
  
  useEffect(() => {
    if(!accessToken && !accessTokenFromLocalStorage){
      setIsAppReady(false);
      autoLogin();
    }else if(accessTokenFromLocalStorage && !accessToken){
      autoLogin(accessTokenFromLocalStorage)
    }
  }, [accessToken, accessTokenFromLocalStorage])

  const autoLogin = async (token : string | null = null) => {
    let accessToken : any = token
    
    if(!accessToken){
      accessToken = await agent.Auth.getAccessToken(credentials.teamId, refreshToken || credentials.refreshToken).then(data => {
        return data?.access_token
      }).catch(error => errorHandler(error))
    }

    localStorage.setItem(tokenText, accessToken)
    setIsAppReady(true);
    dispatch(
      SET_AUTH,
      accessToken
    )
  }
    
  if(!isAppReady || !isLoggedIn){
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

export default memo(Layout, isEqual)