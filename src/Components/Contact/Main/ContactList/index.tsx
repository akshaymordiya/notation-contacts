import { Fragment, memo } from 'react';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import ContactListItem from '../ContactListItem';
import { isEqual } from '../../../../utils/helper';

const ContactList = ({
  list = []
} : { list: any }) => {
  return (
    <Fragment>
      {list.map((item : any) => item[1]?.length !== 0 && (
        <Stack 
        key={item[0]}
        marginTop="0.5rem"
        >
          <Typography noWrap variant="h6" fontWeight={900} fontSize="1.2rem" >{item[0]}</Typography>
          <ContactListItem key={`contact-list-${item[0]}`} list={item[1]} />
        </Stack>
      ))}
    </Fragment>
  )
}

export default memo(ContactList, isEqual)