import {expect, test} from "@playwright/test"
console.clear();

test('Get all the usernames registered', async ({page}) =>{
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
        await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
        await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
        await page.getByRole('button',{name: 'login'}).click()
    
        await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
        
        await page.getByRole('link', {name: 'Admin'}).click()
        await page.getByRole('navigation',{name: 'topbar menu'}).getByText('User Management').click()
        await page.getByRole('menuitem', {name: 'Users'}).click()

        //await page.pause()

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

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
        await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
        await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
        await page.getByRole('button',{name: 'login'}).click()
    
        await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
        
        await page.getByRole('link', {name: 'Admin'}).click()
        await page.getByRole('navigation',{name: 'topbar menu'}).getByText('User Management').click()
        await page.getByRole('menuitem', {name: 'Users'}).click()

        // Obtener todos los nombres de usuario de la tabla
        const userNames = await page.locator('.oxd-table-row .oxd-table-cell:nth-child(2)').allTextContents()

        //Filtrar para exluir Admin
        const filteredUsers = userNames.filter(u => u.toLowerCase() !== 'admin')

        /*if (filteredUsers.length === 0) {
            throw new Error('No hay usuarios disponibles distintos de Admin');
        }*/

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

        console.log(randomUser)
        
        expect(currentUsername).toEqual(randomUser)

        expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
            .toHaveValue(currentUsername)

})