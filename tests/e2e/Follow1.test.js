const puppeteer = require('puppeteer')

describe('Login Facebook - Like', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 5,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('login facebook - Follow', async function () {
		// Load "https://www.facebook.com/?stype=lo&jlou=Afe1CyX0KB1ODE5RYIBpvwTbOIhurv7n30ukI5L9fVtt41eSrglNMHjOqVuhkDuZIDyxI05VO-xCJhkfi0dGeOcw7tmwAdeSJ2WjHgt4rm5mTA&smuh=8469&lh=Ac8Vs7bDNPI7v7WCaSc"
		await page.goto(
			'https://www.facebook.com/?stype=lo&jlou=Afe1CyX0KB1ODE5RYIBpvwTbOIhurv7n30ukI5L9fVtt41eSrglNMHjOqVuhkDuZIDyxI05VO-xCJhkfi0dGeOcw7tmwAdeSJ2WjHgt4rm5mTA&smuh=8469&lh=Ac8Vs7bDNPI7v7WCaSc'
		)

		// Resize window to 1280 x 569
		await page.setViewport({ width: 1380, height: 569 })

		// Click on <input> [data-testid="royal_email"]
		await page.waitForSelector('[data-testid="royal_email"]')
		await page.click('[data-testid="royal_email"]')

		// Fill "Silviani Nurlit... on <input> [data-testid="royal_email"]
		await page.waitForSelector('[data-testid="royal_email"]:not([disabled])')
		await page.type('[data-testid="royal_email"]', '100047845613921')

		// Press Tab on input
		await page.waitForSelector('[data-testid="royal_email"]')
		await page.keyboard.press('Tab')

		// Fill "berantakan123" on <input> [data-testid="royal_pass"]
		await page.waitForSelector('[data-testid="royal_pass"]:not([disabled])')
		await page.type('[data-testid="royal_pass"]', 'w8FZ593SKNEfW&W')

		// Press Enter on input
		await page.waitForSelector('[data-testid="royal_pass"]')
		await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()])

		// Resize window to 1920 x 929
		await page.setViewport({ width: 1920, height: 929 })

		// Click on <input> [placeholder="Cari di Facebook"]
		await page.waitForSelector('[placeholder="Cari di Facebook"]')
		await page.click('[placeholder="Cari di Facebook"]')

		// Fill "inagame indones... on <input> [placeholder="Cari di Facebook"]
		await page.waitForSelector(
			'[placeholder="Cari di Facebook"]:not([disabled])'
		)
		await page.type('[placeholder="Cari di Facebook"]', 'inagame indonesia')

		// Press Enter on input
		await page.waitForSelector('[placeholder="Cari di Facebook"]')
		await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()])

		// Click on <span> "Ikuti"
		await page.waitForSelector(
			'.x9f619 > .x9f619 > .x9f619 > .x1i10hfl .x9f619 > .x193iq5w > .x1lliihq'
		)
		await page.click(
			'.x9f619 > .x9f619 > .x9f619 > .x1i10hfl .x9f619 > .x193iq5w > .x1lliihq'
		)
	})
})
