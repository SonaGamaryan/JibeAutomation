/* loginPage.pageObject.js */

let config = require('../../config/config.js');
let lpl = require("../locators/loginPageLocators.json");
const EC = protractor.ExpectedConditions;
require("babel-core/register");
    require("babel-polyfill");

  var LoginPage = function() {
  //page element locators
  this.loginEmail = element(by.xpath(lpl.pageElement.loginEmail));
  this.labelLogin = element(by.xpath(lpl.pageElement.labelLogin));
  this.loginPassword = element(by.xpath(lpl.pageElement.loginPassword));
  this.loginButton = element(by.xpath(lpl.pageElement.loginButton));
  this.loginErrorMessage = element(by.xpath(lpl.pageElement.loginErrorMessage));


  this.enterEmail  = async function(email){
    await this.loginEmail.clear().sendKeys(email);
   };


      this.enterPassword  = async function(pass) {
          await this.loginPassword.clear().sendKeys(pass);

      };

  this.clickLoginButton  = async function() {
          await this.loginButton.click();
          await browser.wait(EC.visibilityOf(this.loginErrorMessage), config.config.regularTimeout)
       };


    };
  module.exports = new LoginPage();
