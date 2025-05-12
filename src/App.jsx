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
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
        <Toolbar>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Scratch-clone
          </Typography>
          <Button
            color="inherit"
            sx={{
              ml: "auto",
              background: 'rgba(255,255,255,0.1)',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            JUSPAY ASSIGNMENT
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
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
        }}
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
