import { Locator, Page } from "@playwright/test";

export class NationalitiesMenu {
    readonly page: Page
    //readonly nationalities: Locator
    readonly nationalitiesOption: Locator
    

    constructor(page: Page){
        this.page = page;         
        this.nationalitiesOption = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Nationalities')
        //this.nationalitiesOption = this.nationalities
    }

    private async clickOnNationalities(){
        await this.nationalitiesOption.click()
    }

}
    