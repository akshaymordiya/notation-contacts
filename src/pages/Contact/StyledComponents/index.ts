import { styled, Theme, CSSObject } from "@mui/material/styles";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const drawerWidth = 260;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0rem`,
  [theme.breakpoints.up('sm')]: {
    width: `0rem`,
  },
});

const StyledDrawerHeader = (Component : any) => styled(Component)(({ theme }: { theme : Theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledAppBar = (Component : any) => styled(Component, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open } : { theme: Theme, open: boolean }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none',
  background: theme.palette.grey[50],
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = (Component : any) =>  styled(Component, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open } : { theme: Theme, open: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const StyledBox = (Component : any) => styled(Component, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme } : { theme: Theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
  }),
);

export const useStyles = makeStyles(() =>  
  createStyles({
    root: (props: CSSProperties) => ({
      backgroundColor: props.color,
      display: "flex",
      height: '100%',
      width: '100%'
    })
  }),
)

export default {
  "MuiAppBar": StyledAppBar,
  "MuiDrawer": StyledDrawer,
  "MuiDrawerHeader": StyledDrawerHeader,
  "MuiBox": StyledBox
}