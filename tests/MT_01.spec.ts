import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { MyTicketPage } from "../pages/myticket.page";

test("MT-01 UI of My Ticket tab displays properly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const myTicketPage = new MyTicketPage(page);
  const user = new User();
  
  await homePage.navigateToHomePage();
  await homePage.navigateToLogin();
  await loginPage.login();


  await homePage.openMyTicketTab();

  await myTicketPage.shouldTableDisplayProperly();
});
