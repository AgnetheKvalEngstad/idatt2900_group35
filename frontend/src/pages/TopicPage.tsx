import { Grid2, Typography } from "@mui/material";
import TopicMenu from "../components/TopicMenu";
import TopicPageCard from "../components/TopicPageCard";
import type { TopicPageCardProps } from "../components/TopicPageCard";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useReason } from "../hooks/useReason";
import { updateReasonIsRead } from "../api/reasonAPI";
import { useTask } from "../hooks/useTask";
import { updateTaskIsDone, updateTaskPoints } from "../api/taskAPI";
import { useSubtopic } from "../hooks/useSubtopic";
import { updateSubtopicIsRead } from "../api/subtopicAPI";
import { useCookies } from "react-cookie";
import ButtonGroup from "../components/ButtonGroup";
import ProgressBar from "../components/ProgressBar";

/**
 * Creates a React component that represents a page where users can learn
 * about a specific topic and complete exercises related to that topic.
 *
 * @returns The TopicPage component.
 */
export default function TopicPage() {
  const location = useLocation();
  const [achievedPoints, setAchievedPoints] = useState<number>(0);

  const { topicId, topicTitle, difficulty, reasonId, subtopicId, taskId } =
    location.state || {};

  const {
    reason,
    loading: reasonLoading,
    error: reasonError,
    refetch: refetchReason,
  } = useReason(reasonId);
  const {
    task,
    loading: taskLoading,
    error: taskError,
    refetch: refetchTask,
  } = useTask(taskId);
  const {
    subtopic,
    loading: subtopicLoading,
    error: subtopicError,
    refetch: refetchSubtopic,
  } = useSubtopic(subtopicId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cookies, setCookie] = useCookies(["progress", "lastIndex"]);
  const [progress, setProgress] = useState<{ [key: string]: number }>(
    cookies.progress || {}
  );
  const [answers, setAnswers] = useState<{
    [key: number]: {
      selectedValues: { [key: number]: string | null };
      isCorrect: {
        [key: number]: { isCorrect: boolean; isAwarded: boolean } | null;
      };
    };
  }>({});

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

  useEffect(() => {
    if (currentIndex === topicPageCards.length - 1) {
      updateTaskPoints(task!, achievedPoints);
    }
  }, [achievedPoints, currentIndex, task, topicPageCards]);

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
      setCookie("progress", updatedProgress, { path: "/" });
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

  const handleBack = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleCardChange = async (newIndex: number) => {
    if (newIndex < 0 || newIndex >= topicPageCards.length) return;

    const taskRelatedTypes = new Set(["input", "trueFalse", "multipleChoice"]);

    const updates = {
      reason: {
        condition: reason && reason.id && reason.isRead === false,
        updateFn: async () => {
          await updateReasonIsRead(reason!, true);
          await refetchReason();
        },
        markRead: () => {},
      },
      subtopic: {
        condition: subtopic && subtopic.id && subtopic.isRead === false,
        updateFn: async () => {
          await updateSubtopicIsRead(subtopic!, true);
          await refetchSubtopic();
        },
        markRead: () => {},
      },
      task: {
        condition: task && task.id && task.isDone === false,
        updateFn: async () => {
          await updateTaskIsDone(task!, true);
          await refetchTask();
        },
        markRead: () => {},
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

    setCurrentIndex(newIndex);

    if (shouldUpdateProgress) calculateProgress();
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= topicPageCards.length) {
      await handleCardChange(nextIndex);

      window.location.href = "/home";
    } else {
      await handleCardChange(nextIndex);
    }
  };

  const handleMenuClick = async (newIndex: number) => {
    await handleCardChange(newIndex);
  };

  const updateAnswers = (
    cardIndex: number,
    newAnswers: {
      selectedValues: { [key: number]: string | null };
      isCorrect: {
        [key: number]: { isCorrect: boolean; isAwarded: boolean } | null;
      };
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

        <ButtonGroup
          currentIndex={currentIndex}
          topicPageCards={topicPageCards}
          handleBack={handleBack}
          handleNext={handleNext}
          handleTaskCompletion={async () => {
            const card = document.querySelector(
              '[data-testid="topic-page-card"]'
            );
            if (card) {
              const event = new CustomEvent("taskCompletion");
              card.dispatchEvent(event);
            }
          }}
        ></ButtonGroup>
        {reason && subtopic && task && (
          <TopicPageCard
            variant={
              topicPageCards[currentIndex] as TopicPageCardProps["variant"]
            }
            reason={reason}
            subtopic={subtopic}
            task={task}
            topicTitle={topicTitle}
            handleBack={handleBack}
            selectedValues={answers[currentIndex]?.selectedValues || {}}
            isCorrect={Object.fromEntries(
              Object.entries(answers[currentIndex]?.isCorrect || {}).map(
                ([key, value]) => [
                  Number(key),
                  value !== null
                    ? { isCorrect: value.isCorrect, isAwarded: value.isAwarded }
                    : null,
                ]
              )
            )}
            updateAnswers={(newAnswers: {
              selectedValues: { [key: number]: string | null };
              isCorrect: {
                [key: number]: {
                  isCorrect: boolean;
                  isAwarded: boolean;
                } | null;
              };
            }) => updateAnswers(currentIndex, newAnswers)}
            setAchievedPoints={setAchievedPoints}
            achievedPoints={achievedPoints}
          />
        )}
        <Grid2 className="flex flex-col w-64 md:w-120 p-2">
          <ProgressBar value={progress[topicId] || 0} />
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
