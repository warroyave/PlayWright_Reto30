import {test, expect} from '@playwright/test'
import { LoginPage } from "../pageobjects/LoginPage";
import { SearchOptionEnum, SideMenuOption, SidePanel } from '../components/SidePanel';
console.clear()

test ('Check left menu options', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log('Current menu items count', currentMenuItemsCount)

    const currenMenuItems: string[] = []

    for(let i = 0; i < currentMenuItemsCount; i++){
        const menuText = await leftMenuItems.nth(i).innerText()
        currenMenuItems.push(menuText)
    }

    console.log(currenMenuItems)

        const expectedMenuItems = [
        'Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info',
        'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'
    ];

    expect(currenMenuItems).toEqual(expectedMenuItems)
    expect(currenMenuItems[0]).toBe(expectedMenuItems[0]);

    console.log("Elemento esperado: ",currenMenuItems[0], "Elemento de la lista: ",expectedMenuItems[0])
})

test('Navigate throght the left panel', async ({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuItem = leftMenuItems.nth(i);
    const menuText = await menuItem.innerText();
    console.log('Current menu item:', menuText);

    try {
        if (menuText === 'Maintenance') {
            // Si es Maintenance, retrocede en lugar de abrir
            await page.goBack();
            continue; // pasa al siguiente item
        }

        await menuItem.click();
        // aquí puedes poner la lógica de validación de la opción
    } catch (error) {
        console.error(`Error al procesar ${menuText}:`, error);
        // retrocede si hubo error
        await page.goBack();
        continue; // sigue con la siguiente opción
    }
}

})

test('Check all the qualifications links', async ({page}) => {

    const expectedPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        }    
    ]
    
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()
    await page.getByRole('link', {name: 'Admin'}).click()
    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()
    
    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages){
        const menuOption = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))
        await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications').click()
    }
})

test('Check all the Attendance links', async ({page})=>{
    const expectedPagesTime = [
        {
            menu: 'My Records',
            url: '/web/index.php/attendance/viewMyAttendanceRecord'
        },
        {
            menu: 'Punch In/Out',
            url: '/web/index.php/attendance/punchIn'
        },
        {
            menu: 'Employee Records',
            url: '/web/index.php/attendance/viewAttendanceRecord'
        },
        {
            menu: 'Configuration',
            url: '/web/index.php/attendance/configure'
        }
    ]

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    await page.getByRole('link', {name: 'Time'}).click()

    await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Attendance').click()

    const attendanceOptions = page.getByRole('menu').locator('li')

    for (let expectedPageTime of expectedPagesTime){
        const menuOption = attendanceOptions.filter({hasText: expectedPageTime.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPageTime.url))
        await page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Attendance').click()
    }
})

// RETO DIA 8
test('Check search option links', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnSearchOption(SearchOptionEnum.SEARCH)
    const searchInput = page.getByPlaceholder('Search')
    await searchInput.fill('Admin')

    await expect(searchInput).toHaveValue('Admin')

})

