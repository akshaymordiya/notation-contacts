import { ReactNode } from "react"
import { styled, Theme } from "@mui/material"
import Button , { ButtonProps as MuiButtonProps} from "@mui/material/Button"

interface ButtonCommonProps extends MuiButtonProps {
  children?: ReactNode,
  spacing?: {
    m?: string,
    p?: string
  },
  radius?: string
}

interface ButtonPropsWithTheme extends ButtonCommonProps {
  theme: Theme
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop : any) => !["spacing", "radius"].includes(prop)
})<ButtonCommonProps>(({ theme, spacing, radius }: ButtonPropsWithTheme) => ({
  background: theme.palette.primary.main,
  borderRadius: radius ?? "10rem",
  minWidth: "1rem",
  margin: '0px',
  boxShadow: theme.shadows[1],  
  color: "#fff",
  ...(spacing && ({
    margin: spacing?.m,
    padding: spacing?.p
  }))
}))

const CommonButton = ({
  children,
  ...props
} : ButtonCommonProps) => {

  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  )
}

export default CommonButton