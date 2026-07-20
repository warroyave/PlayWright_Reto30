import { Page } from '@playwright/test'
import { SideMenuOption, SidePanel } from '../components/SidePanel'
import { TopBarMenu } from '../components/top-bar-menu/TopBarMenu'

export class Navigate {
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
  }
  
  async toDasboard(){
    await this.page.goto('/web/index.php/dashboard/index')
  }

  async toUsers(){
    await this.toDasboard()
    const sidePanel = new SidePanel(this.page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    
    const topbarmenu = new TopBarMenu(this.page)
    await topbarmenu.userManagement.clickOnUsers()

  }
  
}
