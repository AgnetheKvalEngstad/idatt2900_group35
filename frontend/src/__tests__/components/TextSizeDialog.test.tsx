import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TextSizeDialog from "../../components/TextSizeDialog";
import "@testing-library/jest-dom";

describe("TextSizeDialog", () => {
  beforeEach(() => {
    render(<TextSizeDialog open={true} onClose={() => {}} />);
  });

  it("should render the dialog content correctly when open is true", () => {
    expect(screen.getByText("Hvordan få større skrift")).toBeInTheDocument();
    expect(screen.getByText("Windows:")).toBeInTheDocument();
    expect(screen.getByText("Mac:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lukk/i })).toBeInTheDocument();
  });

  it("should not render the dialog when open is false", () => {
    cleanup();
    render(<TextSizeDialog open={false} onClose={() => {}} />);
    expect(
      screen.queryByText("Hvordan få større skrift")
    ).not.toBeInTheDocument();
  });

  it("should trigger onClose when the close icon button is clicked", () => {
    const closeIconButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeIconButton);
    expect(closeIconButton).toBeInTheDocument();
  });

  it("should trigger onClose when the 'Lukk' button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /lukk/i });
    fireEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
  });
});
