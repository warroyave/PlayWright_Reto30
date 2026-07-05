import { expect, Locator, Page } from "@playwright/test";
import { UserModel } from "../models/UserModel";
// RETO 16
export class AddNewUserPage {

    readonly page: Page;

    readonly addButton: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly employeeInput: Locator;

    constructor(page: Page) {

        this.page = page;

        this.addButton = page.getByText('Add');

        this.saveButton = page.getByRole('button', {
            name: 'Save'
        });

        this.successMessage = page.getByText('Successfully Saved');

        this.employeeInput = page.getByRole('textbox', {
            name: 'Type for hints...'
        });

        this.usernameInput = this.inputByLabel('Username');

        this.passwordInput = this.inputByLabel('Password');

        this.confirmPasswordInput = this.inputByLabel('Confirm Password');
    }

    /**
     * Obtiene un textbox a partir de su etiqueta.
     */
    private inputByLabel(label: string): Locator {
        return this.page
            .locator('div.oxd-grid-item--gutters')
            .filter({
                has: this.page.getByText(label, { exact: true })
            })
            .getByRole('textbox');
    }

    /**
     * Selecciona una opción de un dropdown.
     */
    private async selectDropdown(label: string, option: string): Promise<void> {

        await this.page
            .locator('div.oxd-grid-item--gutters')
            .filter({
                has: this.page.getByText(label, { exact: true })
            })
            .locator('.oxd-select-text-input')
            .click();

        await this.page.getByText(option, { exact: true }).click();
    }

    async clickOnAdd(): Promise<void> {
        await this.addButton.click();
    }

    async selectUserRole(role: string): Promise<void> {
        await this.selectDropdown('User Role', role);
    }

    async selectEmployeeName(employeeName: string): Promise<void> {

        await this.employeeInput.fill(employeeName);

        const employeeOption = this.page
            .locator('.oxd-autocomplete-option')
            .filter({
                hasText: employeeName
            })
            .first();

        await expect(employeeOption).toBeVisible();

        await employeeOption.click();
    }

    async selectStatus(status: string): Promise<void> {
        await this.selectDropdown('Status', status);
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(password: string): Promise<void> {
        await this.confirmPasswordInput.fill(password);
    }

    async clickOnSave(): Promise<void> {
        await this.saveButton.click();
    }

    /**
     * Nuevo nombre recomendado.
     */
    async verifyUserWasAdded(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
    }

    /**
     * Alias para mantener compatibilidad con los tests existentes.
     */
    async checkuserWassAddMessage(): Promise<void> {
        await this.verifyUserWasAdded();
    }
    // Reto 17
    async addNewUser(user: UserModel){
        await this.clickOnAdd()
        await this.selectUserRole(user.role)
        await this.selectEmployeeName(user.employeeName)
        await this.selectStatus(user.status)
        await this.enterUsername(user.username)
        await this.enterPassword(user.password)
        await this.enterConfirmPassword(user.confirmPassword)
        await this.clickOnSave()
    }
 
}