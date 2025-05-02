import { Card, CardContent, Grid2, Typography } from "@mui/material";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

/**
 * Component for the header of the page
 *
 * @returns Header component
 */
export default function Header() {
  const [cookies] = useCookies(["userInfo"]);

  return (
    <Grid2
      container
      spacing={2}
      direction={"row"}
      justifyContent={"space-between"}
      className="mt-auto flex px-4 py-2"
    >
      <Grid2>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Card
            raised={true}
            sx={{
              borderRadius: 100,
              backgroundColor: "#0F3D75",
              padding: "4px",
            }}
            className="hover:shadow-lg hover:scale-105 transition-transform duration-200 w-54 md:w-66"
          >
            <Typography
              variant="h5"
              gutterBottom={false}
              style={{ fontWeight: "bold", color: "white" }}
              className="text-center md:p-2 p-1"
            >
              Trygg på nett.no
            </Typography>

            <CardContent
              className="text-center"
              style={{ paddingTop: "0", paddingBottom: "4px" }}
            >
              <Typography variant="body2" style={{ color: "white" }}>
                (Tilbake til hjem)
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid2>
      <Grid2>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Card
            data-testid="points-my-page-button"
            sx={{
              borderRadius: 6,
              backgroundColor: "#0F3D75",
            }}
            className="flex flex-col-reverse sm:w-50 md:h-12 w-26 h-24 md:gap-4 gap-0 md:justify-center p-2
            md:flex-row hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <Typography
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              variant="body1"
            >
              <OfflineBoltOutlinedIcon />
              {cookies.userInfo?.allUserPoints ?? "nein"}
            </Typography>

            <Typography
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              variant="body1"
            >
              <PersonOutlineOutlinedIcon />
              Min side
            </Typography>
          </Card>
        </Link>
      </Grid2>
    </Grid2>
  );
}
