import { test } from "@playwright/test";
import { FaqPage } from "../pages/faq.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("FAQ-02 - Verify links work properly", async ({ page }) => {
  const faqPage = new FaqPage(page);
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const user = new User();

  await test.step("Login to Railway", async () => {
    await homePage.navigateToHomePage();
    await homePage.navigateToLogin();
    await loginPage.login(user);
    await homePage.shouldWelcomeMsgVisible(user.username);
  });

  await test.step("Click on FAQ menu in navigation bar", async () => {
    await homePage.navigateToFaq();
    await faqPage.verifyFaqPageLoaded();
  });

  await test.step("Click on links and repeat for all questions", async () => {
    await faqPage.clickAllFaqQuestionsAndVerify();
  });
});
