import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";

export const StyledContainer = styled(MuiContainer)(
  ({ theme }) => ({
    width: '100%',
    minHeight: "100vh",
    height: '100%',
    maxHeight: "100%",
    [theme.breakpoints.up('lg')]: {
      maxWidth: "100%",
      minHeight: "100vh",
      height: "100%",
    },
    [theme.breakpoints.between('lg', 'sm')]: {
      heigth: "100vh",
      maxHeight: "100%",
      maxWidth: "100%"
    },
  }),
);

export default StyledContainer;