import { faker } from '@faker-js/faker';
import test from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";

test('REG_01 - Register new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    const email = faker.internet.email();
    const password = faker.internet.password();
    const PID = faker.string.numeric(9);

    await homePage.navigateToHomePage();
    await homePage.navigateToRegister();
    await registerPage.register(email, password, password, PID);
    await registerPage.checkRegisterSuccess();
});