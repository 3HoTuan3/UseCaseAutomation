import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("HOM_01 - User Navigation When Not Logged In", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Should navigate to FAQ from Home", async ({ page }) => {
    await test.step("Navigate to FAQ from Home", async () => {
      await homePage.navigateToFaq();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify FAQ page loaded", async () => {
      await expect(page).toHaveURL(/FAQ/i);
    });
  });

  test("Should navigate to Contact from Home", async ({ page }) => {
    await test.step("Navigate to Contact from Home", async () => {
      await homePage.navigateToContact();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Contact page loaded", async () => {
      await expect(page).toHaveURL(/Contact/i);
    });

    await test.step("Return to Home Page", async () => {
      await homePage.navigateToHomePage();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify back on Home page", async () => {
      await expect(page).toHaveURL(/HomePage/i);
    });
  });

  test("Should navigate to Timetable from Home", async ({ page }) => {
    await test.step("Navigate to Timetable from Home", async () => {
      await homePage.navigateToTimetable();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Timetable page loaded", async () => {
      await expect(page).toHaveURL(/TrainTimeListPage/i);
    });

    await test.step("Return to Home Page", async () => {
      await homePage.navigateToHomePage();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify back on Home page", async () => {
      await expect(page).toHaveURL(/HomePage/i);
    });
  });

  test("Should navigate to Ticket Price from Home", async ({ page }) => {
    await test.step("Navigate to Ticket Price from Home", async () => {
      await homePage.navigateToTicketPrice();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Ticket Price page loaded", async () => {
      await expect(page).toHaveURL(/TrainPriceListPage/i);
    });

    await test.step("Return to Home Page", async () => {
      await homePage.navigateToHomePage();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify back on Home page", async () => {
      await expect(page).toHaveURL(/HomePage/i);
    });
  });

  test("Should navigate to Book Ticket from Home", async ({ page }) => {
    await test.step("Navigate to Book Ticket from Home", async () => {
      await homePage.navigateToBookTicket();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Book Ticket page loaded", async () => {
      await expect(page).toHaveURL(/BookTicket/i);
    });

    await test.step("Return to Home Page", async () => {
      await homePage.navigateToHomePage();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify back on Home page", async () => {
      await expect(page).toHaveURL(/HomePage/i);
    });
  });

  test("Should navigate to Register from Home", async ({ page }) => {
    await test.step("Navigate to Register from Home", async () => {
      await homePage.navigateToRegister();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Register page loaded", async () => {
      await expect(page).toHaveURL(/Register/i);
    });

    await test.step("Return to Home Page", async () => {
      await homePage.navigateToHomePage();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify back on Home page", async () => {
      await expect(page).toHaveURL(/HomePage/i);
    });
  });

  test("Should navigate to Login from Home", async ({ page }) => {
    await test.step("Navigate to Login from Home", async () => {
      await homePage.navigateToLogin();
      await page.waitForLoadState("networkidle");
    });

    await test.step("Verify Login page loaded", async () => {
      await expect(page).toHaveURL(/Login/i);
    });
  });
});
