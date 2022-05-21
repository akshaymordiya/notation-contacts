import { memo, useContext } from 'react'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import MuiListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircle from "@mui/icons-material/CheckCircle"
import StyledComponents from './StyledComponents'
import useStyledComponents from '../../../../hooks/common/useStyledComponents'
import { SET_FILTER_KEYS } from '../../../../actions/contacts'
import useContextReader from '../../../../hooks/common/useContextReader'
import { isEqual } from '../../../../utils/helper'

const TagsFilter = ({
  type,
  tags = []
} : {
  type: string,
  tags: {
    name: string,
    value?: string
  }[]
}) => {

  const {
    filteredKeys,
    dispatch
  } : {
    filteredKeys: any,
    dispatch: Function
  } = useContextReader();
  const { getStyledComponent } = useStyledComponents(StyledComponents)
  const StyledListItem = getStyledComponent(MuiListItem, "MuiListItem")

  const isTagChecked = (name: string) => {
    const key: Array<string> = filteredKeys[type]
    return key.includes(name)
  }

  const handleListSelection = (tag: { name: string, value?: string }) => {
    const isAlreadyInTheList = filteredKeys[type].includes(tag.name)
    const updatedFilterdKeys = isAlreadyInTheList ? filteredKeys[type].filter(((item: string) => item !== tag.name)) : [
      ...filteredKeys[type],
      tag.name
    ]

    dispatch(
      SET_FILTER_KEYS,
      {
        key: type,
        value: updatedFilterdKeys
      }
    )
  }


  const displayedCheckMark = (tag : { name: string, value?: string}) => {
    if(isTagChecked(tag.name)){
      return (
        <Stack spacing={0.5} direction="row">
            {/* <IconButton edge="end" aria-label="delete" color='error'>
              <DeleteIcon />
            </IconButton> */}
          <IconButton edge="end" aria-label="delete" color='primary'>
            <CheckCircle />
          </IconButton>
        </Stack>
      )
    }

    return <span></span>
  }

  return (
    <List dense disablePadding>
      {tags.map((tag,index) => (
        <StyledListItem
          key={tag.name}
          number={index}
          onClick={() => handleListSelection(tag)}
          secondaryAction={displayedCheckMark(tag)}
        >
          <ListItemText
            primary={tag.name}
          />
        </StyledListItem>
      ))}    
    </List>
  )
}

export default memo(TagsFilter, isEqual)