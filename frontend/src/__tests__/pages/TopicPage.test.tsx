import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopicPage from "../../pages/TopicPage";
import "@testing-library/jest-dom";

describe("TopicPage component testing", () => {
  it("should render next button", () => {
    render(
      <MemoryRouter>
        <TopicPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Neste")).toBeInTheDocument();
  });

  it("should render back button", () => {
    render(
      <MemoryRouter>
        <TopicPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Tilbake")).toBeInTheDocument();
  });
});
