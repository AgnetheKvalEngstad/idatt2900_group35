import { render, screen, waitFor, act } from "@testing-library/react";
import TopicPage from "../../pages/TopicPage";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { AxiosInstance } from "axios";
import axiosInstance from "../../api/axios";
import { MemoryRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

vi.mock("../../api/axios");

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...actual,
    useLocation: () => ({
      state: {
        topicTitle: "Topic Title",
        difficulty: "Beginner",
        reasonId: 1,
        subtopicId: 1,
        taskId: 1,
      },
    }),
  };
});

const mockedAxios = axiosInstance as jest.Mocked<AxiosInstance>;

const mockTopicContent = {
  reason: {
    id: 1,
    reasonTitle: "Reason Title",
    reasonContent: "Reason Description",
    isRead: false,
    topicId: 1,
  },
  subtopic: {
    id: 1,
    title: "Subtopic Title",
    subtopicContent: "Subtopic Description",
    isRead: false,
    topicId: 1,
  },
  task: {
    id: 1,
    title: "Task Title",
    taskContent: "Task Description",
    isDone: false,
    topicId: 1,
    taskType: "truefalse",
    questions: [
      {
        id: 1,
        questionText: "Question 1",
        correctAnswer: "true",
        options: [],
        correctOption: "null",
      },
    ],
    maximumPoints: 10,
    achievedPoints: 5,
  },
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <CookiesProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </CookiesProvider>
  );
};

describe("TopicPage component testing", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("/Reasons")) {
        return Promise.resolve({ data: mockTopicContent.reason });
      }
      if (url.includes("/Subtopics")) {
        return Promise.resolve({ data: mockTopicContent.subtopic });
      }
      if (url.includes("/Tasks")) {
        return Promise.resolve({ data: mockTopicContent.task });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    await act(async () => {
      renderWithRouter(<TopicPage />);
    });
  });

  it("should render the loading text", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("should render the topic title", () => {
    expect(screen.getByText("Topic Title")).toBeInTheDocument();
  });

  it("should render next button", async () => {
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /Neste|Lever oppgave|Fullfør kurs/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should render reason title", async () => {
    await waitFor(() => {
      expect(screen.getByText("Reason Title")).toBeInTheDocument();
    });
  });

  it("should render back button", async () => {
    await waitFor(() => {
      expect(screen.getByText("Tilbake")).toBeInTheDocument();
    });
  });

  it("back button should be disabled on first card", async () => {
    await waitFor(() => {
      expect(screen.getByText("Tilbake")).toBeDisabled();
    });
  });

  it("should render reason content", async () => {
    await waitFor(() => {
      expect(screen.getByText("Reason Description")).toBeInTheDocument();
    });
  });

  it("should render subtopic title and content when clicking next", async () => {
    screen.getByText("Neste").click();
    await waitFor(() => {
      expect(screen.getByText("Subtopic Title")).toBeInTheDocument();
      expect(screen.getByText("Subtopic Description")).toBeInTheDocument();
    });
  });
});
