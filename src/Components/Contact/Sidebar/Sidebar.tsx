import { Fragment, useContext } from "react"
import Message from "./Message"
import TagsFilter from "./TagsFilter"
import Button from "@mui/material/Button"
import SidebarBoxWrapper from "./SidebarBoxWrapper"
import StyledComponents from "./StyledComponents"
import useStyledComponents from "../../../hooks/common/useStyledComponents"
import { GlobalContext } from "../../../App"
import { SET_FILTER_LIST } from "../../../actions/contacts"

const Sidebar = () => {

  const { state: { contacts }, dispatch} = useContext(GlobalContext);
  const { getStyledComponent } = useStyledComponents(StyledComponents);
  const StyledButton = getStyledComponent(Button, "MuiButton");
  
  const handleApplyFilters = () => {
    const { filteredKeys, contactList } = contacts

    const filteredList = contactList.filter(contact => {
      return contact.tags.some((tag) => filteredKeys.includeTags?.includes(tag.name)) &&
            contact.tags.some((tag) => !filteredKeys.excludeTags?.includes(tag?.name))
    })
    
    dispatch({
      type: SET_FILTER_LIST,
      payload: filteredList
    })
  }

  return (
    <Fragment>
      <SidebarBoxWrapper 
        tagTitle="Include Tags"
      >
        <TagsFilter type="includeTags"/>
      </SidebarBoxWrapper>
      <SidebarBoxWrapper 
        tagTitle="Excluded Tags"
      >
        <TagsFilter type="excludeTags" />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper
        tagTitle="Message Sent"
      >
        <Message />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper
        tagTitle="Message Received"
      >
        <Message />
      </SidebarBoxWrapper>
      <StyledButton
        variant="contained"
        onClick={handleApplyFilters}
      >Apply Filter</StyledButton>
    </Fragment>
  )
}

export default Sidebar