import {expect, test} from '@playwright/test';
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from '../components/SidePanel';
console.clear();

//Test para usuario ADMIN
test('Login orange hrm', async ({page}) => {

    /*const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    const sidePanel = new SidePanel(page)
    // await sidePanel.clickOnOption(SideMenuOption.SEARCH)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.TIME)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)


    /*await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
    await expect(page.getByRole('heading',{name: 'Dashboard'})).toBeVisible()*/
})
// Test para credenciales invalidas
test('Error en Login Orange hrm', async ({ page }) => {
    await page.goto('/web/index.php/auth/login');

    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdminError();

    await expect(
        page.getByText('Invalid credentials')
    ).toBeVisible();
});

// Test para usuario como Empleado
test('Login Orange hrm con usuario empleado', async({page})=>{

    /*const loginPage = new LoginPage(page)
    await loginPage.loginAsEmployee()*/

    await page.goto("/web/index.php/auth/login")

    await page.waitForTimeout(5000); // Espera 3 segundos
    //await expect(page.getByRole('link', {name: 'Admin'})).not.toBeVisible()

});