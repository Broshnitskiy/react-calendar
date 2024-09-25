import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings,
} from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ zIndex: 1, position: "fixed" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginLeft: "240px" }}
        >
          <IconButton edge="start" color="inherit">
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search…" sx={{ ml: 1, color: "inherit" }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            John Doe
          </Typography>
          <Avatar sx={{ ml: 2 }} src="/path-to-avatar.jpg" alt="User Avatar" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
