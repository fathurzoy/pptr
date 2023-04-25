// npm run test:reportUser id=j65aprq post=2 link="angger.bagussetiawan.3" problem="Berpura-pura Menjadi Orang Lain" pilihOpsi="Teman" temanType="Mba Ati"
// npm run test:reportUser id=j65aprq post=2 link="angger.bagussetiawan.3" problem="Berpura-pura Menjadi Orang Lain" pilihOpsi="Bisnis" BisnisType="Triple A"
//  npm run test:reportUser id=j65aprq post=2 link="angger.bagussetiawan.3" problem="Berpura-pura Menjadi Orang Lain" pilihOpsi="Selebriti" SelebritiType="Mbako Sumbing"
//  npm run test:reportUser id=j65aprq post=2 link="angger.bagussetiawan.3" problem="Saya Ingin Membantu" pilihOpsi="Bunuh diri"

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

		await page.goto('https://www.facebook.com/' + parsedArgs.link)

		// // Scroll
		// let loop = 0
		// while (loop < parsedArgs.post + 10) {
		// 	const selector = await page.$$(
		// 		`div[aria-posinset="${parsedArgs.post}"] div[aria-label="Lihat Opsi"]:nth-of-type(1)`
		// 	)
		// 	console.log(selector.length)
		// 	if (selector.length > 0) {
		// 		break
		// 	} else {
		// 		for (let index = 0; index < 2; index++) {
		// 			await page.waitForTimeout(1000)
		// 			await page.evaluate(() => {
		// 				setTimeout(() => {
		// 					window.scrollTo({
		// 						top: window.pageYOffset + 1000,
		// 						behavior: 'smooth',
		// 					})
		// 				}, 100) // delay for 1 second before scrolling
		// 			})
		// 		}
		// 	}
		// 	loop++
		// }

		// Mengklik opsi
		const countOpsi = await page.$$eval(
			"div[aria-label='Lihat Opsi']",
			element => element.length
		)
		console.log(countOpsi)

		if (countOpsi) {
			const selectorOpsi = await page.$$("div[aria-label='Lihat Opsi']")
			console.log(selectorOpsi, 'OPSI')
			await page.waitForTimeout(1000)
			await selectorOpsi[0].click()

			await page.waitForTimeout(1000)
			// Mengklik "Cari dukungan atau laporkan"
			await page.waitForXPath(
				"//span[contains(text(), 'Cari dukungan atau laporkan')]",
				{
					timeout: 5000,
				}
			)
			const [laporkanElement] = await page.$x(
				"//span[contains(text(), 'Cari dukungan atau laporkan')]"
			)

			if (laporkanElement) {
				await laporkanElement.click()
				await page.waitForTimeout(5000)

				// Membaca semua elemen dari "Cari dukungan atau laporkan"
				const elementsLaporkan = await page.$$(
					'div[role="list"] > div[role="listitem"] span[dir="auto"]'
				)

				for (const element of elementsLaporkan) {
					const textContent = await element.getProperty('textContent')
					const text = await textContent.jsonValue()
					console.log(text)
					if (parsedArgs.problem === text) {
						if (text === 'Berpura-pura Menjadi Orang Lain') {
							await element.click()

							console.log('Berpura-pura Menjadi Orang Lain')
							await page.waitForTimeout(3000)
							const pilihOpsi = await page.$$(
								'div[role="list"] > div[role="listitem"] span[dir="auto"]'
							)
							console.log('pilihOpsi')
							console.log(pilihOpsi)

							for (const elementOpsi of pilihOpsi) {
								const textContent = await elementOpsi.getProperty('textContent')

								const text2 = await textContent.jsonValue()
								console.log(text2, 'Saya')
								if (parsedArgs.pilihOpsi === text2) {
									if (text2 === 'Saya') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)
										console.log('Saya!')
										await page.waitForTimeout(2000)
										try {
											const buttonKirim = await page.$(
												'div[aria-label="Kirim"]'
											)
											await buttonKirim.click()
											console.log(buttonKirim, 'Selanjutnya!')
										} catch (error) {
											// console.log('Selector not open dialog comment')
										}
										await page.waitForTimeout(3000)

										try {
											await page.waitForSelector(
												`div[aria-label="Selanjutnya"]`,
												{
													timeout: 2000,
												}
											)
											const buttonSelanjutnya = await page.$(
												'div[aria-label="Selanjutnya"]'
											)
											await buttonSelanjutnya.click()
											console.log(buttonSelanjutnya, 'Selanjutnya!')
										} catch (error) {
											// console.log('Selector not open dialog comment')
										}

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}
									if (text2 === 'Teman') {
										await elementOpsi.click()
										console.log('Teman!')
										await page.waitForTimeout(2000)

										const typeTeman = await page.$$(`input[aria-label='Nama']`)
										await typeTeman[0].click()
										// await page.keyboard.type('a', {
										// 	delay: 100,
										// })
										console.log(parsedArgs.temanType)
										await page.keyboard.type(parsedArgs.temanType, {
											delay: 100,
										})
										await page.waitForTimeout(2000)
										await page.waitForSelector(
											`ul[role="listbox"] li:nth-child(1)`,
											{
												timeout: 2000,
											}
										)

										const clickSelebriti = await page.$$(
											`ul[role="listbox"] li:nth-child(1)`
										)
										console.log(clickSelebriti)
										await clickSelebriti[0].click()
										await page.waitForTimeout(2000)

										const buttonKirim = await page.$(
											`div[aria-label='Kirim'] div div div span[dir='auto'] span`
										)
										await buttonKirim.click()
										await page.waitForTimeout(2000)

										try {
											const buttonKirim2 = await page.$(
												`div[aria-label='Kirim'] div div div span[dir='auto'] span`
											)
											await buttonKirim2.click()

											try {
												await page.waitForSelector(
													`div[aria-label="Selanjutnya"]`,
													{
														timeout: 2000,
													}
												)
												const buttonSelanjutnya = await page.$(
													'div[aria-label="Selanjutnya"]'
												)
												await buttonSelanjutnya.click()
												console.log(buttonSelanjutnya, 'Selanjutnya!')
											} catch (error) {
												// console.log('Selector not open dialog comment')
											}

											await page.waitForSelector(`div[aria-label="Selesai"]`, {
												timeout: 2000,
											})
											const buttonSelesai = await page.$(
												'div[aria-label="Selesai"]'
											)
											await buttonSelesai.click()
											console.log(buttonSelesai, 'Selesai!')
										} catch (error) {
											// console.log('Selector not open dialog comment')
										}

										await page.waitForTimeout(2000) // Tunggu selama 2 detik agar komentar dapat dimuat dengan benar
									}
									if (text2 === 'Selebriti') {
										await elementOpsi.click()
										console.log('Selebriti!')
										await page.waitForTimeout(2000)

										const typeSelebriti = await page.$$(
											`input[aria-label='Nama']`
										)
										await typeSelebriti[0].click()
										// await page.keyboard.type('a', {
										// 	delay: 100,
										// })
										console.log(parsedArgs.SelebritiType)
										await page.keyboard.type(parsedArgs.SelebritiType, {
											delay: 100,
										})
										await page.waitForTimeout(2000)
										await page.waitForSelector(
											`ul[role="listbox"] li:nth-child(1)`,
											{
												timeout: 2000,
											}
										)

										const clickSelebriti = await page.$$(
											`ul[role="listbox"] li:nth-child(1)`
										)
										console.log(clickSelebriti)
										await clickSelebriti[0].click()
										await page.waitForTimeout(2000)

										const buttonKirim = await page.$(
											`div[aria-label='Kirim'] div div div span[dir='auto'] span`
										)
										await buttonKirim.click()
										await page.waitForTimeout(2000)

										try {
											const buttonKirim2 = await page.$(
												`div[aria-label='Kirim'] div div div span[dir='auto'] span`
											)
											await buttonKirim2.click()

											try {
												await page.waitForSelector(
													`div[aria-label="Selanjutnya"]`,
													{
														timeout: 2000,
													}
												)
												const buttonSelanjutnya = await page.$(
													'div[aria-label="Selanjutnya"]'
												)
												await buttonSelanjutnya.click()
												console.log(buttonSelanjutnya, 'Selanjutnya!')
											} catch (error) {
												// console.log('Selector not open dialog comment')
											}

											await page.waitForSelector(`div[aria-label="Selesai"]`, {
												timeout: 2000,
											})
											const buttonSelesai = await page.$(
												'div[aria-label="Selesai"]'
											)
											await buttonSelesai.click()
											console.log(buttonSelesai, 'Selesai!')
										} catch (error) {
											// console.log('Selector not open dialog comment')
										}

										await page.waitForTimeout(2000) // Tunggu selama 2 detik agar komentar dapat dimuat dengan benar
									}
									if (text2 === 'Bisnis') {
										await elementOpsi.click()
										console.log('Bisnis!')
										await page.waitForTimeout(2000)

										const typeBisnis = await page.$$(
											`input[aria-label='Nama atau URL Halaman Facebook']`
										)
										await typeBisnis[0].click()
										// await page.keyboard.type('a', {
										// 	delay: 100,
										// })
										console.log(parsedArgs.BisnisType)
										await page.keyboard.type(parsedArgs.BisnisType, {
											delay: 100,
										})
										await page.waitForTimeout(2000)
										await page.waitForSelector(
											`ul[role="listbox"] li:nth-child(1)`,
											{
												timeout: 2000,
											}
										)

										const clickSelebriti = await page.$$(
											`ul[role="listbox"] li:nth-child(1)`
										)
										console.log(clickSelebriti)
										await clickSelebriti[0].click()
										await page.waitForTimeout(2000)

										const buttonKirim = await page.$(
											`div[aria-label='Kirim'] div div div span[dir='auto'] span`
										)
										await buttonKirim.click()
										await page.waitForTimeout(2000)

										try {
											const buttonKirim2 = await page.$(
												`div[aria-label='Kirim'] div div div span[dir='auto'] span`
											)
											await buttonKirim2.click()
											await page.waitForTimeout(3000) // Tunggu selama 2 detik agar komentar dapat dimuat dengan benar

											try {
												await page.waitForSelector(
													`div[aria-label="Selesai"]`,
													{
														timeout: 3000,
													}
												)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'Selesai!')
											} catch (error) {}

											// await page.waitForSelector(`div[aria-label="Selesai"]`, {
											// 	timeout: 2000,
											// })
											// const buttonSelesai = await page.$(
											// 	'div[aria-label="Selesai"]'
											// )
											// await buttonSelesai.click()
											// console.log(buttonSelesai, 'Selesai!')
										} catch (error) {
											// console.log('Selector not open dialog comment')
										}

										await page.waitForTimeout(2000) // Tunggu selama 2 detik agar komentar dapat dimuat dengan benar
									}
								}
							}
						} else if (text === 'Akun Palsu') {
							await element.click()

							console.log('Akun Palsu')
							await page.waitForTimeout(1000)

							const buttonKirim = await page.$('div[aria-label="Kirim"]')
							await buttonKirim.click()

							// await page.waitForTimeout(3000)
							// await page.waitForSelector('div[aria-label="Selesai"]')
							// const buttonSelesai = await page.$('div[aria-label="Selesai"]')
							// await buttonSelesai.click()
							// await page.waitForTimeout(2000)
							// const buttonSelanjutnya = await page.$(
							// 	'div[aria-label="Selanjutnya"]'
							// )
							// await buttonSelanjutnya.click()
						} else if (text === 'Memposting Sesuatu yang Tidak Pantas') {
							await element.click()

							console.log('Memposting Sesuatu yang Tidak Pantas')
							await page.waitForTimeout(1000)

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
						} else if (text === 'Pelecehan atau Perundungan (Bullying)') {
							await element.click()

							console.log('Pelecehan atau Perundungan (Bullying)')
							await page.waitForTimeout(3000)

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
							await page.waitForTimeout(3000)
						} else if (text === 'Saya Ingin Membantu') {
							await element.click()
							const pilihOpsi = await page.$$(
								'div[role="list"] > div[role="listitem"] span[dir="auto"]'
							)
							await page.waitForTimeout(3000)

							console.log('Saya ingin Membantu')
							await page.waitForTimeout(3000)

							for (const elementMembantu of pilihOpsi) {
								const textContent = await elementMembantu.getProperty(
									'textContent'
								)
								const text5 = await textContent.jsonValue()
								if (parsedArgs.pilihOpsi === text5) {
									if (text5 == 'Bunuh diri') {
										await elementMembantu.click()
										await page.waitForTimeout(1000)
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										await page.waitForTimeout(3000)
									}
									if (text5 === 'Melukai diri sendiri') {
										await elementMembantu.click()

										await page.waitForTimeout(3000)

										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										await page.waitForTimeout(3000)
									}
									if (text5 === 'Pelecehan') {
										await elementMembantu.click()

										await page.waitForTimeout(3000)

										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										await page.waitForTimeout(3000)
									}
									if (text5 === 'Dibajak') {
										await elementMembantu.click()

										await page.waitForTimeout(5000)

										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										await page.waitForTimeout(3000)
									}
								}
							}

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
							await page.waitForTimeout(3000)
						} else if (text === 'Hal Lainnya') {
							await element.click()

							console.log('Hal Lainnya')
							await page.waitForTimeout(3000)

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
							await page.waitForTimeout(3000)
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err, 'test error')
	}
	process.exit()
}
run()
