const puppeteer = require('puppeteer')
const axios = require('axios')

const data = require('./db.json') // data ws
const puppeteerUrl = data.data.ws.puppeteer // url puppeteer

//npm run test:shareNow -- val1=comment val2=2 link=https://www.facebook.com/INAGAME.ID

const args = process.argv.slice(2) // ['oke', 1, 55]
const parsedArgs = {}
args.forEach(arg => {
	const [key, value] = arg.split('=')
	parsedArgs[key] = value
})

const run = async () => {
	try {
		const puppeteerUrl = data.data.ws.puppeteer
		const browser = await puppeteer.connect({
			browserWSEndpoint: puppeteerUrl,
			defaultViewport: null,
		})
		const pages = await browser.pages(0)
		console.log(`Number of pages: ${pages.length}`)

		const page = pages[0]

		// Navigate to Facebook and login
		await page.goto('https://www.facebook.com')
		// // await page.goto('https://www.facebook.com/groups/242491427173554/permalink/765652264857465/');
		// await page.goto('https://www.facebook.com/INAGAME.ID');
		await page.waitForSelector('#email', { visible: true })
		await page.type('#email', '100047845613921')
		await page.type('#pass', 'w8FZ593SKNEfW&W')
		await page.keyboard.press('Enter')
		await page.waitForNavigation()
		await page.waitForTimeout(2000)

		console.log(parsedArgs.link) // Output: 123

		await page.goto(parsedArgs.link)

		// Scroll
		for (let index = 0; index < 5; index++) {
			await page.waitForTimeout(1000)
			await page.evaluate(() => {
				setTimeout(() => {
					window.scrollTo({
						top: window.pageYOffset + 500,
						behavior: 'smooth',
					})
				}, 100) // delay for 1 second before scrolling
			})
		}
		// await page.evaluate(() => {
		// 	setTimeout(() => {
		// 		window.scrollTo({
		// 			top: 0,
		// 			behavior: 'smooth',
		// 		})
		// 	}, 1000) // delay for 1 second before scrolling
		// })
		// await page.waitForTimeout(1000)

		// Share
		const countShare = await page.$$eval(
			'div[aria-label="Kirimkan ini kepada teman atau kirimkan di linimasa Anda."]',
			element => element.length
		)
		if (countShare > 0) {
			const selectorsShare = await page.$$(
				'div[aria-label="Kirimkan ini kepada teman atau kirimkan di linimasa Anda."]'
			)
			console.log(selectorsShare, 'SELECTOR SHARE')
			await page.waitForTimeout(1000)
			if (parsedArgs.val2) {
				console.log(parsedArgs.val2, 'asdasd')
				// jika ingin share spesifik post
				// await selectorsShare[parsedArgs.val2].type(parsedArgs.val1, {
				// 	delay: 500,
				// })

				selectorsShare[parsedArgs.val2].click()
				await page.waitForXPath(
					"//span[contains(text(),'Bagikan sekarang (Publik)')]"
				)
				const [shareButton] = await page.$x(
					"//span[contains(text(),'Bagikan sekarang (Publik)')]"
				)
				await shareButton.click()

				// await page.waitForXPath("//div[@role='presentation']")
				// const [shareText] = await page.$x("//div[@role='presentation']")
				// await shareText.type(parsedArgs.val1, { delay: 500 })
				// await page.click("div[aria-label='Bagikan']")
			} else {
				selectorsShare.slice(0, 1).forEach(async (selector, index) => {
					console.log('qq')
					await page.waitForTimeout(1000)
					// // await selector.type(parsedArgs.val1, { delay: 500 })
					selectorsShare[index].click()
					await page.waitForXPath(
						"//span[contains(text(),'Bagikan sekarang (Publik)')]"
					)
					const [shareButton] = await page.$x(
						"//span[contains(text(),'Bagikan sekarang (Publik)')]"
					)
					await shareButton.click()

					// await page.type("div[role='presentation']", parsedArgs.val1)
					await page.click(
						"//span[contains(text(),'Bagikan sekarang (Publik)')]"
					)
				})
			}
			await page.waitForTimeout(1000)
			await page.keyboard.press('Enter')
			await page.waitForTimeout(1000)
		}

		await page.waitForTimeout(1000)

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
