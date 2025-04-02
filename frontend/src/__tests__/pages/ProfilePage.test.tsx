import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfilePage from "../../pages/ProfilePage";

describe("ProfilePage compontent test", () => {
  beforeEach(() => {
    render(<ProfilePage />);
  });

  it("should render title", () => {
    expect(screen.getByText("Min side")).toBeInTheDocument();
  });

  it("should render the delete button", () => {
    expect(screen.getByText("Slett min data")).toBeInTheDocument();
  });

  it("should render completed topics card", () => {
    expect(screen.getByText("Fullførte temaer")).toBeInTheDocument();
  });

  it("should open the delete dialog when the delete button is clicked", async () => {
    const deleteButton = screen.getByText("Slett min data");
    userEvent.click(deleteButton);

    expect(
      screen.getByText("Er du sikker på at du vil slette dataene dine?")
    ).toBeInTheDocument();
  });
});
