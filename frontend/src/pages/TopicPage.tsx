import { Grid2, Button } from "@mui/material";
import TopicMenu from "../components/TopicMenu";
import TopicPageCard from "../components/TopicPageCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useLocation, useNavigate } from "react-router-dom";
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<{
    [key: number]: {
      selectedValues: { [key: number]: string | null };
      isCorrect: { [key: number]: boolean | null };
    };
  }>({});

  const navigate = useNavigate();

  const topicPageCards: Array<
    "text" | "text2" | "completed" | "trueFalse" | "multipleChoice" | "input"
  > = (() => {
    const initialCards: Array<
      "text" | "text2" | "completed" | "trueFalse" | "multipleChoice" | "input"
    > = ["text", "text2"];
    switch (difficulty) {
      case "ingen":
        return [...initialCards, "trueFalse", "completed"];
      case "litt":
        return [...initialCards, "multipleChoice", "completed"];
      case "mye":
        return [...initialCards, "input", "completed"];
      default:
        return initialCards;
    }
  })();

  const handleNext = () => {
    if (currentIndex === topicPageCards.length - 1) {
      navigate("/home");
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topicPageCards.length - 1 : prevIndex - 1
    );
  };

  const handleMenuClick = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const updateAnswers = (
    cardIndex: number,
    newAnswers: {
      selectedValues: { [key: number]: string | null };
      isCorrect: { [key: number]: boolean | null };
    }
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [cardIndex]: newAnswers,
    }));
  };

  const menuItems = [
    { title: "Første kurs", icon: <MenuBookRoundedIcon /> },
    { title: "Andre kurs", icon: <MenuBookRoundedIcon /> },
    { title: "Oppgave!", icon: <CreateOutlinedIcon /> },
  ];

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
            disabled={currentIndex === 0}
          >
            Tilbake
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
            disabled={currentIndex === topicPageCards.length}
          >
            {currentIndex === topicPageCards.length - 1
              ? "Fullfør kurs"
              : currentIndex === topicPageCards.length - 2
                ? "Lever oppgave"
                : "Neste"}
          </Button>
        </Grid2>
        <TopicPageCard
          variant={topicPageCards[currentIndex]}
          selectedValues={answers[currentIndex]?.selectedValues || {}}
          isCorrect={answers[currentIndex]?.isCorrect || {}}
          updateAnswers={(newAnswers: {
            selectedValues: { [key: number]: string | null };
            isCorrect: { [key: number]: boolean | null };
          }) => updateAnswers(currentIndex, newAnswers)}
        />
      </Grid2>
      <Grid2 container className="flex flex-1 ml-auto items-center pr-8 ">
        <TopicMenu
          difficulty={difficulty}
          index={currentIndex}
          onButtonClick={handleMenuClick}
          menuItems={menuItems}
        />
      </Grid2>
    </Grid2>
  );
}
