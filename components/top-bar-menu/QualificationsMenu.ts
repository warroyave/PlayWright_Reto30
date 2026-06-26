import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {
    readonly page: Page
    readonly qualifications: Locator
    readonly skillsOption
    readonly EducationOption
    readonly licensesOption
    readonly languagesOption
    readonly membershipsOption


    constructor(page: Page){
        this.page = page;         
        this.qualifications = page.getByRole('navigation', {name: 'Topbar menu'}).getByText('Qualifications ')
        this.skillsOption = page.getByRole('menuitem', {name: 'Skills'})
        this.EducationOption = page.getByRole('menuitem', {name: 'Education'})
        this.licensesOption = page.getByRole('menuitem', {name: 'Licenses'})
        this.languagesOption = page.getByRole('menuitem', {name: 'Languages'})
        this.membershipsOption = page.getByRole('menuitem', {name: 'Memberships'})
    }

    private async clickOnQualifications(){
        await this.qualifications.click()
    }
    async clickOnSkills(){
        await this.clickOnQualifications()
        await this.skillsOption.click()
    }
    async clickOnEducation(){
        await this.clickOnQualifications()
        await this.EducationOption.click()
    }
    async clickOnLicenses(){
        await this.clickOnQualifications()
        await this.licensesOption.click()
    }
    async clickOnLanguages(){
        await this.clickOnQualifications()
        await this.languagesOption.click()
    }
    async clickOnMemberships(){
        await this.clickOnQualifications()
        await this.membershipsOption.click()
    }
}