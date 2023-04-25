const puppeteer = require('puppeteer')
const axios = require('axios')

const data = require('./db.json') // data ws
const puppeteerUrl = data.data.ws.puppeteer // url puppeteer
console.log(puppeteerUrl, 'qq')

const run = async () => {
	try {
		const browser = await puppeteer.connect({
			browserWSEndpoint: puppeteerUrl,
			defaultViewport: null,
		})
		const page = await browser.newPage()

		// Navigate to Facebook and login
		await page.goto('https://www.facebook.com')
		// // await page.goto('https://www.facebook.com/groups/242491427173554/permalink/765652264857465/');
		// await page.goto('https://www.facebook.com/INAGAME.ID');
		await page.waitForSelector('#email', { visible: true })
		await page.type('#email', 'Silviani Nurlita Putri')
		await page.type('#pass', 'berantakan123')
		await page.keyboard.press('Enter')
		await page.waitForNavigation()
		await page.waitForTimeout(2000)

		// Perform a search on Facebook
		await page.waitForSelector("input[placeholder='Cari di Facebook']", {
			visible: true,
		})
		await page.type(
			"input[placeholder='Cari di Facebook']",
			'INAGame Indonesia'
		)
		await page.keyboard.press('Enter')
		await page.waitForNavigation()

		await page.waitForSelector(
			"a[href='https://www.facebook.com/INAGAME.ID']",
			{ visible: true }
		)
		await page.click("a[href='https://www.facebook.com/INAGAME.ID']")
		await page.waitForNavigation()
		await page.waitForTimeout(2000)

		// Scroll
		for (let index = 0; index < 10; index++) {
			await page.waitForTimeout(1000)
			await page.evaluate(() => {
				setTimeout(() => {
					window.scrollTo({
						top: window.pageYOffset + 1000,
						behavior: 'smooth',
					})
				}, 1000) // delay for 1 second before scrolling
			})
		}
		await page.evaluate(() => {
			setTimeout(() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			}, 1000) // delay for 1 second before scrolling
		})
		await page.waitForTimeout(2000)

		// Like
		const countLike = await page.$$eval(
			"div[aria-label='Suka']",
			element => element.length
		)
		console.log(`count like ${countLike}`)
		if (countLike > 0) {
			// await page.waitForSelector("div[aria-label='Suka']", {visible: true});
			const selectorsLike = await page.$$("div[aria-label='Suka']")
			await Promise.all(
				selectorsLike.map(async selector => {
					if (selector) {
						await page.waitForTimeout(1000)
						selector.click(selector)
						await page.waitForTimeout(1000)
					} else {
						await page.waitForTimeout(1000)
						console.log(`Element ${selector} not found.`)
					}
				})
			)
			// for (let i = 1; i < 2; i++) {
			//   await page.waitForTimeout(1000);
			//   await selectorsLike[i].click();
			// }
		}

		// scroll up
		await page.evaluate(() => {
			setTimeout(() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			}, 1000) // delay for 1 second before scrolling
		})
		await page.waitForTimeout(1000)

		// Comment
		const countComment = await page.$$eval(
			'div[aria-label="Tulis komentar..."]',
			element => element.length
		)
		console.log(`count Comment ${countComment}`)
		if (countComment > 0) {
			const selectorsComment = await page.$$(
				'div[aria-label="Tulis komentar..."]'
			)
			await Promise.all(
				selectorsComment.map(async selector => {
					if (selector) {
						await page.waitForTimeout(1000)
						await selector.type('Halo', { delay: 50 })
						await page.waitForTimeout(1000)
						await page.keyboard.press('Enter')
						await page.waitForTimeout(1000)
					} else {
						await page.waitForTimeout(1000)
						console.log(`Element ${selector} not found.`)
					}
				})
			)
			// for (let i = 0; i < 2; i++) {
			//   await page.waitForTimeout(1000);
			//   await selectorsComment[i].type("Halo");
			//   await page.keyboard.press('Enter');
			// }
		}
		console.log('ok')
		await page.waitForTimeout(10000)

		// Logout
		await page.click(
			"div[aria-label='Kontrol dan Pengaturan Akun'] span div div[role='button'] div div[data-visualcompletion='ignore']"
		)
		await page.waitForSelector(
			"div[data-nocookies='true'] div[role='button']",
			{ visible: true }
		)
		await page.click("div[data-nocookies='true'] div[role='button']")

		// // Take a screenshot and close the browser
		// // await page.screenshot({ path: './facebook.png' });
		// await browser.close()
	} catch (err) {
		console.log(err.message)
	}
}
run()
