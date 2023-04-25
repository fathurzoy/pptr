// /npm run test:CmntFb post=1 type=oke id=j63aic8 link=INAGAME.ID

const puppeteer = require('puppeteer')
const axios = require('axios')

const data = require('./db.json') // data ws
const args = process.argv.slice(3) // ['oke', 1, 55]
const parsedArgs = {}
args.forEach(arg => {
	const [key, value] = arg.split('=')
	parsedArgs[key] = value
})

console.log(parsedArgs, 'test')
let idadspower = parsedArgs.id

const run = async () => {
	try {
		console.log(data, data[idadspower], 'data')
		const puppeteerUrl = data[idadspower].data.ws.puppeteer
		const browser = await puppeteer.connect({
			browserWSEndpoint: puppeteerUrl,
			defaultViewport: null,
		})
		const pages = await browser.pages(0)
		console.log(`Number of pages: ${pages.length}`)

		const page = pages[0]

		console.log(parsedArgs.link) // Output: 123

		await page.goto('https://www.facebook.com/' + parsedArgs.link, {
			waitUntil: 'networkidle0',
		})
		await page.waitForTimeout(1000)

		// Scroll
		let loop = 0
		while (loop < parsedArgs.post + 10) {
			const selector = await page.$$(
				`div[aria-posinset="${parsedArgs.post}"] div[aria-label="Beri komentar"]:nth-of-type(1)`
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

		// Comment
		const selector = await page.$$(
			`div[aria-posinset="${parsedArgs.post}"] div[aria-label="Beri komentar"]:nth-of-type(1)`
		)
		console.log(selector)
		if (selector.length > 0) {
			await page.waitForTimeout(1000)
			await selector[0].click()
			console.log('COMMENT!')
			try {
				await page.waitForSelector(`div[aria-label='Tulis komentar...']`, {
					timeout: 2000,
				})
			} catch (error) {
				// console.log('Selector not open dialog comment')
			}
			await page.keyboard.type(parsedArgs.type, { delay: 100 })
			await page.waitForTimeout(1000)
			await page.keyboard.press('Enter')
			await page.keyboard.press('Escape')
			await page.waitForTimeout(2000) // Tunggu selama 2 detik agar komentar dapat dimuat dengan benar
		} else {
			console.log(`Element at index ${parsedArgs.post} not found`)
		}
	} catch (err) {
		console.log(err.message)
	}
	process.exit()
}
run()
