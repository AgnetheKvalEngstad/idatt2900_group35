import { describe, expect, it, beforeEach, Mock } from "vitest";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfilePage from "../../pages/ProfilePage";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { useTopics } from "../../hooks/useTopics";
import { CookiesProvider } from "react-cookie";

vi.mock("../../hooks/useTopics", () => ({
  useTopics: vi.fn(),
}));

const mockTopics = [
  {
    id: 1,
    title: "Intro to Cookies",
    skillLevel: "0",
    topicIcon: "cookie",
    userId: 1,
    reasonId: 1,
    subtopicId: 1,
    taskId: 1,
    taskType: "truefalse",
  },
  {
    id: 2,
    title: "Advanced Cookies",
    topicIcon: "cookie",
    skillLevel: "2",
    userId: 2,
    reasonId: 2,
    subtopicId: 2,
    taskId: 2,
    taskType: "multiplechoice",
  },
];

const stableRefetch = vi.fn().mockResolvedValue(undefined);

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ProfilePage component test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state", () => {
    (useTopics as Mock).mockReturnValue({
      topics: [],
      loading: true,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render title", () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );
    expect(screen.getByText("Min side")).toBeInTheDocument();
  });

  it("should render the delete button", () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );

    expect(screen.getByText("Slett min data")).toBeInTheDocument();
  });

  it("should render completed topics card", () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );

    expect(screen.getByText("Fullførte temaer")).toBeInTheDocument();
  });

  it("should open the delete dialog when the delete button is clicked", async () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );

    const deleteButton = screen.getByText("Slett min data");
    await act(async () => {
      userEvent.click(deleteButton);
    });

    expect(
      screen.getByText("Er du sikker på at du vil slette dataene dine?")
    ).toBeInTheDocument();
  });

  it("should render all topic cards", () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
      refetch: stableRefetch,
    });
    renderWithRouter(
      <CookiesProvider>
        <ProfilePage />
      </CookiesProvider>
    );

    expect(screen.getByText("Intro to Cookies")).toBeInTheDocument();
    expect(screen.getByText("Advanced Cookies")).toBeInTheDocument();
  });
});
