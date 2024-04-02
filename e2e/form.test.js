import puppeteer from 'puppeteer';

describe('Cards Form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Form should render on page start', async () => {
    await page.goto('http://localhost:8080');

    await page.waitForSelector('.card-form-widget');
  });

  test('Form input should add .valid class if card is valid', async () => {
    jest.setTimeout(20000);
    await page.goto('http://localhost:8080');

    await page.waitForSelector('.card-form-widget');

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

	await input.type('4485038819487915');
	await submit.click();

    await page.waitForSelector('.card-form-widget .input.valid');
  }, 25000);

  afterEach(async () => {
    await browser.close();
  });
  
  test('Form input should add .invalid class if card is not valid', async () => {
    jest.setTimeout(20000);
    await page.goto('http://localhost:8080');

    await page.waitForSelector('.card-form-widget');

    const form = await page.$('.card-form-widget');
    const input = await form.$('.input');
    const submit = await form.$('.submit');

	await input.type('4485038819487000');
	await submit.click();

    await page.waitForSelector('.card-form-widget .input.invalid');
  }, 25000);

  afterEach(async () => {
    await browser.close();
  });
  
});