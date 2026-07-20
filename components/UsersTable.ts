import {Page, expect, Locator} from "@playwright/test";
//Reto 20
export class UsersTable {

    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    private getAllBodyRows(): Locator {
        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    }

    private getAdminRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        // Filas que contienen el rol Admin
        const currentAdminRows= allBodyRows.filter({
            has:this.page.getByRole('cell').nth(2).getByText('Admin')
        })
        return currentAdminRows
    }

    private async getFirstAdminFromTable(): Promise<Locator> {
        const currentAdminRows = this.getAdminRows()
        const firstAdminToSearch = currentAdminRows.nth(0)
        await expect(firstAdminToSearch, 'No admin users found in the table.').toHaveCount(1)
        return firstAdminToSearch
    }

    async editFirstAdminOnTheTable(): Promise<void> {
        const frstAdminToEdit = await this.getFirstAdminFromTable()

        await frstAdminToEdit
            .locator('button')
            .filter({has: this.page.locator('i.bi-pencil-fill') }).click()

    }
    async clickOnDeleteActionByUsername(username: string){
        const allBodyRows = this.getAllBodyRows()

        const filteredRowsByusername = allBodyRows.filter(
            {
                has: this.page.getByRole('cell').nth(1).getByText(username)
            }
        )
        expect(filteredRowsByusername, `No rows contain username: ${username} were found`).toHaveCount(1)
        
        await filteredRowsByusername
        .locator('button')
        .filter({has: this.page.locator('i.bi-trash')})
        .click()

    }

    async acceptDeleteUser(){
        await this.page.getByRole('button', {name: /Yes, Delete/}).click()

    }

    async cancelDeleteUser(): Promise<void> {
        await this.page.getByRole('button', { name: /No, Cancel/ }).click();
    }
    
}