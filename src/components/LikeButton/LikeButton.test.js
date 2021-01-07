import React from "react";
import { render } from "@testing-library/react";
import LikeButton from "./LikeButton";

describe("LikeButton tests", () => {
  it("should render", () => {
    expect(render(<LikeButton />)).toBeTruthy();
  });
});
