import { describe, expect, it } from "vitest";
import TopicMenu from "../../components/TopicMenu";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

describe("Tests for component TopicMenu", () => {
  it("should render TopicMenu", () => {
    const difficulty = "ingen";
    const index = 0;
    const onButtonClick = (i: number) => i;
    const topicMenu = TopicMenu({ difficulty, index, onButtonClick });
    expect(topicMenu).toMatchSnapshot();
  });

  it("should render three buttons ", () => {
    const difficulty = "ingen";
    const index = 0;
    const onButtonClick = (i: number) => i;
    const topicMenu = TopicMenu({ difficulty, index, onButtonClick });
    expect(topicMenu.props.children).toHaveLength(3);
  });

  it("should render the first button with the correct icon", () => {
    const difficulty = "ingen";
    const index = 0;
    const onButtonClick = (i: number) => i;
    const topicMenu = TopicMenu({ difficulty, index, onButtonClick });
    expect(topicMenu.props.children[0].props.startIcon).toEqual(
      <MenuBookRoundedIcon />
    );
  });

  it("should render the third button with the correct icon", () => {
    const difficulty = "ingen";
    const index = 0;
    const onButtonClick = (i: number) => i;
    const topicMenu = TopicMenu({ difficulty, index, onButtonClick });
    expect(topicMenu.props.children[2].props.startIcon).toEqual(
      <CreateOutlinedIcon />
    );
  });
});
