import { Card, CardContent, Grid2, Typography } from "@mui/material";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";

/**
 * A React component that renders a header with a home button and a profile button.
 *
 * @returns Header component with home and profile buttons.
 */
export default function Header() {
  const [cookies] = useCookies(["userInfo"]);
  const userId = cookies.userInfo?.id;
  const { user, fetchUserHandler } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        await fetchUserHandler(userId);
      }
    };
    fetchUser();
  }, [userId, fetchUserHandler]);

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
            className="flex flex-col-reverse sm:w-50 md:h-12 w-28 h-24 md:gap-4 gap-0 md:justify-center md:text-center p-2
            md:flex-row hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <Grid2 className="flex flex-row items-center gap-1">
              <OfflineBoltOutlinedIcon
                fontSize="large"
                className="bg-yellow-300 rounded-full border-2 text-black"
              />
              <Typography
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                variant="body1"
              >
                {user?.allUserPoints ?? 0}
              </Typography>
            </Grid2>

            <Typography
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              variant="body1"
            >
              <PersonOutlineOutlinedIcon fontSize="large" />
              Min side
            </Typography>
          </Card>
        </Link>
      </Grid2>
    </Grid2>
  );
}
