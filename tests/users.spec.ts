import {expect, test} from "@playwright/test"
import { LoginPage } from "../pageobjects/LoginPage";
import { SideMenuOption, SidePanel } from '../components/SidePanel';
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu";
import { UsersTable } from "../components/UsersTable";
import { Navigate } from "../pageobjects/Navigate";
import { AddNewUserPage } from "../pageobjects/AddNewUserPage";
import { UserModel } from "../models/UserModel";
import { UserFactory } from "../factory/UserFactory";

test('Get all the usernames registered', async ({page}) =>{

        /*const loginPage = new LoginPage(page)
        await loginPage.loginAsAdmin()*/
        
        await page.goto('/web/index.php/dashboard/index')

        await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
        
        await page.getByRole('link', {name: 'Admin'}).click()
        await page.getByRole('navigation',{name: 'topbar menu'}).getByText('User Management').click()
        await page.getByRole('menuitem', {name: 'Users'}).click()

        const rows = page.getByRole('table').getByRole('row')
        const usernames: string[] = []

        const rowCount = await rows.count()

        for (let i = 1; i < rowCount; i++){
            const cell = rows.nth(i).getByRole('cell').nth(1)
            const username = await cell.textContent()

            if (username){
                usernames.push(username)
            }
        }
        console.log(usernames)
})

// RETO 6 17/06/2026
test('Select specific user for edition', async ({page}) =>{

        //Cuando quiero enviar un usuario especifico.
        //const userForEdition = 'warroyave'

        /*const loginPage = new LoginPage(page)
        await loginPage.loginAsAdmin()*/

        await page.goto('/web/index.php/dashboard/index')
    
        await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
        
        await page.getByRole('link', {name: 'Admin'}).click()
        await page.getByRole('navigation',{name: 'topbar menu'}).getByText('User Management').click()
        await page.getByRole('menuitem', {name: 'Users'}).click()

        // Obtener todos los nombres de usuario de la tabla
        const userNames = await page.locator('.oxd-table-row .oxd-table-cell:nth-child(2)').allTextContents()

        //Filtrar para exluir Admin
        const filteredUsers = userNames.filter(u => u.toLowerCase() !== 'admin')

        // Elejir uno usuario aleatorio
        const randomUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)]
        console.log('Usuario seleccionado: ', randomUser)
    
        // Localizar el boton de edicion "Pencil" del usuario
        const pencilToEdit = page
            .getByRole('table')
            .getByRole('row')
            .filter({hasText: randomUser})
            .locator('button')
            .filter({has: page.locator('i.bi-pencil-fill') })

        //Codigo para usar enviando un usuario especifico    
        /*const pencilToEdit = page
            .getByRole('table')
            .getByRole('row')
            .filter({hasText: userForEdition})
            .locator('button')
            .filter({has: page.locator('i.bi-pencil-fill') })*/

        await pencilToEdit.click()

        const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
            .inputValue()
          
        expect(currentUsername).toEqual(randomUser)

        expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
            .toHaveValue(currentUsername)

})

test('Check user role options', async ({page}) => {

    const expectedRoleOptions = [ '-- Select --', 'Admin', 'ESS' ]

    /*const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(., 'User Role')]/parent::div/following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions, 
        'The options displayed in the User Role Dropdown do not match the expectecd options.').toEqual(expectedRoleOptions)

})
// Reto Dia 11 - Capturando elementos que desaparecen
test('Check user status options', async ({page}) => {

    const expectedStatusOptions = [ '-- Select --', 'Enabled', 'Disabled']

    /*const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(., 'Status')]/parent::div/following-sibling::div").click()
    const currentStatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentStatusOptions)

    expect(currentStatusOptions, 
        'The options displayed in the User Role Dropdown do not match the expectecd options.').toEqual(expectedStatusOptions)

})
// Reto dia 12
test('Filter by user admin', async ({page}) => {
    
   /*const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    // Filas que contienen el rol Admin
    const currentAdminRows= allBodyRows.filter({
        has:page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering: ',expectedAdminCount)

    //Aplicar Filtro
    await page.locator("//label[contains(., 'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole('listbox').getByRole('option', {name: 'Admin'}).click()
    await page.getByRole('button', {name: 'Search'}).click()

    //La tabla filtrada debería tener exactamente la misma cantida que se encontro antes.
    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for (let i = 0; i < expectedAdminCount; i++){
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }

})

test ('Capture all amounts', async({page}) =>{
    await page.goto('/web/index.php/claim/viewAssignClaim')

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    const amounts: number[] = []
    
    const rowCount = await allBodyRows.count()
    console.log('Number of rows', rowCount)

    for(let i = 0; i < rowCount; i++){
        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log('This is the amount in text:', amountText)

        if (amountText === null) {
            continue
        }
         const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())
         amounts.push(convertedNumber)
    }

    console.log(amounts)

    let total = 0
    let promedio = 0
    let maximo = 0
    let minimo = 0

    for (let amount of amounts){
        total += amount
    }

    promedio = total / rowCount
    maximo = Math.max(...amounts)
    minimo = Math.min(...amounts)

    console.log ('Total is: ', total )
    console.log ('Promedio is: ', promedio )
    console.log('Valor Maximo: ', maximo)
    console.log('Valor Minimo: ', minimo)
})

test('Add new user admin', async ({page}) => {

    const navigate = new Navigate(page)
    await navigate.toDasboard()
    
    const randomUsername = 'goku' + crypto.randomUUID().slice(0, 30)
    const password = 'Password123'
    const employeeToSearch = 'Qwerty LName'  

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topbarmenu = new TopBarMenu(page)
    await topbarmenu.userManagement.clickOnUsers()

    const userTable = new UsersTable(page)
    await userTable.editFirstAdminOnTheTable()  

    const addNewUserPage = new AddNewUserPage(page)
    const fullUserToSearch = await addNewUserPage.getEmployeeName()

    const adminUser= UserFactory.createAdmin({
        employeeName: fullUserToSearch
    })

    await page.goBack()
    await addNewUserPage.addNewUser(adminUser)
    await addNewUserPage.checkuserWassAddMessage()    
})

test('Validate different passwords when adding a new user', async ({ page }) => {

    const randomUsername = 'goku' + crypto.randomUUID()
    const password = 'Password123'
    const confirmPassword = 'Password456'
    const employeeToSearch = 'Qwerty LName'

    await page.goto('/web/index.php/dashboard/index')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagement.clickOnUsers()

    await page.getByText('Add').click()

    // User Role
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('User Role') })
        .locator('div.oxd-select-text-input')
        .click()

    await page.getByText('ESS', { exact: true }).click()

    // Employee Name
    await page.getByRole('textbox', { name: 'Type for hints...' })
        .fill(employeeToSearch)

    await page.getByText('Qwerty Qwerty LName', { exact: true }).click()

    // Status
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Status') })
        .locator('div.oxd-select-text-input')
        .click()

    await page.getByText('Enabled').click()

    // Username
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Username') })
        .getByRole('textbox')
        .fill(randomUsername)

    // Password
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Password', { exact: true }) })
        .getByRole('textbox')
        .fill(password)

    // Confirm Password con valor diferente
    await page.locator('div.oxd-grid-item--gutters')
        .filter({ has: page.getByText('Confirm Password', { exact: true }) })
        .getByRole('textbox')
        .fill(confirmPassword)

    await page.getByRole('button', { name: 'Save' }).click()

    // Validar mensaje de error
    await expect(
        page.getByText('Passwords do not match')
    ).toBeVisible()
})

test('Add new user ESS', async ({page}) => {

    const navigate = new Navigate(page)
    await navigate.toDasboard()
    
    const randomUsername = 'goku' + crypto.randomUUID().slice(0, 30)
    const password = 'Password123'
    const employeeToSearch = 'Qwerty LName'  

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topbarmenu = new TopBarMenu(page)
    await topbarmenu.userManagement.clickOnUsers()

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    
    // Filas que contienen el rol Admin
    const currentAdminRows= allBodyRows.filter({
        has:page.getByRole('cell').nth(2).getByText('ESS')
    })

    const firstAdminToSearch = currentAdminRows.nth(0)
    await expect(firstAdminToSearch, 'No ESS users found in the table.').toHaveCount(1)

    await firstAdminToSearch
    .locator('button')
    .filter({has: page.locator('i.bi-pencil-fill') }).click()

    const fullUserToSearch = await page.getByRole('textbox', {name: 'Type for hints...'}).inputValue()
    console.log(`User to search: ${fullUserToSearch}`)

    const adminUser= UserFactory.createAdmin({
        employeeName: fullUserToSearch
    })

    await page.goBack()

    const addNewUserPage = new AddNewUserPage(page)
    await addNewUserPage.addNewUser(adminUser)
    await addNewUserPage.checkuserWassAddMessage()    
})