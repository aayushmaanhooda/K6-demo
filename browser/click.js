import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

  await page.locator('#input-firstname').type('k6');
  await page.locator('#input-lastname').type('demo');
  await page.locator('#input-email').type('ab.testingk6@dispostable.com');
  await page.locator('#input-telephone').type('1234567890');
  await page.locator('#input-password').type('Test123!!');
  await page.locator('#input-confirm').type('Test123!!');

  await page.locator('input[type="checkbox"]').check();

  const submit = page.locator('input[type="submit"]');
  await Promise.all([
    page.waitForNavigation(),
    submit.click(),
  ]);

  const headingText = await page.locator('h1').textContent();

  check(headingText, {
    'Text Validation': (text) => text === 'Your Account Has Been Created!',
  });

  await page.close();
}