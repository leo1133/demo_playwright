import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("Login successfully", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("checkbox", { name: "Remember me" }).check();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/admin/);
  });

  test("Login with unregistered email", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("notexist@example.com");

    await page.getByRole("textbox", { name: "Password" }).fill("123456");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("Login with empty email and password", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page.getByRole("textbox", { name: "Email Address" }).fill("");
    await page.getByRole("textbox", { name: "Password" }).fill("");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("The Email Address field is required."),
    ).toBeVisible();

    await expect(
      page.getByText("The Password field is required."),
    ).toBeVisible();
  });

  test("Login with wrong email", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("Login with wrong password", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("12345678");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
