import Stack from "@mui/material/Stack"
import List from "@mui/material/List"
import Chip from "@mui/material/Chip"
import ListItem from "@mui/material/ListItem"
import useStyledComponents from "../../../../hooks/common/useStyledComponents"
import StyledCheckbox from "../../../Shared/Checkbox"
import ContactCard from "../ContactCard"
import StyledComponents from "./StyledComponents"
import CommonButton from "../../../Shared/CommonButton"
import AddIcon from "@mui/icons-material/Add"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { contact as contactType } from "../../../../reducer/contacts"

interface ContactListProps {
  list?: Array<contactType>
}

const ContactList = ({
  list = []
} : ContactListProps) => {

  const { getStyledComponent } = useStyledComponents(StyledComponents);
  const StyledListItem = getStyledComponent(ListItem, "MuiListItem");
  const StyledChip = getStyledComponent(Chip, "MuiChip")

  return (
    <List disablePadding >
      {list.map((item : contactType) => (
        <StyledListItem key={item?.id}>
          <Stack 
            direction="row"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row">
              <StyledCheckbox name="test" />
              <ContactCard contactInfo={item} />
            </Stack>
            <Stack 
              direction="row"
              alignItems="center"
              spacing={2}
            >
              {item.tags.length !== 0 && (
                <StyledChip 
                label="Tags"
                color="primary"
                onDelete={() => console.log("pressed!!!")}
                deleteIcon={<HighlightOffIcon color="warning" />}
                />
              )}
              <CommonButton
                variant="contained"
                size='small'
              >
                <AddIcon />
              </CommonButton>
            </Stack>
          </Stack>
        </StyledListItem>
      ))}
    </List>
  )
}

export default ContactList