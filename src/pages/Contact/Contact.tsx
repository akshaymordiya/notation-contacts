import { useEffect, useState, useContext } from 'react';
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
import { GlobalContext } from '../../App';
import agent from '../../agent';
import { SET_CONTACT_LIST, SET_TAGS_LIST } from '../../actions/contacts';

const types: any = {
  "0" : {
    type: SET_CONTACT_LIST,
    key: "contacts"
  },
  "1": {
    type: SET_TAGS_LIST,
    key: "tags"
  }
}
const Contact = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [isDataPreparing, setIsDataPreparing] = useState(false);
  const { state: { auth, contacts }, dispatch, errorHandler } = useContext(GlobalContext);

  const updateContactList = () => 
    Promise.all([
      agent.Contacts.getContactList(),
      agent.Contacts.getListOfTags()
    ]).then(response => {
      console.log("response --> ", response);
      response.forEach((response, index) => {
        dispatch({
          type: types[index].type,
          payload: response[types[index].key]
        })
      })
      setIsDataPreparing(false)
    }).catch(error => errorHandler(error)) 


  useEffect(() => {
    if(auth.accessToken && !contacts.contactList.length){
      setIsDataPreparing(true)      
      updateContactList();  
    }
  }, [auth.accessToken, contacts.contactList])

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
        {isDataPreparing ? (
          <Typography variant="h6" color={theme.palette.secondary.light}>Preparing Contacts List...</Typography>
          ) : !contacts.contactList.length ? (
            <Typography variant="h6" color={theme.palette.secondary.light}>No Contact List to show...</Typography>
          ) : (
          <Main />
        )}
      </StyledBox>
    </Box>
  );
}

export default Contact