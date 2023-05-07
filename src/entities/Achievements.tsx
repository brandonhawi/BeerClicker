import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState } from "react";

export default function Achievements() {
  const [currentNavigation, setCurrentNavigation] = useState("achievements");

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        value={currentNavigation}
        onChange={(event, newValue) => {
          setCurrentNavigation(newValue);
        }}
      >
        <BottomNavigationAction
          label="Achievements"
          icon={<EmojiEventsIcon />}
          value="achievements"
        />
      </BottomNavigation>
    </Paper>
  );
}
