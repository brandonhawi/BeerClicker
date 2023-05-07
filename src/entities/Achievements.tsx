import { BottomNavigation, BottomNavigationAction, Modal, Paper, Typography, Box } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState } from "react";

type navigationOptions = "achievements";

export default function Achievements() {
  const [currentNavigation, setCurrentNavigation] = useState<navigationOptions>("achievements");

  return (
    <>
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 240, right: 0 }}
      elevation={4}
    >
      <BottomNavigation
        value={currentNavigation}
        onChange={(_event, newValue) => {
          setCurrentNavigation(newValue);
        }}
        sx={{ padding: 1}}
      >
        <BottomNavigationAction
          label={<Typography>Achievements</Typography>}
          value="achievements"
          icon={<EmojiEventsIcon fontSize="large"/>}
        />
      </BottomNavigation>
    </Paper>
    {/* <Modal
      open={currentNavigation === "achievements"}
    >
      <Box>
        <Typography>Test Achievements</Typography>
      </Box>
    </Modal> */}
    </>
  );
}
