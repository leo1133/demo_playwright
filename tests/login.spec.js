import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  // Kiểm tra khi nhập dữ liệu vào trường email
  // Nhập email là chữ
  test("Email allows alphabetic characters", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Email Address" }).fill("admin");
    await expect(
      page.getByRole("textbox", { name: "Email Address" }),
    ).toHaveValue("admin");
  });
  // Nhập email là số
  test("Email allows number characters", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Email Address" }).fill("123456");
    await expect(
      page.getByRole("textbox", { name: "Email Address" }),
    ).toHaveValue("123456");
  });

  // Email có khoảng trắng
  test("Email with spaces", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("  admin@example.com  ");
    await expect(
      page.getByRole("textbox", { name: "Email Address" }),
    ).toHaveValue("admin@example.com");
  });

  // Email có ký tự đặc biệt
  test("Email with special characters", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("!@#$%^&*()");
    await expect(
      page.getByRole("textbox", { name: "Email Address" }),
    ).toHaveValue("!@#$%^&*()");
  });

  // Kiểm tra khi nhập dữ liệu vào trường password
  // Nhập chữ
  test("Password allows alphabetic characters and is masked", async ({
    page,
  }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "password",
    ); // Verify password được nhập đúng
    await expect(
      page.getByRole("textbox", { name: "Password" }),
    ).toHaveAttribute("type", "password"); // Verify password được mask
  });
  // Nhập số
  test("Password allows number characters and is masked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "123456",
    );
    await expect(
      page.getByRole("textbox", { name: "Password" }),
    ).toHaveAttribute("type", "password");
  });
  // Password có khoảng trắng
  test("Password with spaces and is masked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Password" }).fill("pass word");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "pass word",
    );
    await expect(
      page.getByRole("textbox", { name: "Password" }),
    ).toHaveAttribute("type", "password");
  });
  // Password có ký tự đặc biệt
  test("Password with special characters and is masked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Password" }).fill("!@#$%^&*()");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "!@#$%^&*()",
    );
    await expect(
      page.getByRole("textbox", { name: "Password" }),
    ).toHaveAttribute("type", "password");
  });
  // Password có khoảng trắng đầu cuối
  test("Password with spaces at the beginning and end and is masked", async ({
    page,
  }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("textbox", { name: "Password" }).fill("  password  ");
    await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
      "  password  ",
    );
    await expect(
      page.getByRole("textbox", { name: "Password" }),
    ).toHaveAttribute("type", "password");
  });

  // Kiểm tra checkbox Remember me
  // Kiểm tra trạng thái mặc định
  test("Remember Me checkbox should be unchecked by default", async ({
    page,
  }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await expect(
      page.getByRole("checkbox", { name: "Remember me" }),
    ).not.toBeChecked();
  });

  // Kiểm tra trạng thái checked
  test("Remember Me checkbox should be checked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("checkbox", { name: "Remember me" }).check();
    await expect(
      page.getByRole("checkbox", { name: "Remember me" }),
    ).toBeChecked();
  });

  // Kiểm tra trạng thái uncheck
  test("Remember Me checkbox should be unchecked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("checkbox", { name: "Remember me" }).check();
    await expect(
      page.getByRole("checkbox", { name: "Remember me" }),
    ).toBeChecked();
    await page.getByRole("checkbox", { name: "Remember me" }).uncheck();
    await expect(
      page.getByRole("checkbox", { name: "Remember me" }),
    ).not.toBeChecked();
  });
  // Email và Password đều để trống
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

  // Sai email
  test("Login with wrong email", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  // Sai password
  test("Login with wrong password", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");

    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("12345678");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  // Đăng nhập thành công và tick vào ô Remember me
  test("Check login with checkbox Remember me = checked", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("checkbox", { name: "Remember me" }).check();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/admin/);
  });

  // Đăng nhập thành công và bỏ tick ô Remember me
  test("Check login with checkbox Remember me = unchecked", async ({
    page,
  }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page
      .getByRole("textbox", { name: "Email Address" })
      .fill("admin@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("123456");
    await page.getByRole("checkbox", { name: "Remember me" }).uncheck();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/admin/);
  });

  // Click vào hyperlink Forgot password
  test("Check when click button Forgot password", async ({ page }) => {
    await page.goto("https://crm.anhtester.com/admin/authentication");
    await page.getByRole("link", { name: "Forgot Password?" }).click();
    await expect(
      page.getByRole("heading", { name: "Forgot Password" }),
    ).toBeVisible();
  });
});
