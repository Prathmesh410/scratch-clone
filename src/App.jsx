import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Stack gap={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">MIT Scratch Juspay Assignment</Typography>
          <Button color="inherit" sx={{ ml: "auto" }}>
            JUSPAY
          </Button>
        </Toolbar>
      </AppBar>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        gap={2}
        p={1}
        pb={0}
        height={"calc(100vh - 80px)"}
      >
        <Box flexBasis={"25%"} className="container">
          <Sidebar />
        </Box>

        <Box flexBasis={"35%"} className="container">
          <MidArea />
        </Box>

        <Box flexBasis={"40%"} className="container">
          <PreviewArea />
        </Box>
      </Stack>
    </Stack>
  );
}

export default App;
