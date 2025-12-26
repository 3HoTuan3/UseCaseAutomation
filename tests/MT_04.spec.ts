import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test.describe("MT-04 Filter Visibility", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login();
    await homePage.openMyTicketTab();
  });

  test("MT-04 Verify filter function visibility based on row count", async ({
    page,
  }) => {
    const myTicketPage = new MyTicketPage(page);
    const ticketCount = await myTicketPage.getTicketCount();

    // Logic kiểm tra theo yêu cầu
    if (ticketCount >= 6) {
      await myTicketPage.shouldFilterVisible(true);
    } else {
      await myTicketPage.shouldFilterVisible(false);
    }
  });
});
