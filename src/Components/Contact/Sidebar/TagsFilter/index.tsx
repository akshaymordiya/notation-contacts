import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircle from "@mui/icons-material/CheckCircle"
import StyledComponents from './StyledComponents'
import useStyledComponents from '../../../../hooks/common/useStyledComponents'

const TagsFilter = () => {

  const { getStyledComponent } = useStyledComponents(StyledComponents)
  const StyledListItem = getStyledComponent(MuiListItem, "MuiListItem")

  return (
    <List dense disablePadding>
      {Array.from(Array(5).keys()).map((number) => (
        <StyledListItem
          key={number}
          number={number}
          secondaryAction={ number % 2 !== 0 && (
            <Stack spacing={0.5} direction="row">
              <IconButton edge="end" aria-label="delete" color='error'>
                <DeleteIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" color='primary'>
                <CheckCircle />
              </IconButton>
            </Stack>
          )}
        >
          <ListItemText
            primary="Greetings"
          />
        </StyledListItem>
      ))}    
    </List>
  )
}

export default TagsFilter