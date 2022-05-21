import { ReactNode } from "react";
import MuiBox from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyledComponents from "../../../hooks/common/useStyledComponents";
import StyledComponents from "./StyledComponents";

interface SidebarBoxWrapperProps {
  tagTitle: string;
  children: any;
}

const SidebarBoxWrapper = ({
  tagTitle,
  children
} : SidebarBoxWrapperProps) => {
  const { getStyledComponent } = useStyledComponents(StyledComponents)
  const StyledBox = getStyledComponent(MuiBox, "MuiBox");
  
  return (
    <StyledBox>
      <Typography fontWeight={600}>
        {tagTitle}:
      </Typography>
      <StyledBox innerBox>
        {children}
      </StyledBox>
    </StyledBox>
  )
}

export default SidebarBoxWrapper