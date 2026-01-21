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
    const page = await browser.newPage() 
    await page.setViewportSize({
        width:768,
        height:1024
    })
    await page.goto("https://www.google.com/") 
    page.close()

}