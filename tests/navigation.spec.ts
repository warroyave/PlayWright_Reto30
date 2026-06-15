import {test, expect} from '@playwright/test'
console.clear()

test ('Check left menu options', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

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
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

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