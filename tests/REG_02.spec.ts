import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";

test('REG_02 - Error when registering with an existing email', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const email = `hotuan${Date.now()}@gmail.com`;
    const password = '123456789';

    await page.goto('http://railwayb2.somee.com/Page/HomePage.cshtml');

    // 1) register first time (should succeed)
    await page.getByRole('link', { name: 'Register' }).click();
    await registerPage.register(email, password, password, '123456789');
    await registerPage.checkRegisterSuccess();

    // 2) try to register again with same email
    await page.getByRole('link', { name: 'Register' }).click();
    await registerPage.register(email, password, password, '123456789');

    // assert error shown
    const err = await registerPage.getRegisterAlreadyUseText();
    expect(err).toMatch(/already|exists|in use/i);
});