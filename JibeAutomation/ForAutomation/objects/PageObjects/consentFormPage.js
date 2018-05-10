/* consentFormPage.pageObject.js */

let config = require('../../config/config.js');
let cfpl = require("../locators/consentFormPageLocators.json");
const EC = protractor.ExpectedConditions;
require("babel-core/register");
require("babel-polyfill");
let loginPage = require('./loginPage.js');

  var ConsentFormPage = function() {
  //page elements locators
  this.lblConsentHeader = element(by.xpath(cfpl.pageElement.lblConsentHeader));
  this.lblInformationYouProvide = element(by.xpath(cfpl.pageElement.lblInformationYouProvide));
  this.lblPassiveInformation = element(by.xpath(cfpl.pageElement.lblPassiveInformation));
  this.lblThroughBrowser = element(by.xpath(cfpl.pageElement.lblThroughBrowser));
  this.lblUsingCookies = element(by.xpath(cfpl.pageElement.lblUsingCookies));
  this.lblUsingFlashCookies = element(by.xpath(cfpl.pageElement.lblUsingFlashCookies));
  this.lblUsingPixel = element(by.xpath(cfpl.pageElement.lblUsingPixel));
  this.lblOnlineAdv = element(by.xpath(cfpl.pageElement.lblOnlineAdv));
  this.agreeButton = element(by.xpath(cfpl.pageElement.agreeButton));

    this.clickAgreeButton  = async function() {
          await this.agreeButton.click();
          await browser.wait(EC.visibilityOf(loginPage.labelLogin), config.config.regularTimeout)
      };
    };

    module.exports = new ConsentFormPage();
