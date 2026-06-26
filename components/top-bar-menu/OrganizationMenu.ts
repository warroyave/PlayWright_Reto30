import { Locator, Page } from "@playwright/test";

export class OrganizationMenu {
    readonly page: Page
    readonly organization: Locator
    readonly generalInformationOption
    readonly locationsOption
    readonly structureOption

    constructor(page: Page){
        this.page = page;         
        this.organization = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Organization')
        this.generalInformationOption = page.getByRole('menuitem', {name: 'General Information'})
        this.locationsOption = page.getByRole('menuitem', {name: 'Locations'})
        this.structureOption = page.getByRole('menuitem', {name: 'Structure'})
    }

    private async clickOnOrganization(){
        await this.organization.click()
    }
    async clickOnGeneralInformation(){
        await this.clickOnOrganization()
        await this.generalInformationOption.click()
    }
    async clickOnLocations(){
        await this.clickOnOrganization()
        await this.locationsOption.click()
    }
    async clickOnStructure(){
        await this.clickOnOrganization()
        await this.structureOption.click()
    }
}