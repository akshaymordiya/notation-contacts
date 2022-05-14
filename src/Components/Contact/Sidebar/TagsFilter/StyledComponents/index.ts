import { styled } from "@mui/material/styles";
import { ListItemBaseProps as MuiListItemBaseProps } from "@mui/material/ListItem";

interface ListItemBaseProps extends MuiListItemBaseProps {
  number?: number;
}

const StyledListItem = (Component: any) => styled(Component, {
  shouldForwardProp: (prop) => prop !== 'number' 
})<ListItemBaseProps>(({ theme, number = 0 }) => ({
  background: (number % 2 !== 0) ? theme.palette.base.light : theme.palette.base.main,
  transition: '0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover' : {
    background: theme.palette.primary.light
  }
}))

export default {
  "MuiListItem": StyledListItem
}