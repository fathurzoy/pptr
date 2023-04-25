//npm run test:shareStory -- val2=2 link=https://www.facebook.com/INAGAME.ID
const puppeteer = require('puppeteer')
const axios = require('axios')

const args = process.argv.slice(3) // ['oke', 1, 55]
const parsedArgs = {}

args.forEach(arg => {
	const [key, value] = arg.split('=')
	parsedArgs[key] = value
})

console.log(parsedArgs, 'test')
let idadspower = parsedArgs.id

const data = require('./db/' + parsedArgs.id + '.json') // data ws

const run = async () => {
	try {
		// console.log(data, data, 'data')
		const puppeteerUrl = data.data.ws.puppeteer
		const browser = await puppeteer.connect({
			browserWSEndpoint: puppeteerUrl,
			defaultViewport: null,
		})
		const pages = await browser.pages(0)
		// console.log(`Number of pages: ${pages.length}`)

		const page = pages[0]

		// Navigate to Facebook and login
		// await page.goto('https://www.facebook.com')
		// // // await page.goto('https://www.facebook.com/groups/242491427173554/permalink/765652264857465/');
		// // await page.goto('https://www.facebook.com/INAGAME.ID');
		// await page.waitForSelector('#email', { visible: true })
		// await page.type('#email', 'Silviani Nurlita Putri')
		// await page.type('#pass', 'berantakan123')
		// await page.keyboard.press('Enter')
		// await page.waitForNavigation()
		// await page.waitForTimeout(2000)

		// console.log(parsedArgs.link) // Output: 123

		await page.goto('https://www.facebook.com/' + parsedArgs.link)

		// Scroll
		let loop = 0
		while (loop < parsedArgs.post + 10) {
			const selector = await page.$$(
				`div[aria-posinset="${parsedArgs.post}"] div[aria-label="Kirimkan ini kepada teman atau kirimkan di linimasa Anda."]:nth-of-type(1)`
			)
			console.log(selector.length)
			if (selector.length > 0) {
				break
			} else {
				for (let index = 0; index < 2; index++) {
					await page.waitForTimeout(1000)
					await page.evaluate(() => {
						setTimeout(() => {
							window.scrollTo({
								top: window.pageYOffset + 1000,
								behavior: 'smooth',
							})
						}, 100) // delay for 1 second before scrolling
					})
				}
			}
			loop++
		}

		await page.waitForTimeout(1000)

		// Share
		const countShare = await page.$$eval(
			'div[aria-label="Kirimkan ini kepada teman atau kirimkan di linimasa Anda."]',
			element => element.length
		)
		if (countShare > 0) {
			const selectorsShare = await page.$$(
				'div[aria-label="Kirimkan ini kepada teman atau kirimkan di linimasa Anda."]'
			)
			console.log(selectorsShare, 'SHARE')
			await page.waitForTimeout(1000)
			if (parsedArgs.val2) {
				console.log(parsedArgs.val2, 'post')
				// jika ingin share spesifik post
				// await selectorsShare[parsedArgs.val2].type(parsedArgs.val1, {
				// 	delay: 500,
				// })

				selectorsShare[parsedArgs.val2].click()
				await page.waitForXPath(
					"//span[contains(text(),'Bagikan ke Cerita Anda (Publik)')]"
				)
				const [shareButton] = await page.$x(
					"//span[contains(text(),'Bagikan ke Cerita Anda (Publik)')]"
				)
				await shareButton.click()

				// await page.waitForXPath("//div[@role='presentation']")
				// const [shareText] = await page.$x("//div[@role='presentation']")
				// await shareText.type(parsedArgs.val1, { delay: 500 })
				// await page.click("div[aria-label='Bagikan']")
			} else {
				selectorsShare.slice(0, 1).forEach(async (selector, index) => {
					console.log('2')
					await page.waitForTimeout(1000)
					// // await selector.type(parsedArgs.val1, { delay: 500 })
					selectorsShare[index].click()
					await page.waitForXPath(
						"//span[contains(text(),'Bagikan ke Cerita Anda (Publik)')]"
					)
					const [shareButton] = await page.$x(
						"//span[contains(text(),'Bagikan ke Cerita Anda (Publik)')]"
					)
					await shareButton.click()

					// await page.type("div[role='presentation']", parsedArgs.val1)
					await page.click(
						"//span[contains(text(),'Bagikan ke Cerita Anda (Publik)')]"
					)
				})
			}
			await page.waitForTimeout(1000)
			await page.keyboard.press('Enter')
			await page.waitForTimeout(1000)
		}

		await page.waitForTimeout(1000)
	} catch (err) {
		console.log(err, 'test error')
	}
	process.exit()
}
run()
