import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Page start', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
//      headless: true,
//      slowMo: 100,
//      devtools: true,
    });

    page = await browser.newPage();

  });

  test('is body exists', async () => {
    await page.goto('http://localhost:8888');

    await page.waitForSelector('body');
  });
  
  test('Form should render on page start', async () => {
    await page.goto('http://localhost:8888');

    await page.waitForSelector('.card-form-widget');
  });


  test('Form input should add .valid class if card is valid', async () => {
    await page.goto('http://localhost:8888');

    await page.waitForSelector('.card-form-widget');

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('4485038819487915');
    await submit.click();

    await page.waitForSelector('.card-form-widget .input.valid');
  }); //, 55000
  
  test('Form input should add .invalid class if card is not valid', async () => {
    //jest.setTimeout(20000);
    await page.goto('http://localhost:8888');

    await page.waitForSelector('.card-form-widget');

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

    await input.type('4485038819487000');
    await submit.click();

    await page.waitForSelector('.card-form-widget .input.invalid');
  }); //, 55000
    
  afterAll(async () => {
    await browser.close();
    server.kill();
  });  
  
});