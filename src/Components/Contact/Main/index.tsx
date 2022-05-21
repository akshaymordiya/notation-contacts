import { Fragment, useMemo, useState, useEffect, memo } from "react"

import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"
import StyledCheckbox from "../../Shared/Checkbox"
import CommonButton from "../../Shared/CommonButton"
import ContactList from "./ContactList"
import { contact as contactType } from '../../../reducer/contacts';
import { SET_FILTER_LIST } from "../../../actions/contacts";
import { SET_CONTACT_LIST, SET_TAGS_LIST } from '../../../actions/contacts';

import agent from "../../../agent"
import defaultConfigurations from "../../../config/auth"
import useContextReader from "../../../hooks/common/useContextReader"
import { useTheme } from "@mui/material"
import SearchBox from "../../SearchBox"
import { isEqual } from "../../../utils/helper"

const contactPreparedList : any = {
  list:[]
}

const Main = () => {
  
  const theme = useTheme();
  const [isDataPreparing, setIsDataPreparing] = useState(false);
  const { 
    contactList,
    dispatch,
    errorHandler,
    filteredList,
    isFiltered
  } = useContextReader();
  const accessToken = localStorage.getItem(defaultConfigurations.token)

  const updateContactList = () => 
    agent.Contacts.getContactList().then(response => {
      dispatch(
        SET_CONTACT_LIST,
        response.contacts
      )
      setIsDataPreparing(false)
    }).catch(error => errorHandler(error))

  useEffect(() => {
    if(accessToken && !contactList.length){
      setIsDataPreparing(true)      
      updateContactList();  
    }
  }, [accessToken, contactList])

  // const handleSearchQuery = (value: string) => {
  //   console.log("value --> ", value);
  //   setSearchText(value);
  //   console.log("value --> ", value);
    
  //   // filterListBasedOnSearch();
  // }

  // const filterListBasedOnSearch = () => {
  //   const isnum = /^\d+$/.test(searchText);
  //   const filteredList = contactList.filter(contact => {
  //     return !isnum ? contact.name.match(searchText) : contact.phoneNumber.match(searchText)
  //   })

  //   dispatch({
  //     type: SET_FILTER_LIST,
  //     payload: filteredList
  //   })
  // }

  const prepareContactList = useMemo(() => {
    

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const activeList = isFiltered ? filteredList : contactList
    if(!contactList?.length){
      return []
    }

    const alphabatticalObj = alphabet.reduce((accumulator, value) => {
      return {...accumulator, [value]: []};
    }, {});
    
    const list = activeList.reduce((accumulator: any, contact: contactType) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      return {
        ...accumulator,
        [firstLetter]: [
          ...accumulator[firstLetter],
          contact
        ]
      }
    }, alphabatticalObj);
    
    const finalList = Object.entries(list)
    contactPreparedList.list = finalList;
    return finalList;

  }, [contactList, isFiltered, filteredList]);
  

  if(isDataPreparing || !contactList?.length) {
    return (
      <Box
        height="50vh"
        maxHeight="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isDataPreparing ? (
          <Typography component="h6" alignSelf="center" fontWeight={600}  color={theme.palette.secondary.light}>Please Wait, preparing the contact list...</Typography>
        ) : (
          <Typography component="h6" alignSelf="center" fontWeight={600}  color={theme.palette.secondary.light}>No Contacts found!!</Typography>
        )}
      </Box>
    )
  }
  
  return (
    <Fragment>
      <SearchBox key="search-box" />
      <Box marginTop="2rem" marginBottom="1rem">
        <Stack
          direction="row"
          justifyContent="space-between"
          >
          <FormControlLabel
            control={
              <StyledCheckbox  name="all"  />
            }
            label="Select All"
          />
          <CommonButton
            variant="contained"
            radius='0.5rem'
            spacing={{ p: "0.5rem" }}
          >
            Export All
          </CommonButton>
        </Stack>
        <ContactList list={prepareContactList} />
      </Box>
    </Fragment>
  )
}

export default memo(Main, isEqual)