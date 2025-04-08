import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfilePage from "../../pages/ProfilePage";

describe("ProfilePage component test", () => {
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
    await act(async () => {
      userEvent.click(deleteButton);
    });

    expect(
      screen.getByText("Er du sikker på at du vil slette dataene dine?")
    ).toBeInTheDocument();
  });

  it("should render all topic cards", () => {
    const topicCards = screen.getAllByText("Insert title here");
    expect(topicCards).toHaveLength(6);
  });
});
