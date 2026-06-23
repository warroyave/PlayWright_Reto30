import {expect, test} from '@playwright/test';
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from '../components/SidePanel';
console.clear();

test('login orange hrm', async ({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.SEARCH)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.TIME)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)


    /*await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
    await expect(page.getByRole('heading',{name: 'Dashboard'})).toBeVisible()*/
})

test('Error en Login Orange hrm', async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin1234')
    
    await expect(page.locator("text=Invalid credentials")).toBeVisible();

})