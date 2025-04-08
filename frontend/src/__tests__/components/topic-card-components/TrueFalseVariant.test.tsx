import { render, screen } from "@testing-library/react";
import TrueFalseVariant from "../../../components/topic-card-variants/TrueFalseVariant";
import "@testing-library/jest-dom";

describe("TrueFalseVariant component testing", () => {
  const questions = [
    { id: 1, question: "Is the sky blue?", correctAnswer: true },
    { id: 2, question: "Is fire cold?", correctAnswer: false },
    { id: 3, question: "Is the earth flat?", correctAnswer: false },
    { id: 4, question: "Is water wet?", correctAnswer: true },
    { id: 5, question: "Is the sun hot?", correctAnswer: true },
    { id: 6, question: "Is the moon made of cheese?", correctAnswer: false },
    { id: 7, question: "Is the ocean salty?", correctAnswer: true },
    { id: 8, question: "Is the grass green?", correctAnswer: true },
    { id: 9, question: "Is the wind cold?", correctAnswer: false },
    { id: 10, question: "Is the snow black?", correctAnswer: false },
    { id: 11, question: "Is the snow white?", correctAnswer: true },
  ];

  const handleButtonClick = () => {};
  const selectedValues = {};
  const isCorrect = {};

  beforeEach(() => {
    render(
      <TrueFalseVariant
        questions={questions}
        handleButtonClick={handleButtonClick}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
  });

  it("should render the questions and true/false buttons correctly", () => {
    questions.forEach((q) => {
      expect(screen.getByText(q.question)).toBeInTheDocument();
    });

    const trueButtons = screen.getAllByRole("true");
    const falseButtons = screen.getAllByRole("false");

    expect(trueButtons.length).toBe(questions.length);
    expect(falseButtons.length).toBe(questions.length);
  });
});
