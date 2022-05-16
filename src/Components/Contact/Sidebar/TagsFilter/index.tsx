import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircle from "@mui/icons-material/CheckCircle"
import StyledComponents from './StyledComponents'
import useStyledComponents from '../../../../hooks/common/useStyledComponents'
import { useContext } from 'react'
import { GlobalContext } from '../../../../App'
import { SET_FILTER_KEYS } from '../../../../actions/contacts'

const TagsFilter = ({
  type
} : {
  type: string
}) => {

  const { state: { contacts }, dispatch} = useContext(GlobalContext)
  const { getStyledComponent } = useStyledComponents(StyledComponents)
  const StyledListItem = getStyledComponent(MuiListItem, "MuiListItem")

  const isTagChecked = (name: string) => {
    const { filteredKeys } : { filteredKeys : any } = contacts
    const key: Array<string> = filteredKeys[type]
    return key.includes(name)
  }

  const handleListSelection = (tag: any) => {
    const { filteredKeys } : { filteredKeys: any} = contacts
    const isAlreadyInTheList = filteredKeys[type].includes(tag.name)
    const updatedFilterdKeys = isAlreadyInTheList ? filteredKeys[type].filter(((item: string) => item !== tag.name)) : [
      ...filteredKeys[type],
      tag.name
    ]

    dispatch({
      type: SET_FILTER_KEYS,
      payload: {
        key: type,
        value: updatedFilterdKeys
      }
    })
  }

  return (
    <List dense disablePadding>
      {contacts.tags.map((tag,index) => (
        <StyledListItem
          key={tag.name}
          number={index}
          onClick={() => handleListSelection(tag)}
          secondaryAction={isTagChecked(tag.name) && (
            <Stack spacing={0.5} direction="row">
              {/* <IconButton edge="end" aria-label="delete" color='error'>
                <DeleteIcon />
              </IconButton> */}
              <IconButton edge="end" aria-label="delete" color='primary'>
                <CheckCircle />
              </IconButton>
            </Stack>
          )}
        >
          <ListItemText
            primary={tag.name}
          />
        </StyledListItem>
      ))}    
    </List>
  )
}

export default TagsFilter