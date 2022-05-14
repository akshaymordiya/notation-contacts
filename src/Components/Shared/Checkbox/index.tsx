import Checkbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { styled, Theme } from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)<MuiCheckboxProps>(({ theme } : { theme : Theme }) => ({
  '& .MuiCheckbox-root' : {
    border: '1px solid red'
  },
}))

const CustomCheckbox = (props: MuiCheckboxProps) => {
  return (
    <StyledCheckbox
      {...props}
    />
  );
}

export default CustomCheckbox