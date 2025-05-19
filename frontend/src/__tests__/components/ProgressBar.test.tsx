import ProgressBar from "../../components/ProgressBar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Tests for component ProgressBar component", () => {
  beforeEach(() => {
    render(<ProgressBar value={50} />);
  });

  it("should render ProgressBar with correct value", () => {
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  it("should render ProgressBar with correct text", () => {
    const progressText = screen.getByText(/Progresjon: 50%/i);
    expect(progressText).toBeInTheDocument();
  });
});
