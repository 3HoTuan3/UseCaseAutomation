import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

test('Verify navigation to Login page from Home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const email = 'cijnuj@ramcloud.us';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');

    await homePage.navigateToLogin();
    await loginPage.login(email, '123456789'); 
    await homePage.shouldWelcomeMsgVisible(email);
});