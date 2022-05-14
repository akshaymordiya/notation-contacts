import { Fragment } from "react"
import Message from "./Message"
import TagsFilter from "./TagsFilter"
import Button from "@mui/material/Button"
import SidebarBoxWrapper from "./SidebarBoxWrapper"
import StyledComponents from "./StyledComponents"
import useStyledComponents from "../../../hooks/common/useStyledComponents"

const Sidebar = () => {  

  const { getStyledComponent } = useStyledComponents(StyledComponents);
  const StyledButton = getStyledComponent(Button, "MuiButton");

  return (
    <Fragment>
      <SidebarBoxWrapper 
        tagTitle="Include Tags"
      >
        <TagsFilter />
      </SidebarBoxWrapper>
      <SidebarBoxWrapper 
        tagTitle="Excluded Tags"
      >
        <TagsFilter />
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
      >Apply Filter</StyledButton>
    </Fragment>
  )
}

export default Sidebar