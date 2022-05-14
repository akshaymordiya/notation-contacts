import { styled, Theme, CSSObject } from "@mui/material/styles";
import InputBase, { InputBaseProps as MuiInputBaseProps } from "@mui/material/InputBase";

interface InputBaseProps extends MuiInputBaseProps {
  customMargin?: string,
  padding?: string,
  applyFullWidth?: boolean
}

interface StyleInput extends InputBaseProps {
  theme: Theme,
}

const StyledInput = styled(InputBase, {
  shouldForwardProp: (prop : any) => !["customMargin", "padding", "applyFullWidth"].includes(prop)
})<InputBaseProps>(({ theme, customMargin, padding, applyFullWidth } : StyleInput ) : CSSObject => 
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

const Input = (props : InputBaseProps) => {
  return (
    <StyledInput
      {...props}
    />
  )
}

export default Input