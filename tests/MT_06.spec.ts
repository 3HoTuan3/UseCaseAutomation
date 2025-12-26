import { test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test.describe("MT-06 Filter Combined Criteria", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login();
    await homePage.openMyTicketTab();
  });

  test("MT-06 Users can filter by combining multiple criteria", async ({
    page,
  }) => {
    const myTicketPage = new MyTicketPage(page);

    // Check điều kiện hiển thị filter
    const count = await myTicketPage.getTicketCount();
    if (count < 6) test.skip();

    await myTicketPage.applyFilter({
      departStation: "Quảng Ngãi",
      arriveStation: "Sài Gòn",
      status: "New",
    });

    await myTicketPage.verifyFilterResult("Quảng Ngãi");
    await myTicketPage.verifyFilterResult("Sài Gòn");
    await myTicketPage.verifyFilterResult("New");
  });
});
