import { describe, expect, it } from "vitest";
import TopicCard from "../../components/TopicCard";
import CookieIcon from "@mui/icons-material/Cookie";

describe("Tests for component TopicCard", () => {
  it("should render TopicCard", () => {
    const cardTitle = "Test card";
    const cardIcon = CookieIcon;
    const difficulty = "ingen";
    const size = "medium";
    const card = TopicCard({ cardTitle, cardIcon, difficulty, size });
    expect(card).toMatchSnapshot();
  });
});
