import { render, screen } from "@testing-library/react";
import MultipleChoiceVariant from "../../../components/variants/MultipleChoiceVariant";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("MultipleChoiceVariant component testing", () => {
  const questions = [
    {
      id: 1,
      questionText: "Hva er hovedstaden i Norge?",
      options: ["Oslo", "København", "Stockholm", "Helsinki"],
      correctOption: "Oslo",
      correctAnswer: "null",
    },
  ];
  const handleButtonClick = () => {};
  const selectedValues = {};
  const isCorrect = {};
  const handleSelectedValueChange = vi.fn();

  beforeEach(() => {
    render(
      <MultipleChoiceVariant
        questions={questions}
        handleButtonClick={handleButtonClick}
        selectedValues={selectedValues}
        isCorrect={isCorrect}
        handleSelectedValueChange={handleSelectedValueChange}
      />
    );
  });

  it("should render the questions and options correctly", () => {
    questions.forEach((q) => {
      expect(screen.getByText(q.questionText)).toBeInTheDocument();
      q.options.forEach((option) => {
        expect(screen.getByText(option)).toBeInTheDocument();
      });
    });
  });

  it("should render the radio buttons correctly", () => {
    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons.length).toBe(questions[0].options.length);
  });

  it("should render the radio button labels correctly", () => {
    questions[0].options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("should render the radio group correctly", () => {
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInTheDocument();
  });

  it("should call handleSelectedValueChange when an option is selected", () => {
    const radioButton = screen.getByLabelText(questions[0].options[0]);
    radioButton.click();
    expect(handleSelectedValueChange).toHaveBeenCalledWith(
      questions[0].id,
      questions[0].options[0]
    );
  });
});
