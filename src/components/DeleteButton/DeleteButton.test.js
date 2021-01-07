import React from "react";
import { render } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButton tests", () => {
  it("should render", () => {
    expect(render(<DeleteButton />)).toBeTruthy();
  });
});
