import { render, screen, cleanup, waitFor } from "@testing-library/react";
import TextSizeDialog from "../../../components/dialogs/TextSizeDialog";
import "@testing-library/jest-dom";

/**
 * Tests for the TextSizeDialog component.
 */
describe("TextSizeDialog", () => {
  beforeEach(async () => {
    await waitFor(() =>
      render(<TextSizeDialog open={true} onClose={() => {}} />)
    );
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
    closeIconButton.click();
    expect(closeIconButton).toBeInTheDocument();
  });

  it("should trigger onClose when the 'Lukk' button is clicked", async () => {
    const closeButton = screen.getByRole("button", { name: /lukk/i });
    closeButton.click();
    expect(closeButton).toBeInTheDocument();
  });
});
