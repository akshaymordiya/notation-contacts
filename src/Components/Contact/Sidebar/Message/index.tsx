import Stack from '@mui/material/Stack'
import Input from '../../../Shared/Input'

const StackBackground = {
  background: "#fff"
}

const Message = () => {
  return (
    <Stack direction="row" style={StackBackground}>
      <Input 
        id="standard-size-small"
        placeholder='Min'
        size="small"
        type="number"
      />
      <Input 
        id="standard-size-small"
        placeholder='Max'
        size="small"
        type="number"
      />
    </Stack>
  )
}

export default Message