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
            <Typography variant="h6" className="md:py-6 py-2 self-center">
              Her kan du lære om nettsikkerhet på en morsom måte.
            </Typography>
            <Typography variant="h6" className="pb-2 max-w-160 self-center">
              Du kan velge hvilke temaer du ønsker å lære mer om ved å trykke på
              bokser som denne:
            </Typography>
            <Card
              className="md:w-36 md:h-36 w-28 h-28 border-2 border-black self-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-200"
              sx={{ backgroundColor: "#66DB68", borderRadius: 6 }}
              onClick={handleNext}
              raised={true}
            >
              <Grid2 className="flex flex-col items-center justify-center text-center md:gap-4 md:p-4 p-2 gap-2">
                <Typography variant="h6">Temaboks</Typography>
                <CookieIcon fontSize="large" />
              </Grid2>
            </Card>
            <Typography variant="h6" className="max-w-160 self-center">
              Trykk på boksen eller 'neste' for å gå videre!
            </Typography>
            <Typography
              variant="body1"
              className="md:pt-6 md:pb-2 pt-2 max-w-160 self-center"
            >
              (Obs! Denne siden bruker{" "}
              <strong>cookies til å lagre progresjon</strong>, hvis du går
              videre gir du samtykke til dette.)
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <Typography
              variant="h6"
              className="md:py-6 py-2 max-w-160 self-center"
            >
              Inne i disse boksene vil du lære om et tema tilknyttet
              nettsikkerhet. Etter det kan du prøve å vinne premier gjennom å
              teste hvor mye du har lært.
            </Typography>
            <Typography
              variant="h6"
              className="md:py-6 py-2 max-w-160 self-center"
            >
              Dersom noe er utydelig kan du alltid få mer informasjon om siden
              du er på ved å trykke på “Hjelp” knappen i nedre venstre hjørne.
            </Typography>
            <Typography
              variant="h6"
              className="md:py-6 py-2 max-w-160 self-center"
            >
              Lykke til og ha det gøy!
            </Typography>
            <Typography
              variant="body1"
              className="md:pt-6 md:pb-2 pt-2 max-w-160 self-center"
            >
              (Obs! Denne siden bruker{" "}
              <strong>cookies til å lagre progresjon</strong>, hvis du går
              videre gir du samtykke til dette.)
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Grid2 className="flex flex-col items-center justify-center w-full h-full md:p-0 p-2">
      <Typography variant="h4" className="pb-3 text-center">
        Velkommen til Trygg på nett!
      </Typography>
      <Card
        className="w-full max-w-3xl border-1 border-black flex flex-col"
        data-testid="onboarding-card"
      >
        <CardContent className="md:p-6 p-2 min-h-108 flex flex-col text-center justify-center">
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
