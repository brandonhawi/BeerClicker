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
import { useState } from "react";
import { Achievement } from "../types/achievement";

type Props = {
  achievements?: {
    achievementData: Map<string, Achievement>;
  };
};

export default function Achievements({ achievements }: Props) {
  const [achievementsShown, setAchievementsShown] = useState(false);
  if (!achievements) {
    return null;
  }
  const { achievementData } = achievements;
  const achievementsRender: JSX.Element[] = [];
  achievementData.forEach(({ earned, name, description }) => {
    if (earned) {
      achievementsRender.push(
        <Tooltip title={`${name}: ${description}`}>
          <ImageListItem>
            <img src="/beerenomics.png" alt="beerenomics achievements" />
          </ImageListItem>
        </Tooltip>
      );
    } else {
      achievementsRender.push(
        <ImageListItem>
          <img src="https://placehold.co/50" alt="placeholder" />
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
