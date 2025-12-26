import { test, expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  private readonly navBarLogin: Locator;
  private readonly navChangePassword: Locator;
  private readonly navRegister: Locator;
  private readonly navLogout: Locator;
  private readonly navContact: Locator;
  private readonly navFaq: Locator;
  private readonly navTimetable: Locator;
  private readonly navTicketPrice: Locator;
  private readonly navBookTicket: Locator;
  
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
    this.navFaq = this.page.getByRole("link", { name: "FAQ" });
    this.navTimetable = this.page.getByRole("link", { name: "Timetable" });
    this.navTicketPrice = this.page.getByRole("link", { name: "Ticket price" });
    this.navBookTicket = this.page.getByRole("link", { name: "Book ticket" });
  }

  async navigateToHomePage(): Promise<void> {
    await test.step("Navigate to Home Page", async () => {
      await this.page.goto("http://railwayb2.somee.com/Page/HomePage.cshtml");
    });
  }

  async navigateToLogin(): Promise<void> {
    await test.step("Navigate to Login Page", async () => {
      await this.navBarLogin.click();
    });
  }

  async navigateToChangePassword(): Promise<void> {
    await test.step("Navigate to Change Password Page", async () => {
      await this.navChangePassword.click();
    });
  }

  async navigateToRegister(): Promise<void> {
    await test.step("Navigate to Register Page", async () => {
      await this.navRegister.click();
    });
  }

  async navigateToContact(): Promise<void> {
    await test.step("Navigate to Contact Page", async () => {
      await this.navContact.click();
    });
  }

  async navigateToFaq(): Promise<void> {
    await test.step("Navigate to FAQ Page", async () => {
      await this.navFaq.click();
    });
  }

  async navigateToTimetable(): Promise<void> {
    await test.step("Navigate to Timetable Page", async () => {
      await this.navTimetable.click();
    });
  }

  async navigateToTicketPrice(): Promise<void> {
    await test.step("Navigate to Ticket Price Page", async () => {
      await this.navTicketPrice.click();
    });
  }

  async navigateToBookTicket(): Promise<void> {
    await test.step("Navigate to Book Ticket Page", async () => {
      await this.navBookTicket.click();
    });
  }

  async logout(): Promise<void> {
    await test.step("Logout", async () => {
      await this.navLogout.click();
    });
  }

  async shouldWelcomeMsgVisible(email: string): Promise<void> {
    const welcomeMsg = this.page.getByText(`Welcome ${email}`);
    await expect(welcomeMsg).toBeVisible();
  }
}
