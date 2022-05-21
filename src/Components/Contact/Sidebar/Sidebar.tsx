import { Fragment, memo, useCallback, useEffect, useState } from "react"
import Message from "./Message"
import TagsFilter from "./TagsFilter"
import Button from "@mui/material/Button"
import SidebarBoxWrapper from "./SidebarBoxWrapper"
import StyledComponents from "./StyledComponents"
import useStyledComponents from "../../../hooks/common/useStyledComponents"
import { SET_FILTER_LIST, SET_TAGS_LIST } from "../../../actions/contacts"
import useContextReader from "../../../hooks/common/useContextReader"
import agent from "../../../agent"
import { isEqual } from "../../../utils/helper"

const Sidebar = ({
  open
} : {
  open: boolean
}) => {
  const {
    filteredKeys,
    contactList,
    tags,
    dispatch
  } = useContextReader();

  useEffect(() => {
    if(!tags.length){
      agent.Contacts.getListOfTags().then(response => {
        dispatch(
          SET_TAGS_LIST,
          response?.tags
        )
      })
    }
  }, []);

  const { getStyledComponent } = useStyledComponents(StyledComponents);
  const StyledButton = getStyledComponent(Button, "MuiButton");
  
  const handleApplyFilters = useCallback(() => {
    const isTagsFilterable = (tags: { name : string, value?: string}[]) => {
      let result = true;

      if(!filteredKeys.includeTags?.length && !filteredKeys.excludeTags?.iength){
        return result;
      }

      const foundedIncludeTags :Array<string> = [];
      const mappedTags :Array<string> = tags.map(tag => tag.name)
      tags.forEach(tag => {
        if(filteredKeys.includeTags?.includes(tag.name)){
          result = true
          foundedIncludeTags.push(tag.name)
        }else {
          result = false
        }
      })

      if(!filteredKeys.excludeTags?.length){
        return result;
      }else{
        filteredKeys.excludeTags.forEach((tag: string) => {
          if(foundedIncludeTags.includes(tag) || mappedTags.includes(tag)){
            result = false;
          }
        })
      }
      return result;
    }

    const filteredList = contactList.filter((contact : any) => {
      const result = isTagsFilterable(contact.tags)      
      return result
    })    
    
    dispatch(
      SET_FILTER_LIST,
      filteredList
    )
  }, [contactList])

  if(!open){
    return <span></span>;
  }

  return (
    <Fragment key="sidebar-fragement">
      <SidebarBoxWrapper 
        tagTitle="Include Tags"
      >
        <TagsFilter
          key="include-tags"
          type="includeTags"
          tags={tags}
        />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper 
        tagTitle="Excluded Tags"
      >
        <TagsFilter
          key="exclude-tags"
          type="excludeTags"
          tags={tags}
        />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper
        tagTitle="Message Sent"
      >
        <Message
          key="message-sent"
        />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper
        tagTitle="Message Received"
      >
        <Message 
          key="message-received"
        />
      </SidebarBoxWrapper>
      <StyledButton
        variant="contained"
        onClick={handleApplyFilters}
      >Apply Filter</StyledButton>
    </Fragment>
  )
}

export default memo(Sidebar, isEqual)