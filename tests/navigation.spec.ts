import {test, expect} from '@playwright/test'
console.clear()

test ('Check left menu options', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuTimesCount = await leftMenuItems.count()
    console.log('Current menu items count', currentMenuTimesCount)

    const currenMenuItems: string[] = []

    for(let i = 0; i < currentMenuTimesCount; i++){
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
