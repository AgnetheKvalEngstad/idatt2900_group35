import {
  Grid2,
  Button,
  Typography,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import TopicMenu from "../components/TopicMenu";
import TopicPageCard from "../components/TopicPageCard";
import type { TopicPageCardProps } from "../components/TopicPageCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useReason } from "../hooks/useReason";
import { updateReasonIsRead } from "../api/reasonAPI";
import { useTask } from "../hooks/useTask";
import { updateTaskIsDone } from "../api/taskAPI";
import { useSubtopic } from "../hooks/useSubtopic";
import { updateSubtopicIsRead } from "../api/subtopicAPI";
import { useCookies } from "react-cookie";

/**
 * Creates a React component that represents a page where users can learn
 * about a specific topic and complete exercises related to that topic.
 *
 * @returns The TopicPage component.
 */
export default function TopicPage() {
  const location = useLocation();

  const { topicId, topicTitle, difficulty, reasonId, subtopicId, taskId } =
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
  const [cookies, setCookie] = useCookies(["progress", "lastIndex"]);
  const [progress, setProgress] = useState<{ [key: string]: number }>(
    cookies.progress || {}
  );

  const [answers, setAnswers] = useState<{
    [key: number]: {
      selectedValues: { [key: number]: string | null };
      isCorrect: { [key: number]: boolean | null };
    };
  }>({});

  const navigate = useNavigate();

  const topicPageCards = useMemo(() => {
    if (!task?.taskType) return ["reason", "subtopic"];

    const cards: Array<
      | "reason"
      | "subtopic"
      | "completed"
      | "trueFalse"
      | "multipleChoice"
      | "input"
    > = ["reason", "subtopic"];

    switch (task?.taskType?.trim().toLowerCase()) {
      case "truefalse":
        cards.push("trueFalse", "completed");
        break;
      case "multiplechoice":
        cards.push("multipleChoice", "completed");
        break;
      case "input":
        cards.push("input", "completed");
        break;
      default:
        console.error(
          `Task type '${task?.taskType}' is undefined or not recognized.`
        );
        break;
    }
    return cards;
  }, [task?.taskType]);

  const calculateProgress = useCallback(() => {
    let completedParts = 0;
    const totalParts = topicPageCards.length - 1;

    if (reason?.isRead) completedParts += 1;
    if (subtopic?.isRead) completedParts += 1;
    if (task?.isDone) completedParts += 1;

    const progressValue = Math.round((completedParts / totalParts) * 100);

    if (progress[topicId] !== progressValue) {
      const updatedProgress = {
        ...progress,
        [topicId]: progressValue,
      };

      setProgress(updatedProgress);
      setCookie("progress", updatedProgress, { path: "/", maxAge: 360 });
    }

    return progressValue;
  }, [reason, subtopic, task, progress, setCookie, topicId, topicPageCards]);

  useEffect(() => {
    if (cookies.progress) {
      setProgress(cookies.progress);
    }

    if (cookies.lastIndex && cookies.lastIndex[topicId] !== undefined) {
      setCurrentIndex(cookies.lastIndex[topicId]);
    }

    if (reason || subtopic || task) {
      calculateProgress();
    }
  }, [
    cookies.progress,
    cookies.lastIndex,
    topicId,
    reason,
    subtopic,
    task,
    calculateProgress,
  ]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    border: `1px solid black`,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: "#3B2E8F",
    },
  }));

  if (reasonLoading || taskLoading || subtopicLoading)
    return <div>Loading...</div>;
  if (reasonError || taskError || subtopicError)
    return <div>Error loading data</div>;

  const fetchLastTwoWords = (text: string) => {
    const words = text.split(" ");
    if (words.length < 2) return text;
    words[words.length - 2] =
      words[words.length - 2].charAt(0).toUpperCase() +
      words[words.length - 2].slice(1);
    return words.slice(-2).join(" ");
  };

  const handleNext = async () => {
    const taskRelatedTypes = new Set(["input", "trueFalse", "multipleChoice"]);

    const updates = {
      reason: {
        condition: reason?.id && reason?.isRead === false,
        updateFn: () => updateReasonIsRead(reason!, true),
        markRead: () => (reason!.isRead = true),
      },
      subtopic: {
        condition: subtopic?.id && subtopic?.isRead === false,
        updateFn: () => updateSubtopicIsRead(subtopic!, true),
        markRead: () => (subtopic!.isRead = true),
      },
      task: {
        condition: task?.id && task?.isDone === false,
        updateFn: () => updateTaskIsDone(task!, true),
        markRead: () => (task!.isDone = true),
      },
    };

    const cardType = topicPageCards[currentIndex];

    let shouldUpdateProgress = false;
    if (taskRelatedTypes.has(cardType)) {
      const update = updates["task"];
      if (update.condition) {
        await update.updateFn();
        update.markRead();
        shouldUpdateProgress = true;
      }
    } else if (cardType in updates) {
      const update = updates[cardType as keyof typeof updates];
      if (update.condition) {
        await update.updateFn();
        update.markRead();
        shouldUpdateProgress = true;
      }
    }

    if (currentIndex === topicPageCards.length - 1) {
      if (shouldUpdateProgress) calculateProgress();
      navigate("/home");
    } else {
      setCurrentIndex(currentIndex + 1);
      if (shouldUpdateProgress) calculateProgress();
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleMenuClick = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < topicPageCards.length) {
      setCurrentIndex(newIndex);
      calculateProgress();
    }
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
      className="flex flex-row items-center justify-center w-full h-full"
    >
      <Grid2 className="max-lg:hidden flex-1"></Grid2>
      <Grid2
        className="flex flex-col justify-center items-center sm:p-4 md:p-0 p-6"
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
            variant={
              topicPageCards[currentIndex] as TopicPageCardProps["variant"]
            }
            reason={reason}
            subtopic={subtopic}
            topicTitle={topicTitle}
            handleBack={handleBack}
            selectedValues={answers[currentIndex]?.selectedValues || {}}
            isCorrect={answers[currentIndex]?.isCorrect || {}}
            updateAnswers={(newAnswers: {
              selectedValues: { [key: number]: string | null };
              isCorrect: { [key: number]: boolean | null };
            }) => updateAnswers(currentIndex, newAnswers)}
          />
        )}
        <Grid2 className="flex flex-col w-64 md:w-120 p-2">
          <BorderLinearProgress
            variant="determinate"
            value={progress[topicId] || 0}
          />
          <Typography variant="body2" className="text-center mt-1">
            Progresjon: {progress[topicId] || 0}%
          </Typography>
        </Grid2>
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
