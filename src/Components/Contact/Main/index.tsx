import { Fragment } from "react"
import Input from "../../Shared/Input"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"
import StyledCheckbox from "../../Shared/Checkbox"
import CommonButton from "../../Shared/CommonButton"
import ContactList from "./ContactList"

const Main = () => {
  
  return (
    <Fragment>
      <Input 
          id="standard-size-medium"
          placeholder='Search Contacts'
          type="text"
          applyFullWidth
          customMargin='0 0rem'
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
        <Box marginTop="2rem" marginBottom="1rem">
          <Stack
            direction="row"
            justifyContent="space-between"
            >
            <FormControlLabel
              control={
                <StyledCheckbox  name="all"  />
              }
              label="Select All"
            />
            <CommonButton
              variant="contained"
              radius='0.5rem'
              spacing={{ p: "0.5rem" }}
            >
              Export All
            </CommonButton>
          </Stack>
          {["A","B","C","D"].map(character => (
            <Stack 
            key={character}
            marginTop="0.5rem"
            >
              <Typography noWrap variant="h6" fontWeight={900} fontSize="1.2rem" >{character}</Typography>
              <ContactList list={Array.from(Array(Math.floor(Math.random() * 4) + 1).keys())} />
            </Stack>
          ))}
        </Box>
    </Fragment>
  )
}

export default Main 