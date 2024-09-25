import "./App.css";

import BigCalendar from "./components/big-calendar";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <CssBaseline />
      <Toaster />
      <BigCalendar />
    </>
  );
}

export default App;
