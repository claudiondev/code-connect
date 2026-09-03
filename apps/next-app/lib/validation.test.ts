import { describe, expect, it } from "vitest";
import { isValidEmail, MIN_PASSWORD_LENGTH } from "@/lib/validation";

describe("isValidEmail", () => {
  it("aceita um email com formato válido", () => {
    expect(isValidEmail("dev@example.com")).toBe(true);
  });

  it("rejeita strings sem @ ou domínio", () => {
    expect(isValidEmail("nao-e-email")).toBe(false);
    expect(isValidEmail("dev@example")).toBe(false);
  });
});

describe("MIN_PASSWORD_LENGTH", () => {
  it("é 8", () => {
    expect(MIN_PASSWORD_LENGTH).toBe(8);
  });
});
