import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test.describe("MT-03 Cancel Tickets", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login();
    await homePage.openMyTicketTab();
  });

  test("MT-03 Users can cancel tickets", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);
    const count = await myTicketPage.getTicketCount();

    if (count > 0) {
      // Click cancel ở dòng đầu tiên (index 0)
      await myTicketPage.cancelTicket(0);
    } else {
      test.skip(); // Bỏ qua nếu không có vé để hủy
    }
  });
});
