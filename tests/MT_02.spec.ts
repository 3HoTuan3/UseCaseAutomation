import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test.describe("MT-02 View Booked Tickets", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login();
    await homePage.openMyTicketTab();
  });

  test("MT-02 Users can view the booked tickets", async ({ page }) => {
    const myTicketPage = new MyTicketPage(page);
    // Verify bảng hiển thị đúng cấu trúc
    await myTicketPage.shouldTableDisplayProperly();
    // Verify có vé (User has booked 1 or more tickets)
    await myTicketPage.shouldHaveBookedTickets();
  });
});
