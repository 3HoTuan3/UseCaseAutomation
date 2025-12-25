import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  private readonly navBarLogin: Locator;
  private readonly navChangePassword: Locator;
  private readonly navRegister: Locator;
  private readonly navLogout: Locator;
  private readonly navContact: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.navBarLogin = this.page.getByRole("link", {
      name: "Login",
    });
    this.navChangePassword = this.page.getByRole("link", {
      name: "Change password",
    });
    this.navRegister = this.page.getByRole("link", { name: "Register" });
    this.navContact = this.page.getByRole("link", { name: "Contact" });
    this.navLogout = this.page.getByRole("link", { name: "Log out" });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");
  }

  async navigateToLogin(): Promise<void> {
    await this.navBarLogin.click();
  }

  async navigateToChangePassword(): Promise<void> {
    await this.navChangePassword.click();
  }

  async navigateToRegister(): Promise<void> {
    await this.navRegister.click();
  }

  async navigateToContact(): Promise<void> {
    await this.navContact.click();
  }

  async logout(): Promise<void> {
    await this.navLogout.click();
  }

  // Thay đổi: nhận email (tuỳ chọn) và kiểm tra welcome message
  async shouldWelcomeMsgVisible(email: string): Promise<void> {
    const welcomeMsg = this.page.getByText(`Welcome ${email}`);
    await expect(welcomeMsg).toBeVisible();
  }
}
