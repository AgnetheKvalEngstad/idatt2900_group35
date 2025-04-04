import { describe, expect, it, beforeEach } from "vitest";
import TopicMenu from "../../components/TopicMenu";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { JSX } from "react";

describe("Tests for component TopicMenu", () => {
  let difficulty: string;
  let index: number;
  let onButtonClick: (i: number) => number;
  let menuItems: { title: string; icon: JSX.Element }[];
  let topicMenu: JSX.Element;

  beforeEach(() => {
    difficulty = "ingen";
    index = 0;
    onButtonClick = (i: number) => i;
    menuItems = [
      { title: "Subtopic 1", icon: <MenuBookRoundedIcon /> },
      { title: "Subtopic 2", icon: <MenuBookRoundedIcon /> },
      { title: "Subtopic 3", icon: <CreateOutlinedIcon /> },
    ];
    topicMenu = TopicMenu({
      difficulty,
      index,
      onButtonClick,
      menuItems,
    });
  });

  it("should render TopicMenu", () => {
    expect(topicMenu).toMatchSnapshot();
  });

  it("should render three buttons", () => {
    expect(topicMenu.props.children).toHaveLength(3);
  });

  it("should render the first button with the correct icon", () => {
    expect(topicMenu.props.children[0].props.startIcon).toEqual(
      <MenuBookRoundedIcon />
    );
  });

  it("should render the third button with the correct icon", () => {
    expect(topicMenu.props.children[2].props.startIcon).toEqual(
      <CreateOutlinedIcon />
    );
  });
});
