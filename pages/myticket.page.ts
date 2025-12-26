import { expect, Locator, Page, test } from "@playwright/test";

export class MyTicketPage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly ticketTable: Locator;
  private readonly filterArea: Locator;
  private readonly btnApplyFilter: Locator;
  private readonly usernameTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly loginBtn: Locator;

  // Filter Inputs
  private readonly inputDepartStation: Locator;
  private readonly inputArriveStation: Locator;
  private readonly inputDepartDate: Locator;
  private readonly selectStatus: Locator; // Giả định status là dropdown

  constructor(page: Page) {
    this.page = page;
    this.usernameTxt = this.page.getByLabel("Email");
    this.passwordTxt = this.page.getByLabel("Password");
    this.loginBtn = this.page.getByRole("button", { name: "login" });
    this.header = this.page.locator("h1"); // Hoặc locator chính xác của header "Manage ticket"
    this.ticketTable = this.page.locator("table.MyTable");
    this.filterArea = this.page.locator(".filter"); // Class bao quanh vùng filter

    // Selector cho Filter (Cần inspect thực tế để map đúng name/id)
    this.inputDepartStation = this.page.locator(
      "input[name='FilterDpStation']",
    );
    this.inputArriveStation = this.page.locator(
      "input[name='FilterArStation']",
    );
    this.inputDepartDate = this.page.locator("input[name='FilterDpDate']");
    this.selectStatus = this.page.locator("select[name='FilterStatus']");
    this.btnApplyFilter = this.page.locator("input[value='Apply Filter']");
  }

  async shouldMyTicketPageVisible(): Promise<void> {
    await expect(this.header).toContainText("Manage ticket");
  }

  async getTicketCount(): Promise<number> {
    // Đếm số dòng tr trong tbody, trừ header
    return (await this.ticketTable.locator("tr").count()) - 1;
  }

  async shouldTableDisplayProperly(): Promise<void> {
    await test.step("Verify Ticket table is visible and structured correctly", async () => {
      await expect(this.ticketTable).toBeVisible();
      // Check header columns exist
      await expect(this.ticketTable.locator("th").first()).toBeVisible();
    });
  }

  async shouldHaveBookedTickets(): Promise<void> {
    await test.step("Verify that the user has booked tickets", async () => {
      const count = await this.getTicketCount();
      expect(count).toBeGreaterThan(0);
    });
  }

  // Action: Cancel Ticket
  async cancelTicket(rowIndex: number): Promise<void> {
    await test.step(`Click 'Cancel' button at row ${rowIndex}`, async () => {
      // Setup listener cho dialog confirm trước khi click
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });

      // Tìm nút Cancel ở dòng thứ rowIndex (cộng 1 vì dòng 0 là header)
      const btnCancel = this.ticketTable
        .locator("tr")
        .nth(rowIndex + 1)
        .getByRole("button", { name: "Cancel" });
      await btnCancel.click();
    });
  }

  // Action: Delete Ticket
  async deleteTicket(rowIndex: number): Promise<void> {
    await test.step(`Click 'Delete' button at row ${rowIndex}`, async () => {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      const btnDelete = this.ticketTable
        .locator("tr")
        .nth(rowIndex + 1)
        .getByRole("button", { name: "Delete" });
      await btnDelete.click();
    });
  }

  // Filter Logic
  async shouldFilterVisible(isVisible: boolean): Promise<void> {
    await test.step(`Verify Filter section visibility is ${isVisible}`, async () => {
      if (isVisible) {
        await expect(this.filterArea).toBeVisible();
      } else {
        await expect(this.filterArea).toBeHidden();
      }
    });
  }

  async applyFilter(criteria: {
    departStation?: string;
    arriveStation?: string;
    departDate?: string;
    status?: string;
  }): Promise<void> {
    await test.step(`Apply filter with criteria: ${JSON.stringify(criteria)}`, async () => {
      if (criteria.departStation)
        await this.inputDepartStation.fill(criteria.departStation);
      if (criteria.arriveStation)
        await this.inputArriveStation.fill(criteria.arriveStation);
      if (criteria.departDate)
        await this.inputDepartDate.fill(criteria.departDate);
      if (criteria.status)
        await this.selectStatus.selectOption({ label: criteria.status }); // Hoặc value tuỳ HTML

      await this.btnApplyFilter.click();
    });
  }

  async verifyFilterResult(expectedValue: string): Promise<void> {
    await test.step(`Verify table rows contain text: "${expectedValue}"`, async () => {
      const rows = this.ticketTable.locator("tr");
      const count = await rows.count();

      // Nếu không có kết quả (chỉ có header)
      if (count <= 1) {
        console.log("No result found matching criteria.");
        return;
      }

      // Kiểm tra 5 dòng đầu tiên (để tiết kiệm thời gian) hoặc tất cả
      for (let i = 1; i < count; i++) {
        await expect(rows.nth(i)).toContainText(expectedValue);
      }
    });
  }

  async verifyTicketInfoAtRow(index: number, info: string): Promise<void> {
    await expect(this.ticketTable.locator("tr").nth(index + 1)).toContainText(
      info,
    );
  }

  // Tìm dòng có nút Delete (nghĩa là vé đã Expired/Cancelled)
  async findIndexOfExpiredTicket(): Promise<number> {
    const rows = await this.ticketTable.locator("tr").count();
    for (let i = 1; i < rows; i++) {
      const row = this.ticketTable.locator("tr").nth(i);
      // Kiểm tra xem dòng đó có nút Delete không, hoặc status là Expired
      if (await row.getByRole("button", { name: "Delete" }).isVisible()) {
        return i - 1; // Trả về index logic (0-based)
      }
    }
    return -1;
  }
}
