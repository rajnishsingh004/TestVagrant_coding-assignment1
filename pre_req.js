var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var webdriver = require('selenium-webdriver');
const sel = require('./selector');
const _ = require('lodash');
const ui_util = require('./utils/ui_util');
const globalVariables = _.pick(global, ['browser', 'page', 'sel', 'ui_util', 'driver']);
global.ui_util = ui_util;

exports.ui_setup = async () => {
            try {
                await (service = new chrome.ServiceBuilder(path).build());
                await chrome.setDefaultService(service);
                await (driver_chrome = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build());
                // await (driver_chrome = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(webdriver.Capabilities.chrome()).build());
            }catch (err) {
                await (service = new chrome.ServiceBuilder()
                    .setPort(55555)
                    .build());
                await (options = new chrome.Options());
                await (driver_chrome = chrome.Driver.createSession(options, service));
            }
    await (global.driver = driver_chrome);
    await driver.manage().window().maximize();
}


