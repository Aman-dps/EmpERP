import { Paper, Typography } from "@mui/material";

export default function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>

      <Typography
        variant="h3"
        sx={{ mt: 1, color: "primary.main", fontWeight: 700 }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
