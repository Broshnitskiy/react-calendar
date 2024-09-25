import { Box } from "@mui/material";
import { BigCalendar, SideBar, Header } from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "src/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <Header />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, marginLeft: "240px" }}>
        <BigCalendar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
