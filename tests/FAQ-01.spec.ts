import { test } from "@playwright/test";
import { FaqPage } from "../pages/faq.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { User } from "../models/user";

test("FAQ-01 - Verify FAQ page displays correctly", async ({ page }) => {
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
  });

  await test.step("Observe the page content", async () => {
    await faqPage.verifyFaqPageLoaded();
    await faqPage.shouldFaqTitleVisible();
    await faqPage.shouldFaqQuestionsVisible();
    await faqPage.shouldFaqAnswersVisible();
  });
});
