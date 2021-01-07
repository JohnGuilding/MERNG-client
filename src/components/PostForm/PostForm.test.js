import React from "react";
import { render } from "@testing-library/react";
import PostForm from "./PostForm";

describe("PostForm tests", () => {
  it("should render", () => {
    expect(render(<PostForm />)).toBeTruthy();
  });
});
