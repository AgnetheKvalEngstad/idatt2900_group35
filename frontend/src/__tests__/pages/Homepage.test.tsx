import { describe, expect, it } from "vitest";
import Homepage from "../../pages/Homepage";

describe("Tests for Homepage component", () => {
  it("should render Homepage", () => {
    const homepage = Homepage();
    expect(homepage).toMatchSnapshot();
  });
});
