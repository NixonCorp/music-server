const {Builder, Browser, By} = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

 class Parser {
  
  async emulate(url) {
    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(new chrome.Options().headless().addArguments(['--disable-blink-features=AutomationControlled',
  '--disable-extensions'])).build();
  
    try {
      await driver.get(url);
      const html = await driver.findElement(By.tagName('html')).getAttribute('innerHTML');
      return {html: html, url: await driver.getCurrentUrl()};
    } finally {
      await driver.quit();
    }
  }
}


exports.Parser = Parser;