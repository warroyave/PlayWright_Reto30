import {expect, test} from '@playwright/test';
console.clear();

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test('login orange hrm', async ({page}) => {
    await page.goto(BASE_URL)

    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'login'}).click()

    await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()
    await expect(page.getByRole('heading',{name: 'Dashboard'})).toBeVisible()
})

test('Error en Login Orange hrm', async({page})=>{
    await page.goto(BASE_URL)

    await page.getByRole('textbox', {name: 'Username'}).fill('Adm')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button',{name: 'login'}).click()
    
    await expect(page.locator("text=Invalid credentials")).toBeVisible();

})