import { browser, networkProfiles } from 'k6/browser';
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
//   page.throttleNetwork(networkProfiles["Slow 3G"])
//   page.throttleNetwork(networkProfiles["Fast 4G"])
  page.throttleNetwork(networkProfiles["Fast 5G"])
  await page.goto("https://www.google.com/") 

  await page.close();
}