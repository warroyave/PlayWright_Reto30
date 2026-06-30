import {expect, test} from "@playwright/test"
import { LoginPage } from "../pageobjects/LoginPage";
console.clear();

test('Get all the usernames registered', async ({page}) =>{
        
    /*const loginPage = new LoginPage(page)
        await loginPage.loginAsAdmin()*/

        await page.goto('/web/index.php/dashboard/index')
    
        await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
        
        await page.getByRole('link', {name: 'Admin'}).click()
        await page.getByRole('navigation',{name: 'topbar menu'}).getByText('User Management').click()
        await page.getByRole('menuitem', {name: 'Users'}).click

        //await page.pause()

        const rows = page.getByRole('table').getByRole('row')
        const usernames: string[] = []

        const rowCount = await rows.count()

        for (let i = 1; i < rowCount; i++){
            const cell = rows.nth(i).getByRole('cell').nth(3)
            const username = await cell.textContent()

            if (username){
                usernames.push(username)
            }
        }

        console.log(usernames)

})