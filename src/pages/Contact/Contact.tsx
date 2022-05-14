import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Stack from "@mui/material/Stack"
import StyledComponents, { useStyles } from './StyledComponents';
import Sidebar from '../../Components/Contact/Sidebar/Sidebar';
import useStyledComponents from '../../hooks/common/useStyledComponents';
import CommonButton from '../../Components/Shared/CommonButton';
import Main from '../../Components/Contact/Main';

const Contact = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  
  const classes = useStyles({
    color: theme.palette.grey[50],
    open
  });

  const { getStyledComponent } = useStyledComponents(StyledComponents); 
  const StyledAppBar = getStyledComponent(MuiAppBar, "MuiAppBar");
  const StyledDrawerHeader = getStyledComponent("div", "MuiDrawerHeader");
  const StyledDrawer = getStyledComponent(MuiDrawer, "MuiDrawer");
  const StyledBox = getStyledComponent(Box, "MuiBox");

  const handlerDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={open} color="inherit">
        <Toolbar >
          {!open && (
            <StyledDrawerHeader>
              <IconButton onClick={handlerDrawer} edge="start">
                <MenuIcon />
              </IconButton>
            </StyledDrawerHeader>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={'100%'}
            marginLeft={!open ? "1.5rem" : "0"}
          >
            <Typography variant="h6" noWrap component="div" fontWeight={700}>
              All Contacts (100)
            </Typography>
            <CommonButton
              variant="contained"
              size='small'
            >
              <AddIcon />
            </CommonButton>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent" open={open}>
        <StyledDrawerHeader>
          <IconButton onClick={handlerDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          {open && (
            <Stack 
              direction="row"
              spacing={4}
              justifyContent="space-around"
              paddingLeft='0.3rem'
            >
              <Typography variant="h6" noWrap component="div" fontWeight={600}>
                Audience
              </Typography>
              <Typography component="h6" alignSelf="center" fontWeight={600} fontSize={12} color={theme.palette.secondary.light}>
                100 Contacts
              </Typography>
            </Stack>
          )}
        </StyledDrawerHeader>
        {open && (
          <Sidebar />
        )}
      </StyledDrawer>
      <StyledBox component="main" >
        <StyledDrawerHeader />
        <Main />
      </StyledBox>
    </Box>
  );
}

export default Contact