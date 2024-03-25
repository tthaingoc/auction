
import { AppBar, Toolbar, Typography, Switch, List, ListItem, IconButton, Box, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
  {title: 'Estates', path: '/catalog'},
  {title: 'News', path: '/news'},
  {title: 'About', path: '/about'},
  {title: 'Contact', path: '/contact'},
]
const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},  
]
const navStyles = {
  color:'inherit',
  typography:'h6',
  '&:hover': {
    color:'secondary.main'
  },
  '&.active': {
    color:'text.secondary'
  }                     
}

// interface Props {
//   darkMode: boolean;
//   handleThemeChange: () => void;
// }

export default function Header() {
  const {user} = useAppSelector(state => state.account);
  return (
      <AppBar position='static' sx={{mb: 4}}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display='flex' alignItems='center'>
              <Typography variant="h6" component={NavLink} to='/'
                sx={{color:'inherit', textDecoration:'none'}}
              >
                 Real Estates Auctions
              </Typography>            
              </Box>

              <List sx={{display:'flex'}} >
                {midLinks.map(({title,path}) => (
                  <ListItem
                      component={NavLink}
                      to={path}
                      key={path}
                      sx={navStyles}
                  >
                      {title.toLocaleUpperCase()}
                  </ListItem>
                ))}
                {user && user.role?.toString().includes('1') &&
                 <ListItem
                      component={NavLink}
                      to={'/inventory'}
                      sx={navStyles}
                  >
                      INVENTORY
                  </ListItem>}
              </List>

              <Box display='flex' alignItems='center'>
                    {/* <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent='4' color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton> */}

                    {user ? (
                        <SignedInMenu/>
                    ) : (
                      <List sx={{display:'flex'}} >
                      {rightLinks.map(({title,path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toLocaleUpperCase()}
                        </ListItem>
                      ))}
                    </List>
                    )}
              </Box>
          </Toolbar>
      </AppBar>
  )
}