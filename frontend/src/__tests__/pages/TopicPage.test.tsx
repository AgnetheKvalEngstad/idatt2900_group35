import { render, screen, waitFor, act } from "@testing-library/react";
import TopicPage from "../../pages/TopicPage";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { AxiosInstance } from "axios";
import axiosInstance from "../../api/axios";
import { MemoryRouter } from "react-router-dom";

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
    taskTitle: "Task Title",
    taskContent: "Task Description",
    isDone: false,
    topicId: 1,
    taskType: "truefalse",
  },
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("TopicPage component testing", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockedAxios.get.mockResolvedValueOnce({ data: mockTopicContent.reason });
    mockedAxios.get.mockResolvedValueOnce({ data: mockTopicContent.subtopic });
    mockedAxios.get.mockResolvedValueOnce({ data: mockTopicContent.task });
    await act(async () => {
      renderWithRouter(<TopicPage />);
    });
  });

  it("should render the page", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
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

  it("should render title", async () => {
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

  it("clicking next button should enable back button", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", {
      name: /Neste|Lever oppgave|Fullfør kurs/i,
    });
    userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText("Tilbake")).not.toBeDisabled();
    });
  });

  it("clicking three times should lead to completed page", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", {
      name: /Neste|Lever oppgave|Fullfør kurs/i,
    });

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /Fullfør kurs/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("clicking back button should go back to previous card", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", {
      name: /Neste|Lever oppgave|Fullfør kurs/i,
    });
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const backButton = screen.getByText("Tilbake");
    userEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText("Lever oppgave")).toBeInTheDocument();
    });
  });
});
