/* idexPage.pageObject.js */

let config = require('../../config/config.js');
let poJob = require("../locators/indexPageLocators.json");
let positionDetailsPage = require('./positionDetailsPage.js');

var searchPosiotion = "Project Manager";
require("babel-core/register");
require("babel-polyfill");
const EC = protractor.ExpectedConditions;

  var IndexPage = function(){

      this.searchInput = element(by.xpath(poJob.pageElement.searchInput));
      this.fieldSearchLocation = element(by.xpath(poJob.pageElement.fieldSearchLocation));

      this.locationSearchResult = element(by.xpath(poJob.pageElement.locationSearchResult));
      this.lblSearchJob = element(by.xpath(poJob.pageElement.label1));
      this.lblSearchLocation = element(by.xpath(poJob.pageElement.lblSearchLocation));
      this.lblSortBy = element(by.xpath(poJob.pageElement.lblSortBy));
      this.searchButton = element(by.xpath(poJob.pageElement.searchButton));
      this.resultPosition = element(by.xpath(poJob.pageElement.resultPosition));

          this.openURL = async function() {
            await browser.get(config.config.baseURL);
            await browser.wait(EC.visibilityOf(this.searchInput), config.config.regularTimeout, 'wait for search');
          };

      this.enterSearchPosition  = async function(Posiotion) {
          await browser.wait(EC.visibilityOf(this.searchInput), config.config.regularTimeout, 'wait for search');
          await this.searchInput.sendKeys(Posiotion);
          await this.lblSearchJob.click();

      };

      this.enterSearchLocation  = async function(searchLocation) {
                await this.fieldSearchLocation.sendKeys(searchLocation);
                await this.lblSearchLocation.click();

            };

      this.clickSearch = async function() {
        await this.searchButton.click();
        await browser.wait(EC.visibilityOf(this.resultPosition), config.config.regularTimeout)
        };

      this.clickPosition = async function() {
        await this.resultPosition.click();
        await browser.wait(EC.visibilityOf(positionDetailsPage.applyButton), config.config.regularTimeout)
                };

  };
  module.exports = new IndexPage();