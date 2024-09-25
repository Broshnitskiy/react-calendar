import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home,
  Dashboard,
  Store,
  CalendarToday,
  Settings,
  Chat,
  HelpOutline,
  People,
  Receipt,
  ShoppingCart,
} from "@mui/icons-material";

const menuItems = [
  { text: "Home", icon: <Home /> },
  { text: "Dashboard", icon: <Dashboard /> },
  { text: "Inbox", icon: <Store /> },
  { text: "Products", icon: <ShoppingCart /> },
  { text: "Invoices", icon: <Receipt /> },
  { text: "Customers", icon: <People /> },
  { text: "Chat Room", icon: <Chat /> },
  { text: "Calendar", icon: <CalendarToday /> },
  { text: "Help Center", icon: <HelpOutline /> },
  { text: "Settings", icon: <Settings /> },
];

const drawerWidth = 240;

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0b455e",
          color: "#fff",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ backgroundColor: "#231c3d", color: "#fff" }}>
        <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
          IMPECABLE
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
