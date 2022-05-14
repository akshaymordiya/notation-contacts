import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";

export const StyledContainer = styled(MuiContainer)(
  ({ theme }) => ({
    width: '100%',
    height: '100%',
    maxHeight: "100%",
    [theme.breakpoints.up('lg')]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.between('lg', 'sm')]: {
      maxWidth: "100%"
    },
  }),
);

export default StyledContainer;