import { render, screen } from "@testing-library/react";
import TrueFalseVariant from "../../../components/variants/TrueFalseVariant";
import "@testing-library/jest-dom";

describe("TrueFalseVariant component testing", () => {
  const questions = [
    {
      id: 1,
      questionText: "Is the sky blue?",
      correctAnswer: "true",
      options: [],
      correctOption: "null",
    },
    {
      id: 2,
      questionText: "Is the grass green?",
      correctAnswer: "true",
      options: [],
      correctOption: "null",
    },
    {
      id: 3,
      questionText: "Is fire cold?",
      correctAnswer: "false",
      options: [],
      correctOption: "null",
    },
    {
      id: 4,
      questionText: "Is water dry?",
      correctAnswer: "false",
      options: [],
      correctOption: "null",
    },
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
      expect(screen.getByText(q.questionText)).toBeInTheDocument();
    });

    const trueButtons = screen.getAllByRole("true");
    const falseButtons = screen.getAllByRole("false");

    expect(trueButtons.length).toBe(questions.length);
    expect(falseButtons.length).toBe(questions.length);
  });
});
