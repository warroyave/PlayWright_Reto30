import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly usernameImput: Locator
    readonly passwordImput: Locator
    readonly loginButton: Locator

    constructor(page: Page){
        this.page = page
        this.usernameImput = page.getByRole('textbox', {name: 'Username'})
        this.passwordImput = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button',{name: 'login'})

    }
    async doLogin(username: string, password: string){
        
        await this.page.goto('/web/index.php/auth/login')
        await this.usernameImput.fill(username)
        await this.passwordImput.fill(password)
        await this.loginButton.click()
    }
}