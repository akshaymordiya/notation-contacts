import { memo } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Input, { InputProps as MuiInputProps } from "@mui/material/Input";

interface InputProps extends MuiInputProps {
  customMargin?: string,
  padding?: string,
  applyFullWidth?: boolean
}

interface StyleInput extends InputProps {
  theme: Theme,
}

const StyledInput = styled(Input, {
  shouldForwardProp: (prop : any) => !["customMargin", "padding", "applyFullWidth"].includes(prop)
})<InputProps>(({ theme, customMargin, padding, applyFullWidth } : StyleInput ) : CSSObject => 
  ({
    borderRadius: '1rem',
    position: 'relative',
    width: applyFullWidth ? "100%" : 'auto',
    padding: padding ?? "0.2rem 0.7rem",
    margin: customMargin ?? "0 0.4rem",
    background: theme.palette.base.main,
    border: `1px solid ${theme.palette.base.main}`,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    "&.Mui-focused": {
      border: `2px solid ${theme.palette.primary.main}`,
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
      }
    },
}))

const CustomInput = (props : InputProps) => {
  return (
    <StyledInput
      disableUnderline
      {...props}
    />
  )
}

export default memo(CustomInput)