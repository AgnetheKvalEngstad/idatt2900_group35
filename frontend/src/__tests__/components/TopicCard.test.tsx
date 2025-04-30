import { describe, expect, it } from "vitest";
import TopicCard from "../../components/TopicCard";

describe("Tests for component TopicCard", () => {
  it("should render TopicCard", () => {
    const cardTitle = "Test card";
    const cardIcon = "cookie";
    const difficulty = "ingen";
    const size = "medium";
    const card = TopicCard({ cardTitle, cardIcon, difficulty, size });
    expect(card).toMatchSnapshot();
  });
});
