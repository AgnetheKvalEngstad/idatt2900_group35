import { render, screen } from "@testing-library/react";
import InputVariant from "../../../components/variants/InputVariant";
import "@testing-library/jest-dom";

describe("InputVariant", () => {
  const questions = [
    {
      id: 1,
      questionText: "What is 2 + 2?",
      correctAnswer: "4",
      options: [],
      correctOption: "null",
    },
    {
      id: 2,
      questionText: "What is 3 + 3?",
      correctAnswer: "6",
      options: [],
      correctOption: "null",
    },
    {
      id: 3,
      questionText: "What is 4 + 4?",
      correctAnswer: "8",
      options: [],
      correctOption: "null",
    },
    {
      id: 4,
      questionText: "What is 5 + 5?",
      correctAnswer: "10",
      options: [],
      correctOption: "null",
    },
  ];

  const handleButtonClick = () => {};
  const handleInputChange = () => {};
  const selectedValues = {};
  const isCorrect = {};

  beforeEach(() => {
    render(
      <InputVariant
        questions={questions}
        handleButtonClick={handleButtonClick}
        handleInputChange={handleInputChange}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
      />
    );
  });

  it("should render the questions and input fields correctly", () => {
    expect(
      screen.getByText("Skriv inn svaret i feltene under")
    ).toBeInTheDocument();
    questions.forEach((q) => {
      expect(screen.getByText(q.questionText)).toBeInTheDocument();
      const inputs = screen.getAllByLabelText("Svar her");
      expect(inputs.length).toBe(questions.length);
      const submitButtons = screen.getAllByRole("button", {
        name: /sjekk svar/i,
      });
      expect(submitButtons.length).toBe(questions.length);
    });
  });
});
