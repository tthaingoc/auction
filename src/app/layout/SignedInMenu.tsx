import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import AuctionTable from "../../features/admin/AuctionTable";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
        sx={{ typography: 'h6' }}
      >
         {user?.role === 1 ?'Admin' : 'User'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to={`/auction`}>Auction</MenuItem>
        <MenuItem divider onClick={handleClose} >Inventory</MenuItem>
        <MenuItem onClick={() => {
          dispatch(signOut())
        }}>Logout</MenuItem>
      </Menu>
    </>
  );
}