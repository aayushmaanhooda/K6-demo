import {browser} from 'k6/browser'
import {check} from 'k6';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'constant-vus',
            vus: 2,
            duration: '20s',
            options:{
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}

export default async function() {
    const page = await browser.newPage() // Open a new browser page
    await page.goto("https://www.google.com/") // Visit your website
    page.close()

}