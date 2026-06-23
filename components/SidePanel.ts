import { Locator, Page } from "@playwright/test";

// Explicación Reto dia 8
export class SidePanel {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    
    
    private menuOption(option: SideMenuOption): Locator {
        return this.page.locator('.oxd-main-menu-item').filter({ hasText: option })
    }
    async clickOnOption(option: SideMenuOption) {
        await this.menuOption(option).click()
    }
    
    private searchOption(option: SearchOptionEnum): Locator {
        return this.page.getByPlaceholder(option)
    }
    
    async clickOnSearchOption(option: SearchOptionEnum) {
        await this.searchOption(option).click()
    }
}

export enum SideMenuOption{
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUIMENT = 'Recruitment',
    MY_INFO = 'My Info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY = 'Directory',
    MAINTENANCE = 'Maintenance',
    CLAIM = 'Claim',
    BUZZ = 'Buzz',
    //SEARCH = 'Search'
}

export enum SearchOptionEnum {
  SEARCH = 'Search'
}