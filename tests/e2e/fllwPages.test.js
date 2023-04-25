//npm run test:likeFb post=2 id=j63aic8 link=INAGAME.ID

const puppeteer = require('puppeteer')
const axios = require('axios')

const args = process.argv.slice(3) // ['oke', 1, 55]
const parsedArgs = {}
args.forEach(arg => {
	const [key, value] = arg.split('=')
	parsedArgs[key] = value
})

console.log(parsedArgs, '1')
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

		console.log(parsedArgs.link, '2') // Output: 12
		await page.goto('https://www.facebook.com/' + parsedArgs.link)
		await page.waitForTimeout(2000)

		// Fllw
		const elementToLike = await page.$$(
			`div[aria-label='Suka'] div div div span[dir='auto'] span`
		)
		if (elementToLike.length > 0) {
			await page.waitForTimeout(1000)
			await elementToLike[0].click()
			await page.waitForTimeout(1000)
			console.log('FLWW PAGE!')
		} else {
			console.log('No element to FLLW PAGE found')
		}
	} catch (err) {
		console.log(err, 'test error')
	}
	process.exit()
}
run()
