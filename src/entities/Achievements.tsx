import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Modal,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState } from "react";

export default function Achievements() {
  const [achievementsShown, setAchievementsShown] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, left: 240 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="achievements"
            onClick={() => {
              setAchievementsShown(!achievementsShown);
            }}
          >
            <EmojiEventsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal
        open={achievementsShown}
        onClose={() => setAchievementsShown(false)}
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            padding: 2,
          }}
        >
          <Typography variant="h6">Achievements</Typography>
          <ImageList sx={{ width: 400, height: 450 }} cols={8} rowHeight={50}>
            <ImageListItem>
              <img src="/beerenomics.png" />
            </ImageListItem>
            <ImageListItem>
              <img src="https://placehold.co/50" />
            </ImageListItem>
            <ImageListItem>
              <img src="https://placehold.co/50" />
            </ImageListItem>
          </ImageList>
        </Paper>
      </Modal>
    </>
  );
}
