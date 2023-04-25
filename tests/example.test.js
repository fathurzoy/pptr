const { util } = require('chai')
const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click, getText, getCount, shouldNotExist } = require('../lib/helpers')

describe('My First Puppeteer Test', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 90,
			devtools: false,
		})

		const page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	beforeEach(async function () {
		//Runs before each test step
	})

	afterEach(async function () {
		//Runs after each test step
	})

	it('should launch the browser', async function () {
		const page = await browser.newPage()
		await page.goto('http://example.com')
		await page.waitForXPath('//h1')
		const title = await page.title('')
		const url = await page.url()
		// const text = await page.$eval('h1', element => element.textContent)
		// const count = await page.$$eval('p', element => element.length)
		const text = await getText(page, 'h1')
		const count = await getCount(page, 'p')
		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com') //url
		expect(text).to.be.a('string', 'Example Domain') // expect variable text apakah sesuai yg di harapkan
		expect(count).to.equal(2) //equal adalah setara

		await page.goto('http://zero.webappsecurity.com/index.html')
		// await page.waitForSelector('#signin_button')
		// await page.click('#signin_button')
		await click(page, '#signin_button')

		await page.waitForTimeout(2000)
		await shouldNotExist(page, '#signin_button')
		// await page.waitForTimeout(() => !document.querySelector('#signin_button'))
		// await page.waitForSelector('#signin_button', {
		//     hidden : true,
		//     timeout : 3000,
		// })
		// const page = await browser.newPage()
		// await page.goto('http://example.com')
		// await page.waitForTimeout(3000)
		// await page.waitForSelector('h1')
		// await page.reload()
		// await page.waitForTimeout(3000)
		// await page.waitForSelector('h1')
		// await browser.close()

		// const page = await browser.newPage()
		// await page.goto('http://example.com')
		// await page.waitForSelector('h1')
		// await page.goto('https://dev.to/')
		// await page.waitForSelector('#page-content')
		// await page.goBack()
		// await page.waitForSelector('h1')
		// await page.goForward()
		// await page.waitForSelector('#page-content')
		// await browser.close()

		// const page = await browser.newPage()
		// await page.goto('https://devexpress.github.io/testcafe/example/') //access url
		// await page.type('#developer-name', 'Silv', { delay: 0 }) // input text
		// await page.click('#tried-test-cafe', { clickCount: 1 }) //click
		// await page.select('#preferred-interface', 'JavaScript API') //selectdropdown
		// const message = 'Lets fill that message with some text'
		// await page.type('#comments', message)
		// await page.click('#submit-button')
		// await page.waitForSelector('.result-content')
		// await page.waitForTimeout(500) //time run
		// await browser.close() //close browser

		// const page = await browser.newPage()
		// await page.goto('http://example.com/')
		// const title = await page.title()
		// const url = await page.url()
		// const text = await page.$eval('h1', element => element.textContent)
		// const count = await page.$$eval('p ', element => element.length )
		// console.log('Text in the H1 : ' + text )
		// console.log('Number of P tags on the page: ' + count)
		// await browser.close()

		// const page = await browser.newPage()
		// await page.goto('http://example.com/')
		// const title = await page.title()
		// const url = await page.url()
		// const text = await page.$eval('h1', element => element.textContent)
		// const count = await page.$$eval('p', element => element.length)
		// console.log('Text in the H1 : ' + text)
		// console.log('Number of P tags on the page : ' + count)
		// await browser.close()

		// await page.goto('http://zero.webappsecurity.com/')
		// await page.waitForSelector('#searchTerm') // digunakan untuk menunggu hingga suatu elemen atau selector tertentu di halaman web muncul sebelum melakukan tindakan selanjutnya, seperti mengisi form atau mengeklik tombol.
		// await page.type('#searchTerm', 'Hello World')
		// await page.keyboard.press('Enter', { delay : 10 })
		// await page.waitForTimeout(5000)
		// await browser.close()
	})
})
