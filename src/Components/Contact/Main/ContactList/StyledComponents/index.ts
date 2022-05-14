import { styled, Theme } from "@mui/material"

const StyledListItem = (Component: any) => styled(Component)(({ theme } : { theme : Theme }) => ({
  padding: '0.3rem 0rem',
}))

const StyledChip = (Component: any) => styled(Component)(({ theme } : { theme : Theme }) => ({
  color: theme.palette.common.white,
  '& 	.MuiChip-deleteIcon': {
    color: theme.palette.common.white
  }
}))

export default {
  "MuiListItem": StyledListItem,
  "MuiChip": StyledChip
}