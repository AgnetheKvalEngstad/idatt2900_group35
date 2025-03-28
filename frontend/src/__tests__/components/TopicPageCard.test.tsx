import { render, screen } from "@testing-library/react";
import TopicPageCard from "../../components/TopicPageCard";
import "@testing-library/jest-dom";

describe("TopicPageCard component testing", () => {
  it("should render the topic page card", () => {
    render(<TopicPageCard variant="text" />);
    expect(screen.getByTestId("topic-page-card")).toBeInTheDocument();
  });
});
