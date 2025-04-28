import { describe, it, beforeEach, vi, expect, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Homepage from "../../pages/Homepage";
import { useTopics } from "../../hooks/useTopics";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { CookiesProvider } from "react-cookie";

vi.mock("../../hooks/useTopics", () => ({
  useTopics: vi.fn(),
}));

const mockTopics = [
  {
    id: 1,
    title: "Intro to Cookies",
    skillLevel: "0",
    userId: 1,
    reasonId: 1,
    subtopicId: 1,
    taskId: 1,
    taskType: "truefalse",
  },
  {
    id: 2,
    title: "Advanced Cookies",
    skillLevel: "2",
    userId: 2,
    reasonId: 2,
    subtopicId: 2,
    taskId: 2,
    taskType: "multiplechoice",
  },
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Tests for Homepage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading initially", () => {
    (useTopics as Mock).mockReturnValue({
      topics: [],
      loading: true,
      error: false,
    });

    renderWithRouter(
      <CookiesProvider>
        <Homepage />
      </CookiesProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders topic cards on success", () => {
    (useTopics as Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: false,
    });

    renderWithRouter(
      <CookiesProvider>
        <Homepage />
      </CookiesProvider>
    );
    expect(screen.getByText("Intro to Cookies")).toBeInTheDocument();
    expect(screen.getByText("Advanced Cookies")).toBeInTheDocument();
  });

  it("shows error on failure", () => {
    (useTopics as Mock).mockReturnValue({
      topics: [],
      loading: false,
      error: true,
    });

    renderWithRouter(
      <CookiesProvider>
        <Homepage />
      </CookiesProvider>
    );
    expect(screen.getByText("Error loading topics")).toBeInTheDocument();
  });
});
