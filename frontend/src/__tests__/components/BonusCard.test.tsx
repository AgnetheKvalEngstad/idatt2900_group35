import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BonusCard from "../../components/BonusCard";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe("BonusCard component test", () => {
  it("should render BonusCard", () => {
    const cardTitle = "Test card";
    const cardIcon = "cookie";
    const description = "Test description";
    const pointsNeeded = 10;
    const pointsAchieved = 5;

    render(
      <BonusCard
        cardTitle={cardTitle}
        cardIcon={cardIcon}
        description={description}
        pointsNeeded={pointsNeeded}
        pointsAchieved={pointsAchieved}
      />
    );

    expect(screen.getByText(cardTitle)).toBeInTheDocument();
  });

  it("should open dialog on click", async () => {
    const cardTitle = "Test card";
    const cardIcon = "cookie";
    const description = "Test description";
    const pointsNeeded = 10;
    const pointsAchieved = 15;

    render(
      <BonusCard
        cardTitle={cardTitle}
        cardIcon={cardIcon}
        description={description}
        pointsNeeded={pointsNeeded}
        pointsAchieved={pointsAchieved}
      />
    );

    const card = screen.getByText(cardTitle);
    await act(async () => {
      userEvent.click(card);
    });
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
