import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "@/components/atoms/Label";

describe("Label", () => {
  it("renderiza o texto e associa via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email-input">email</Label>
        <input id="email-input" />
      </>
    );

    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });
});
