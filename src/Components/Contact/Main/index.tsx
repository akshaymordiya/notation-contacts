import { Fragment, useMemo, useContext, useState, ChangeEvent, useEffect } from "react"
import Input from "../../Shared/Input"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"
import StyledCheckbox from "../../Shared/Checkbox"
import CommonButton from "../../Shared/CommonButton"
import ContactList from "./ContactList"
import { GlobalContext } from "../../../App"
import { contact as contactType } from '../../../reducer/contacts';
import { SET_FILTER_LIST } from "../../../actions/contacts"

const Main = () => {

  const { state: { contacts }, dispatch} = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");

  const handleSearchQuery = (value: string) => {
    setSearchText(value);
    console.log("value --> ", value);
    
    filterListBasedOnSearch();
  }

  const filterListBasedOnSearch = () => {
    const { contactList } = contacts
    const isnum = /^\d+$/.test(searchText);
    const filteredList = contactList.filter(contact => {
      return !isnum ? contact.name.match(searchText) : contact.phoneNumber.match(searchText)
    })

    console.log("filteredList --> ", filteredList); 

    dispatch({
      type: SET_FILTER_LIST,
      payload: filteredList
    })
  }

  const prepareContactList = useMemo(() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const { contactList, filteredList, isFiltered } = contacts
    const activeList = isFiltered ? filteredList : contactList
    if(!contactList.length){
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

    return Object.entries(list)
  }, [contacts.contactList, contacts.filteredList, contacts.isFiltered]);
  
  console.log("searchText", searchText);
  
  return (
    <Fragment>
      <Input 
          key={"search-text-box"}
          id="standard-size-medium"
          placeholder='Search by name or phone number'
          type="text"
          applyFullWidth
          value={searchText}
          onChange={({ target: { value }}) => handleSearchQuery(value)} 
          customMargin='0 0rem'
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
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
          {prepareContactList.map((list : any) => list[1]?.length !== 0 && (
            <Stack 
            key={list[0]}
            marginTop="0.5rem"
            >
              <Typography noWrap variant="h6" fontWeight={900} fontSize="1.2rem" >{list[0]}</Typography>
              <ContactList list={list[1]} />
            </Stack>
          ))}
        </Box>
    </Fragment>
  )
}

export default Main 