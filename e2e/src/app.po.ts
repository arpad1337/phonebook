import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolbarText() {
    return element(by.css('mat-toolbar span:first-child')).getText();
  }
}
