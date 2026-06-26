import { Locator, Page } from "@playwright/test";

export class JobMenu {

    readonly page: Page;
    readonly job: Locator
    readonly jobTitlesOption
    readonly payGradesOption
    readonly employmentStatusOption
    readonly jobCategoriesOption
    readonly workShiftsOption

    constructor(page: Page) {
        this.page = page;
        this.job = page
            .getByRole('navigation', { name: 'topbar menu' })
            .getByText('Job', { exact: true });
            
        this.jobTitlesOption = page.getByRole('menuitem', {name: 'Job Titles'})
        this.payGradesOption = page.getByRole('menuitem', {name: 'Pay Grades'})
        this.employmentStatusOption = page.getByRole('menuitem', {name: 'Employment Status'})
        this.jobCategoriesOption = page.getByRole('menuitem', {name: 'Job Categories'})
        this.workShiftsOption = page.getByRole('menuitem', {name: "Work Shifts"})

    }

    private async clickOnJob(){
        await this.job.click()
    }

    async clickOnJobTitles(){
        await this.clickOnJob()
        await this.jobTitlesOption.click()
    }
    async clickOnPayGrades(){
        await this.clickOnJob()
        await this.payGradesOption.click()
    }
    async clickOnEmploymentStatus(){
        await this.clickOnJob()
        await this.employmentStatusOption.click()
    }
    async clickOnJobCategories(){
        await this.clickOnJob()
        await this.jobCategoriesOption.click()
    }
    async clickOnWorkShiftsOption(){
        await this.clickOnJob()
        await this.workShiftsOption.click()
    }

}
