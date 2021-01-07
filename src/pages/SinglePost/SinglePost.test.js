import React from "react";
import { render } from "@testing-library/react";
import SinglePost from "./SinglePost";

describe("SinglePost tests", () => {
  it("should render", () => {
    expect(render(<SinglePost />)).toBeTruthy();
  });
});
