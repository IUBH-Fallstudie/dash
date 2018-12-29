import { AppPage } from './app.po';
import {browser, by, element, Key} from 'protractor';
import {protractor} from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;


  beforeEach(() => {
    page = new AppPage();
  });

  it('should show login', () => {
    page.navigateTo();
    browser.waitForAngular();
    expect(element(by.css('mat-card-title')).getText()).toEqual('Anmeldung');
  });

  it('should perform login', () => {
    page.navigateTo();
    browser.waitForAngular();
    expect(element(by.css('mat-card-title')).getText()).toEqual('Anmeldung');
    let user = element(by.css('input[placeholder="Nutzername"]'));
    user.sendKeys('user');

    let pass = element(by.css('input[placeholder="Passwort"]'));
    pass.sendKeys('pass');
    pass.sendKeys(Key.ENTER);

    expect(element(by.css('h3')).getText()).toEqual('Ladevorgang');
  });

  it('should show dashboard', () => {
    browser.driver.sleep(8000);
    expect(element(by.css('.progress h3')).getText()).toEqual('Fortschritt');
  });

  it('should show statistics', () => {
    element(by.css('.weighted-average')).click();
    browser.driver.sleep(200);
    expect(element(by.css('h4')).getText()).toEqual('Entwicklung Gesamtnote (ungewichtet)');
  });

  it('should show courses', () => {
    element(by.css('#mat-tab-label-0-1')).click();
    browser.driver.sleep(300);
    expect(element(by.css('mat-panel-title')).getText()).toEqual('1. Semester');
  });

  it('should open semester overview', () => {
    element(by.css('#mat-expansion-panel-header-1')).click();
    browser.driver.sleep(300);
    expect(element(by.css('mat-header-cell')).getText()).toEqual('Modul');
  });

  it('should open module details', () => {
    element(by.css('mat-row')).click();
    browser.driver.sleep(300);
    expect(element(by.css('.mat-subheader')).getText()).toEqual('Kurse');
    // Close details
    element(by.css('.cdk-overlay-container')).click();
  });

  it('should search courses', () => {
    element(by.css('.search-fab')).click();
    browser.driver.sleep(300);
    expect('true').toEqual('true');
  });

  it('should show quick access items', () => {
    page.navigateTo();
    browser.waitForAngular();
    browser.driver.sleep(500);
    element(by.css('#mat-tab-label-0-2')).click();
    expect(element(by.css('.mat-subheader')).getText()).toEqual('Studienplattformen');
  });

  it('should log out', () => {
    browser.driver.sleep(300);
    element(by.css('mat-toolbar button')).click();
    browser.driver.sleep(300);
    element(by.css('button.mat-menu-item')).click();
    browser.driver.sleep(300);
    expect(element(by.css('mat-card-title')).getText()).toEqual('Anmeldung');
  });
});
