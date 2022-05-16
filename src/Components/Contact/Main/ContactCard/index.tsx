import { Fragment, useContext, useEffect, useState } from 'react';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useTheme } from "@mui/material";
import { contact as contactType } from '../../../../reducer/contacts';
import agent from '../../../../agent';
import { GlobalContext } from '../../../../App';

const avatarURL = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

interface contactCardProps {
  contactInfo: contactType
}

const ContactCard = ({
  contactInfo
} : contactCardProps) => {

  const { errorHandler } = useContext(GlobalContext);
  // const [userImage, setUserImage] = useState({
  //   url: ""
  // })


  // useEffect(() => {
  //   agent.Contacts.getContactUserImage(contactInfo.accountId, contactInfo.id, "preview").then((res) => {
  //     console.log("res --> ", res);
      
  //   }).catch((error) => errorHandler(error))
  // }, [contactInfo])

  const getFormattedName = (name : string) => {
    return name.charAt(0).toUpperCase() + name.slice(1); 
  }

  const theme = useTheme()
  return (
    <Fragment>
      <Stack 
        direction="row"
        alignItems="center"
        marginLeft="1.4rem"
        minWidth="36px"
        width="450px"
        maxWidth="600px"
        borderBottom={`1px solid ${theme.palette.grey[200]}`}
      >
        <ListItemAvatar>
          <Avatar src={avatarURL}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={(
          <Typography noWrap fontWeight={900}>{getFormattedName(contactInfo.name)}</Typography>
        )} secondary={`+62${contactInfo.phoneNumber}`} />
      </Stack>
    </Fragment>
  )
}

export default ContactCard