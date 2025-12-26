import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test.describe("MT-05 Filter Specific Criteria", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login();
    await homePage.openMyTicketTab();
  });

  test("MT-05 Users can filter with a specific criteria", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);

    // Điều kiện tiên quyết: Filter phải hiển thị (>= 6 vé)
    const ticketCount = await myTicketPage.getTicketCount();
    if (ticketCount < 6) test.skip();

    await test.step("Scenario 1: Filter by Status", async () => {
      await myTicketPage.applyFilter({ status: "New" });
      await myTicketPage.verifyFilterResult("New");
    });

    await test.step("Scenario 2: Filter by Depart Station", async () => {
      await page.reload(); // Reset filter
      await myTicketPage.applyFilter({ departStation: "Quảng Ngãi" });
      await myTicketPage.verifyFilterResult("Quảng Ngãi");
    });

    await test.step("Scenario 3: Filter by Arrive Station", async () => {
      await page.reload();
      await myTicketPage.applyFilter({ arriveStation: "Sài Gòn" });
      await myTicketPage.verifyFilterResult("Sài Gòn");
    });

    // Bạn có thể thêm Scenario 4 (Date) và Scenario 5 (No result) tương tự
  });
});
