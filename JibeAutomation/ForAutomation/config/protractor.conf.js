require('babel-register')({
  presets: [
    'env'
  ]
});

var HTMLReport = require('protractor-html-reporter-2');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var jasmineReporters = require('jasmine-reporters');
var path = require('path');
var argv = require('yargs').argv;

var config = require('./config');
var packageInfo = require('../package.json');

var browserName = argv.browser || 'chrome';
var folder = 'v.' + packageInfo.version;

exports.config = {

  // can be moved to config.js
  baseUrl: 'https://jobs.jnj.com/jobs?page=1',
  capabilities: {
    browserName: browserName,

    //to run multiple threads
    shardTestFiles: false,
    //number of threads
    maxInstances: 3
  },
  suites: {'test': '../tests/suites/applyJobTests.js'},
//  suites: {'test': '../tests/suites/headerMenuTests.js'},
  frameworks: ['jasmine2'],
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    print: function () { }
  },
  params: {
  //  slowSpecTimeout: config.slowSpecTimeout
  },
  onPrepare: function () {

    //Should be removed before run on Angular app
    browser.ignoreSynchronization = true;
    let jasmineEnv = jasmine.getEnv();

    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();
    jasmineEnv.addReporter(new SpecReporter({
      displayStacktrace: 'all'
    }));

    //report in xml format is generated
    jasmineEnv.addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './reports',
      filePrefix: 'xmlresults'
    }));

    var fs = require('fs-extra');

    fs.emptyDir('reports/screenshots/', function (err) {
      if (err) {
        console.log(err);
      }
    });

    jasmineEnv.addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');

            browser.takeScreenshot().then(function (png) {

              // screenshot name
              var stream = fs.createWriteStream('reports/screenshots/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });
  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './reports',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };

      //convert .xml repoert to HTML
      new HTMLReport().from('./reports/xmlresults.xml', testConfig);
    });
  }
};


