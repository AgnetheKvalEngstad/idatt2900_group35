import { Grid2, Button } from "@mui/material";
import TopicMenu from "../components/TopicMenu";
import TopicPageCard from "../components/TopicPageCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";

import { useState } from "react";

/**
 * Creates a React component that represents a page where users can learn
 * about a specific topic and complete exercises related to that topic.
 *
 * @returns The TopicPage component.
 */
export default function TopicPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const difficulty = queryParams.get("difficulty") ?? "ingen";

  const variants: Array<"text" | "trueFalse" | "multipleChoice" | "input"> = [
    "text",
    "trueFalse",
    "multipleChoice",
    "input",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuIndex, setMenuIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % variants.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? variants.length - 1 : prevIndex - 1
    );
  };

  const handleMenuClick = (newIndex: number) => {
    setMenuIndex(newIndex);
  };

  return (
    <Grid2
      container
      spacing={2}
      className="flex md:flex-grow flex-wrap items-center justify-center"
    >
      <Grid2 className="md:flex-1"></Grid2>
      <Grid2 className="flex flex-col justify-center items-center flex-grow w-100">
        <Grid2
          container
          className="flex flex-row w-full max-w-3xl justify-between p-2"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Tilbake
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            Neste
          </Button>
        </Grid2>
        <TopicPageCard variant={variants[currentIndex]} />
      </Grid2>
      <Grid2 container className="flex flex-1 ml-auto items-center pr-8 ">
        <TopicMenu
          difficulty={difficulty}
          index={menuIndex}
          onButtonClick={handleMenuClick}
        />
      </Grid2>
    </Grid2>
  );
}
