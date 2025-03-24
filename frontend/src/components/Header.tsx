import { Card, CardContent, Grid2, Typography, Button } from "@mui/material";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

/**
 * Component for the header of the page
 *
 * @returns Header component
 */
export default function Header() {
  let points: number = 1000;
  return (
    <Grid2
      container
      spacing={2}
      direction={"row"}
      justifyContent={"space-between"}
      className="mt-auto flex px-4 py-2"
    >
      <Grid2>
        <Card
          raised={true}
          sx={{
            borderRadius: 100,
            backgroundColor: "#0F3D75",
            padding: "4px",
            width: "250px",
          }}
        >
          <CardContent
            style={{
              paddingBottom: "2px",
              paddingTop: "4px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom={false}
              style={{ fontWeight: "bold", color: "white" }}
            >
              Trygg på nett.no
            </Typography>
          </CardContent>
          <CardContent
            className="text-center"
            style={{ paddingTop: "0", paddingBottom: "4px" }}
          >
            <Typography variant="body2" style={{ color: "white" }}>
              (Tilbake til hjem)
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          color="primary"
          data-testid="points-my-page-button"
        >
          <OfflineBoltOutlinedIcon style={{ marginRight: "2px" }} />
          {points}
          <PersonOutlineOutlinedIcon style={{ marginLeft: "14px" }} />
          Min side
        </Button>
      </Grid2>
    </Grid2>
  );
}
