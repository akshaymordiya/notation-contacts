import { styled } from "@mui/material/styles";
import { BoxProps as MuiBoxProps } from "@mui/material/Box";

interface BoxProps extends MuiBoxProps {
  innerBox?: boolean;
}

const StyledBox = (Component : any) =>  styled(Component, {
  shouldForwardProp: (prop) => prop !== 'innerBox',
})<BoxProps>(({ theme, innerBox }) => ({
  padding: theme.spacing(1),
  ...(innerBox && ({
    marginTop: '0.5rem',
    borderRadius: '1.5rem',
    maxHeight: '250px',
    overflowY: 'auto',
    background: theme.palette.base.main,
    padding: '0 0px',
  }))
}))

const StyledButton = (Component :any) => styled(Component)(({ theme }) => ({
  margin: "1rem 0.5rem",
  color: theme.palette.base.main
}))

export default {
  "MuiBox": StyledBox,
  "MuiButton": StyledButton
}