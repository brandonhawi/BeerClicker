import { Paper, Typography, Badge } from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";

type Props = {
  name: string;
  hint: string;
};

export default function AchievementView({ name, hint }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2, userSelect: "none" }}>
      <Typography variant="h5">
        <Badge color="secondary">
          <SportsBarIcon color="primary" fontSize="large" />
        </Badge>
        {name}
      </Typography>
      <Typography component="em">&quot;{hint}&quot;</Typography>
    </Paper>
  );
}
