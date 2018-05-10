/* positionDetailsPage.pageObject.js */

let config = require('../../config/config.js');
let consentFormPage = require('./consentFormPage.js');
let pdl = require("../locators/positionDetailsPageLocators.json");
 const EC = protractor.ExpectedConditions;

  let PositionDetailsPage = function() {
  //page elements locators
  this.lblJobAlert = element(by.xpath(pdl.pageElement.lblJobAlert));
  this.lblJobTitle = element(by.xpath(pdl.pageElement.lblJobTitle));
  this.lblLocations = element(by.xpath(pdl.pageElement.lblLocations));
  this.lblFunctions = element(by.xpath(pdl.pageElement.lblFunctions));
  this.lblJobDescription = element(by.xpath(pdl.pageElement.lblJobDescription));
  this.applyButton = element(by.xpath(pdl.pageElement.applyButton));
  this.fieldAlertEmail = element(by.xpath(pdl.pageElement.fieldAlertEmail));
  this.getAlertButton = element(by.xpath(pdl.pageElement.getAlertButton));
  this.emailAlertErrorMessage = element(by.xpath(pdl.pageElement.emailAlertErrorMessage));
  this.alertSuccessMessage = element(by.xpath(pdl.pageElement.alertSuccessMessage));
  this.loginEmailValue = pdl.pageElement.loginEmailValue;

      this.enterfieldAlertEmail  = async function(email)  {
          await this.fieldAlertEmail.clear().sendKeys(email);
      };

      this.clickAlertEmail  = async function(message)  {
          await this.getAlertButton.click();
           await browser.wait(EC.visibilityOf(message), config.config.regularTimeout)
      };

      this.clickApplyButton  = async function() {
          await this.applyButton.click();
          await browser.wait(EC.visibilityOf(consentFormPage.lblConsentHeader), config.config.regularTimeout)
      };


    };
  module.exports = new PositionDetailsPage();
