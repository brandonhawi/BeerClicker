import {
  AppBar,
  Toolbar,
  IconButton,
  Modal,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Tooltip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState, type ReactNode } from "react";
import { useAchievements } from "../store/selectors";
import Image from "next/image";

export default function Achievements() {
  const [achievementsShown, setAchievementsShown] = useState(false);
  const achievements = useAchievements();

  const achievementsRender: ReactNode[] = [];
  Object.values(achievements).forEach(({ earned, name, description }) => {
    if (earned) {
      achievementsRender.push(
        <Tooltip key={name} title={`${name}: ${description}`}>
          <ImageListItem>
            <Image
              src="/beerenomics.png"
              alt="beerenomics achievements"
              width={50}
              height={50}
            />
          </ImageListItem>
        </Tooltip>
      );
    } else {
      achievementsRender.push(
        <ImageListItem key={name}>
          <Image
            src="https://placehold.co/50"
            alt="placeholder"
            width={50}
            height={50}
          />
        </ImageListItem>
      );
    }
  });

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
            width: 600,
            padding: 2,
          }}
        >
          <Typography variant="h6">Achievements</Typography>
          <ImageList sx={{ width: 400, height: 450 }} cols={8} rowHeight={50}>
            {achievementsRender}
          </ImageList>
        </Paper>
      </Modal>
    </>
  );
}
