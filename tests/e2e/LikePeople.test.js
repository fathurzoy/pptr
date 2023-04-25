const puppeteer = require('puppeteer')
const axios = require('axios')

const data = require('./db.json') // data ws
const puppeteerUrl = data.data.ws.puppeteer // url puppeteer

//npm run test:shareFb -- val1=comment val2=2 link=https://www.facebook.com/INAGAME.ID

const args = process.argv.slice(3) // ['oke', 1, 55]
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
		// await page.goto('https://www.facebook.com')
		// // // await page.goto('https://www.facebook.com/groups/242491427173554/permalink/765652264857465/');
		// // await page.goto('https://www.facebook.com/INAGAME.ID');
		// await page.waitForSelector('#email', { visible: true })
		// await page.type('#email', 'Silviani Nurlita Putri')
		// await page.type('#pass', 'berantakan123')
		// await page.keyboard.press('Enter')
		// await page.waitForNavigation()
		// await page.waitForTimeout(2000)

		console.log(parsedArgs.link) // Output: 123

		await page.goto(parsedArgs.link)

		// // Scroll
		// for (let index = 0; index < 5; index++) {
		// 	await page.waitForTimeout(1000)
		// 	await page.evaluate(() => {
		// 		setTimeout(() => {
		// 			window.scrollTo({
		// 				top: window.pageYOffset + 500,
		// 				behavior: 'smooth',
		// 			})
		// 		}, 100) // delay for 1 second before scrolling
		// 	})
		// }
		// await page.evaluate(() => {
		// 	setTimeout(() => {
		// 		window.scrollTo({
		// 			top: 0,
		// 			behavior: 'smooth',
		// 		})
		// 	}, 1000) // delay for 1 second before scrolling
		// })
		await page.waitForTimeout(1000) // random

		// Like
		const countLike = await page.$$eval(
			'div[aria-posinset="1"] div[aria-label="Suka"]:nth-of-type(1)',
			element => element.length
		)
		console.log(`count like ${countLike}`)
		if (countLike > 0) {
			// console.log()
			// await page.waitForSelector("div[aria-label='Suka']", {visible: true});
			const selectorsLike = await page.$$(
				'div[aria-posinset="1"] div[aria-label="Suka"]:nth-of-type(1)'
			)
			console.log(selectorsLike)
			await Promise.all(
				selectorsLike.map(async (selector, index, arr) => {
					console.log(selector)
					if (selector && index == 0) {
						await page.waitForTimeout(1000)
						selector.click(selector)
						await page.waitForTimeout(1000)
					}
					//  else {
					// 	await page.waitForTimeout(1000)
					// 	console.log(`Element ${selector} not found.`)
					// }
				})
			)
			// for (let i = 1; i < 2; i++) {
			//   await page.waitForTimeout(1000);
			//   await selectorsLike[i].click();
			// }
		}

		await page.waitForTimeout(1000)

		// // Logout
		// await page.click(
		// 	"div[aria-label='Kontrol dan Pengaturan Akun'] span div div[role='button'] div div[data-visualcompletion='ignore']"
		// )
		// await page.waitForSelector(
		// 	"div[data-nocookies='true'] div[role='button']",
		// 	{ visible: true }
		// )
		// await page.click("div[data-nocookies='true'] div[role='button']")

		// // Take a screenshot and close the browser
		// // await page.screenshot({ path: './facebook.png' });
		// await browser.close()
	} catch (err) {
		console.log(err.message)
	}
}
run()
