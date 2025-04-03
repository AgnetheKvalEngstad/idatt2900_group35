import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CookieIcon from "@mui/icons-material/Cookie";
import { useNavigate } from "react-router-dom";

/**
 * OnboardingPage component which introduces the user to the application.
 * It provides information about the app's purpose and how to navigate through it.
 *
 * @returns The rendered OnboardingPage component.
 */
export default function OnboardingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex === 1) {
      navigate("/home");
      return;
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const renderCardContent = () => {
    switch (currentIndex) {
      case 0:
        return (
          <>
            <Typography variant="h6" className="py-6 ">
              Her kan du lære om nettsikkerhet på en morsom måte.
            </Typography>
            <Typography variant="h6" className="pb-2 w-160 self-center">
              Du kan velge hvilke temaer du ønsker å lære mer om ved å trykke på
              bokser som denne:
            </Typography>
            <Card
              className="w-36 h-36 border-2 border-black self-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200"
              sx={{ backgroundColor: "#66DB68", borderRadius: 6 }}
              onClick={handleNext}
              raised={true}
            >
              <CardContent className="text-center">
                <Typography variant="h6">Temaboks</Typography>
              </CardContent>
              <CardContent className="text-center ">
                <CookieIcon fontSize="large" />
              </CardContent>
            </Card>
            <Typography variant="h6" className="pt-6 pb-2">
              Trykk på boksen eller 'neste' for å gå videre!
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" className="py-6 w-160 self-center">
              Inne i disse boksene vil du lære om et tema tilknyttet
              nettsikkerhet. Etter det kan du prøve å vinne premier gjennom å
              teste hvor mye du har lært.
            </Typography>
            <Typography variant="h6" className="py-6 w-160 self-center">
              Dersom noe er utydelig kan du alltid få mer informasjon om siden
              du er på ved å trykke på “Hjelp” knappen i nedre venstre hjørne.
            </Typography>
            <Typography variant="h6" className="py-6 w-160 self-center">
              Lykke til og ha det gøy!
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid2
      spacing={1}
      className="flex flex-col flex-grow items-center justify-center flex-wrap content-center"
    >
      <Typography variant="h4" className="pb-10">
        Velkommen til Trygg på nett!
      </Typography>
      <Card
        className="w-full h-full max-h-115 max-w-3xl border-1 border-black flex flex-col"
        data-testid="onboarding-card"
      >
        <CardContent className="flex flex-col h-108 overflow-y-auto text-center justify-center flex-grow">
          {renderCardContent()}
        </CardContent>
        <CardActions className="flex justify-between items-center p-4">
          <Button
            startIcon={<ArrowBackIcon />}
            variant="contained"
            color="secondary"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            Tilbake
          </Button>

          <Button
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            color="secondary"
            onClick={handleNext}
          >
            {currentIndex === 1 ? "Til hovedsiden" : "Neste"}
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
}
