import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {  } from "@material-ui/core/styles";
import StyledContainer from "./styles";

const Layout = () => {
  const navigate = useNavigate();
  const location =  useLocation();

  //custom redirect as of now
  useEffect(() => {
    if(location.pathname === "/"){
      navigate('/contact')
    }
  }, [location, navigate]);

  return (
    <StyledContainer  disableGutters>
      <Outlet />
    </StyledContainer>
  )
}

export default Layout