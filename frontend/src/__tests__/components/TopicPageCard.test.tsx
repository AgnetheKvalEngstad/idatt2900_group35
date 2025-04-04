import { render, screen } from "@testing-library/react";
import TopicPageCard from "../../components/TopicPageCard";
import "@testing-library/jest-dom";

const selectedValues = {};
const isCorrect = {};
const updateAnswers = () => {};

describe("TopicPageCard component testing", () => {
  beforeEach(() => {
    render(
      <TopicPageCard
        variant="text"
        updateAnswers={updateAnswers}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
  });

  it("should render the topic page card", () => {
    expect(screen.getByTestId("topic-page-card")).toBeInTheDocument();
  });
});
