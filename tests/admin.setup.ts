import {test as setup, expect} from '@playwright/test'
import { LoginPage} from '../pageobjects/LoginPage'


setup('Authentication as Admin', async ({page}) => {

    console.log('Autenticación iniciada usando el setup')

    // Iniciar sesion
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    //Nos aseguramos que el inicio de sesion es exitoso
    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

    // Guardar el estado del login
    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Autenticación completada usando el setup')

})