import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/LinkHive/);
});

test("has seeded public link", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByText("Google - Public (seeded)")).toBeVisible();
});

test("can login/logout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/auth/**");
  await expect(page.locator("form")).toContainText("Username");
  await page.getByPlaceholder("jsmith").click();
  await page.getByPlaceholder("jsmith").fill("admin");
  await page.getByLabel("Password").fill("admin");
  await page.getByText("Sign In").click({ timeout: 10000 });
  await page.waitForURL("http://localhost:3000");
  await page.getByRole("button").nth(1).click();
  await page.getByRole("heading", { name: "Sign Out" }).click();
});

// TODO
// test("can create a new link", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "Login" }).click();
//   await page.waitForURL("**/auth/**");
//   await expect(page.locator("form")).toContainText("Username");
//   await page.getByPlaceholder("jsmith").click();
//   await page.getByPlaceholder("jsmith").fill("admin");
//   await page.getByLabel("Password").fill("admin");
//   await page.getByText("Sign In").click({ timeout: 10000 });
//   await page.waitForURL("http://localhost:3000");
//   await page.click("div > .px-4");

//   await page.click(".create-link");

//   await page.fill("#:r12:-form-item", "Youtube");

//   await page.click("#:r13:-form-item");

//   await page.fill("#:r13:-form-item", "https://youtube.com");

//   await Promise.all([
//     page.click(".flex-col-reverse > .inline-flex"),
//     page.waitForNavigation(),
//   ]);

//   await Promise.all([
//     page.click('[href="https://youtube.com"]'),
//     page.waitForNavigation(),
//   ]);
// });
