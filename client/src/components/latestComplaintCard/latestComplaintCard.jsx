import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";
//import component for admin user
import AdminConditionalButton from "../adminConditionalButton/adminConditionalButton";

export default function LatestComplaintCard({ complaint, isAdmin }) {
  //default image
  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";
  return (
    <Grid sx={{ paddingTop: 5}}>
      {/* card action area used to make box selectable */}
      <CardActionArea
        component="a"
        href={`/Complaint/${complaint._id}`}
        key={complaint._id}
      >
        {/* display complaint details */}
        <Card sx={{ display: "flex", width: "100%", borderRadius: 8, boxShadow: 9}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {complaint.title}
            </Typography>
            <Typography component="h2" variant="h5">
              {complaint.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {complaint.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {complaint.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 160,
              height: 160,
              display: { xs: "none", sm: "block" },
              objectFit: "cover",
            }}
            image={complaint.image || defaultImageLink}
            alt="text"
          />
        </Card>
      </CardActionArea>
      {/* component for if user is admin */}
      <AdminConditionalButton complaint={complaint} isAdmin={isAdmin} />
    </Grid>
  );
}
