import { Grid2, Button, Typography } from "@mui/material";
import TopicMenu from "../components/TopicMenu";
import TopicPageCard from "../components/TopicPageCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useReason } from "../hooks/useReason";
import { useTask } from "../hooks/useTask";
import { useSubtopic } from "../hooks/useSubtopic";

/**
 * Creates a React component that represents a page where users can learn
 * about a specific topic and complete exercises related to that topic.
 *
 * @returns The TopicPage component.
 */
export default function TopicPage() {
  const location = useLocation();
  const { topicTitle, difficulty, reasonId, subtopicId, taskId } =
    location.state || {};

  const {
    reason,
    loading: reasonLoading,
    error: reasonError,
  } = useReason(reasonId);
  const { task, loading: taskLoading, error: taskError } = useTask(taskId);
  const {
    subtopic,
    loading: subtopicLoading,
    error: subtopicError,
  } = useSubtopic(subtopicId);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<{
    [key: number]: {
      selectedValues: { [key: number]: string | null };
      isCorrect: { [key: number]: boolean | null };
    };
  }>({});

  const navigate = useNavigate();

  if (reasonLoading || taskLoading || subtopicLoading)
    return <div>Loading...</div>;
  if (reasonError || taskError || subtopicError)
    return <div>Error loading data</div>;

  const topicPageCards: Array<
    | "reason"
    | "subtopic"
    | "completed"
    | "trueFalse"
    | "multipleChoice"
    | "input"
  > = (() => {
    const initialCards: Array<
      | "reason"
      | "subtopic"
      | "completed"
      | "trueFalse"
      | "multipleChoice"
      | "input"
    > = ["reason", "subtopic"];
    switch (task?.taskType?.trim().toLowerCase()) {
      case "truefalse":
        return [...initialCards, "trueFalse", "completed"];
      case "multiplechoice":
        return [...initialCards, "multipleChoice", "completed"];
      case "input":
        return [...initialCards, "input", "completed"];
      default:
        return initialCards;
    }
  })();

  const fetchLastTwoWords = (text: string) => {
    const words = text.split(" ");
    if (words.length < 2) return text;
    words[words.length - 2] =
      words[words.length - 2].charAt(0).toUpperCase() +
      words[words.length - 2].slice(1);
    return words.slice(-2).join(" ");
  };

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
    {
      title: "Hvorfor: " + fetchLastTwoWords(topicTitle),
      icon: <MenuBookRoundedIcon />,
    },
    {
      title: "Hvordan: " + fetchLastTwoWords(topicTitle),
      icon: <MenuBookRoundedIcon />,
    },
    {
      title: "Oppgave: " + fetchLastTwoWords(topicTitle),
      icon: <CreateOutlinedIcon />,
    },
  ];

  return (
    <Grid2
      container
      spacing={2}
      className="flex items-center justify-center w-full h-full"
    >
      <Grid2 className="max-lg:hidden md:flex-1"></Grid2>
      <Grid2
        className="flex flex-col justify-center items-center md:p-0 p-6"
        size={{ xs: 12, sm: 12, md: 8, lg: 8 }}
      >
        <Typography variant="h4" className="text-center mb-4">
          {topicTitle}
        </Typography>

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
        {reason && subtopic && (
          <TopicPageCard
            variant={topicPageCards[currentIndex]}
            reason={reason}
            subtopic={subtopic}
            handleBack={handleBack}
            selectedValues={answers[currentIndex]?.selectedValues || {}}
            isCorrect={answers[currentIndex]?.isCorrect || {}}
            updateAnswers={(newAnswers: {
              selectedValues: { [key: number]: string | null };
              isCorrect: { [key: number]: boolean | null };
            }) => updateAnswers(currentIndex, newAnswers)}
          />
        )}
      </Grid2>
      <div className="flex justify-start">
        <TopicMenu
          difficulty={difficulty}
          index={currentIndex}
          onButtonClick={handleMenuClick}
          menuItems={menuItems}
        />
      </div>
    </Grid2>
  );
}
