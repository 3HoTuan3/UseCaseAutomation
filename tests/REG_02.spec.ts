import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { faker } from "@faker-js/faker";

test('REG_02 - Error when registering with an existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password();
    const PID = faker.string.numeric(9);

    await homePage.navigateToHomePage();
    await homePage.navigateToRegister();

    // 1) register first time
    await registerPage.register(email, password, password, PID);
    await registerPage.checkRegisterSuccess();

    // 2) try to register again with same email
    await homePage.navigateToRegister();
    await registerPage.register(email, password, password, PID);

    // assert error shown
    const err = await registerPage.getRegisterAlreadyUseText();
    expect(err).toMatch(/already|exists|in use/i);
});