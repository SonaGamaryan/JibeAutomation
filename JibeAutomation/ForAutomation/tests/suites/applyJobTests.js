'use strict';

let config = require('../../config/config.js');
const poJob = require("../../objects/jobs.json"),
 labels = require("../dataSource/indexPage.json"),
 commonData = require("../dataSource/common.json"),
 labelsPositionDetails = require("../dataSource/positionDetailsPage.json"),
 labelsConsentForm = require("../dataSource/consentFormPage.json"),
 labelsLogin = require("../dataSource/loginPage.json"),
 indexPage = require('../../objects/PageObjects/indexPage.js'),
 positionDetailsPage = require('../../objects/PageObjects/positionDetailsPage.js'),
 consentFormPage = require('../../objects/PageObjects/consentFormPage.js'),
 loginPage = require('../../objects/PageObjects/loginPage.js');
 let using = require('jasmine-data-provider');

describe('careers jnj automation sctipts', function() {

beforeAll(async function() {
    await indexPage.openURL()
        await browser.driver.manage().window().maximize();
       });

    it('index page UI elements checks', async function() {
      expect(await indexPage.lblSearchJob.getText()).toBe(labels.lblSearchJob);
      expect(await indexPage.lblSearchLocation.getText()).toBe(labels.lblSearchLocation);
      expect(await indexPage.lblSortBy.getText()).toBe(labels.lblSortBy);
    });

    it('should verify position search', async function() {
      await indexPage.enterSearchPosition("Project Manager");
      await indexPage.clickSearch();

      expect(await indexPage.resultPosition.isDisplayed()).toBe(true, 'result position is not dislayed');

    });

    xit('should verify location search', async function() {
      await indexPage.enterSearchLocation("Shangai");
      await indexPage.clickSearch();

      expect(await indexPage.locationSearchResult.isDisplayed()).toBe(true, 'Search results are not dislayed');

    });


    it('should verify position details page', async function() {
      await indexPage.clickPosition();

      expect(await positionDetailsPage.applyButton.getText()).toBe('Apply');
    });

    it('position details page UI elements checks', async function() {
      expect(await positionDetailsPage.lblJobAlert.getText()).toBe(labelsPositionDetails.lblJobAlert);
      expect(await positionDetailsPage.lblJobTitle.getText()).toBe(labelsPositionDetails.lblJobTitle);
      expect(await positionDetailsPage.lblLocations.getText()).toBe(labelsPositionDetails.lblLocations);
      expect(await positionDetailsPage.lblFunctions.getText()).toBe(labelsPositionDetails.lblFunctions);
      expect(await positionDetailsPage.lblJobDescription.getText()).toBe(labelsPositionDetails.lblJobDescription);
    });


    let x= commonData.emailValidation;
    using(x, function (inputData){
      it('should verify get_alert_field negative validation', async function() {

      await positionDetailsPage.enterfieldAlertEmail(inputData);
          await positionDetailsPage.clickAlertEmail(positionDetailsPage.emailAlertErrorMessage);


          expect(await positionDetailsPage.emailAlertErrorMessage.isDisplayed()).toBeTruthy('Alert messige is not visible');
          expect(await positionDetailsPage.emailAlertErrorMessage.getText()).toBe('Please enter a valid email.');
        });
    });



      it('should verify get_alert_field positive validation', async function() {

          await positionDetailsPage.enterfieldAlertEmail(config.config.loginEmailValue);
          await positionDetailsPage.clickAlertEmail(positionDetailsPage.alertSuccessMessage);

          expect(await positionDetailsPage.alertSuccessMessage.getText()).toBe('Your job alert was successfully created.');

        });


      it('should verify position Details Page Apply button', async function() {
          await positionDetailsPage.clickApplyButton();

          expect(await consentFormPage.lblConsentHeader.getText()).toBe(labelsConsentForm.lblConsentHeader);
          expect(await consentFormPage.lblInformationYouProvide.getText()).toBe(labelsConsentForm.lblInformationYouProvide);
          expect(await consentFormPage.lblPassiveInformation.getText()).toBe(labelsConsentForm.lblPassiveInformation);
          expect(await consentFormPage.lblThroughBrowser.getText()).toBe(labelsConsentForm.lblThroughBrowser);
          expect(await consentFormPage.lblUsingCookies.getText()).toBe(labelsConsentForm.lblUsingCookies);
          expect(await consentFormPage.lblUsingFlashCookies.getText()).toBe(labelsConsentForm.lblUsingFlashCookies);
          expect(await consentFormPage.lblUsingPixel.getText()).toBe(labelsConsentForm.lblUsingPixel);
          expect(await consentFormPage.lblOnlineAdv.getText()).toBe(labelsConsentForm.lblOnlineAdv);
        });

      it('should verify login Page ', async function() {

        await consentFormPage.clickAgreeButton();

          expect(await loginPage.labelLogin.getText()).toBe(labelsLogin.lblLogin);
        });

    let data= commonData.emailValidation;
    using(data, function (inputData){
      it('should verify login email field negative validation', async function() {

          await loginPage.enterEmail(inputData);
          await loginPage.enterPassword(config.config.loginPasswordValue);
          await loginPage.clickLoginButton();
          expect(await loginPage.loginErrorMessage.getText()).toBe(labelsLogin.loginErrorMessage);
        });
    });



});

