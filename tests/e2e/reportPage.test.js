// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ujaran kebencian" 
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Ketelanjangan Orang Dewasa"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Bersifat Seksual"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Aktivitas Seksual"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Eksploitasi Seksual"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Layanan Seksual"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Ketelanjangan atau Konten Seksual" pilihOpsi="Melibatkan anak"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Kekerasan" pilihOpsi="Ancaman kekerasan nyata"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Kekerasan" pilihOpsi="Pencurian atau vandalisme"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Kekerasan" pilihOpsi="Bunuh diri atau melukai diri sendiri"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Kekerasan" pilihOpsi="Konten Sadis"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Pelecehan" pilihOpsi="Saya"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Pelecehan" pilihOpsi="Orang lain" 
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penjualan tidak resmi" pilihOpsi="Mempromosikan Penggunaan Obat Terlarang"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penjualan tidak resmi" pilihOpsi="Menjual atau membeli senjata api, senjata, obat-obatan terlarang"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penjualan tidak resmi" pilihOpsi="Penjualan Obat-obatan Resep"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penjualan tidak resmi" pilihOpsi="Mempromosikan Judi Online"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penjualan tidak resmi" pilihOpsi="Hal Lain"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Berpura-pura Menjadi Sesuatu" pilihOpsi="Saya"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Berpura-pura Menjadi Sesuatu" pilihOpsi="Selebriti" typeText="a"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Berpura-pura Menjadi Sesuatu" pilihOpsi="Teman" typeText="a"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Berpura-pura Menjadi Sesuatu" pilihOpsi="Bisnis" typeText="a"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penipuan" pilihOpsi="Meminta informasi keuangan kepada saya"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Penipuan" pilihOpsi="Lainnya"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Halaman Palsu"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Kekayaan intelektual"
// npm run test:reportPage id=j5vvm2b link="CONTOH211" problem="Hal Lainnya"

"Ujaran kebencian" 
"Ketelanjangan atau Konten Seksual"
	"Ketelanjangan Orang Dewasa"
	"Bersifat Seksual"
	"Aktivitas Seksual"
	"Eksploitasi Seksual"
	"Layanan Seksual"
	"Melibatkan anak"
"Kekerasan"
	"Ancaman kekerasan nyata"
	"Pencurian atau vandalisme"
	"Bunuh diri atau melukai diri sendiri"
	"Konten Sadis"
"Pelecehan"
	"Saya"
	"Orang lain"
"Penjualan tidak resmi"
	"Mempromosikan Penggunaan Obat Terlarang"
	"Menjual atau membeli senjata api, senjata, obat-obatan terlarang"
	"Penjualan Obat-obatan Resep"
	"Mempromosikan Judi Online"
	"Hal Lain"
"Berpura-pura Menjadi Sesuatu"
	"Saya"
	"Selebriti"
	"Teman"
	"Bisnis"
"Penipuan"
	"Meminta informasi keuangan kepada saya"
	"Lainnya"
"Halaman Palsu"
"Kekayaan intelektual"
"Hal Lainnya"

const puppeteer = require('puppeteer')
const axios = require('axios')

const args = process.argv // ['oke', 1, 55]
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
			await page.waitForTimeout(2000)
			await selectorOpsi[0].click()

			await page.waitForTimeout(2000)
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
						if (text === 'Ujaran kebencian') {
							await element.click()

							console.log('Ujaran kebencian')
							await page.waitForTimeout(1000)

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
							console.log("SELESAI")
						} else if (text === 'Ketelanjangan atau Konten Seksual') {
							await element.click()

							console.log('Ketelanjangan atau Konten Seksual')
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
									if (text2 === 'Ketelanjangan Orang Dewasa') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Bersifat Seksual') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}else if (text2 === 'Aktivitas Seksual') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Eksploitasi Seksual') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Layanan Seksual') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Melibatkan anak') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}
								}
							}
						} else if (text === 'Kekerasan') {
							await element.click()

							console.log('Kekerasan')
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
									if (text2 === 'Ancaman kekerasan nyata') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Pencurian atau vandalisme') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}else if (text2 === 'Bunuh diri atau melukai diri sendiri') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Konten Sadis') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} 
								}
							}
						} else if (text === 'Pelecehan') {
							await element.click()

							console.log('Pelecehan')
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

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Orang lain') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}
								}
							}
						} else if (text === 'Penjualan tidak resmi') {
							await element.click()

							console.log('Penjualan tidak resmi')
							await page.waitForTimeout(3000)
							const pilihOpsi = await page.$$(
								'div[role="list"] > div[role="listitem"] span[dir="auto"]'
							)
							console.log('pilihOpsi')
							console.log(pilihOpsi)

							for (const elementOpsi of pilihOpsi) {
								const textContent = await elementOpsi.getProperty('textContent')

								const text2 = await textContent.jsonValue()
								if (parsedArgs.pilihOpsi === text2) {
									if (text2 === 'Mempromosikan Penggunaan Obat Terlarang') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Menjual atau membeli senjata api, senjata, obat-obatan terlarang') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Penjualan Obat-obatan Resep') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Mempromosikan Judi Online') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Hal Lain') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}
								}
							}
						} else if (text === 'Berpura-pura Menjadi Sesuatu') {
							await element.click()

							console.log('Berpura-pura Menjadi Sesuatu')
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
										} catch (error) {}
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
										} catch (error) {}

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Teman') {
										await elementOpsi.click()
										console.log('Teman!')
										await page.waitForTimeout(2000)

										const typeTeman = await page.$$(`input[aria-label='Nama']`)
										await typeTeman[0].click()

										console.log(parsedArgs.typeText)
										await page.keyboard.type(parsedArgs.typeText, {
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

										try {
											await page.waitForSelector(`div[aria-label="Kirim"]`, {
												timeout: 2000,
											})
											const buttonKirim = await page.$(
												'div[aria-label="Kirim"]'
											)
											await buttonKirim.click()
											console.log(buttonKirim, 'Selanjutnya!')
										} catch (error) {}
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
										} catch (error) {}

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')

										await page.waitForTimeout(2000) 
									} else if (text2 === 'Selebriti') {
										await elementOpsi.click()
										console.log('Selebriti!')
										await page.waitForTimeout(2000)

										const typeSelebriti = await page.$$(
											`input[aria-label='Nama']`
										)
										await typeSelebriti[0].click()
										console.log(parsedArgs.typeText)
										await page.keyboard.type(parsedArgs.typeText, {
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

										try {
											await page.waitForSelector(`div[aria-label="Kirim"]`, {
												timeout: 2000,
											})
											const buttonKirim = await page.$(
												'div[aria-label="Kirim"]'
											)
											await buttonKirim.click()
											console.log(buttonKirim, 'Selanjutnya!')
										} catch (error) {}
										await page.waitForTimeout(3000)
										try {
											await page.waitForSelector(`div[aria-label="Kirim"]`, {
												timeout: 2000,
											})
											const buttonKirim = await page.$(
												'div[aria-label="Kirim"]'
											)
											await buttonKirim.click()
											console.log(buttonKirim, 'Selanjutnya!')
										} catch (error) {}
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
										} catch (error) {}

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')

										await page.waitForTimeout(2000) 
									} else if (text2 === 'Bisnis') {
										await elementOpsi.click()
										console.log('Bisnis!')
										await page.waitForTimeout(2000)

										const typeBisnis = await page.$$(
											`input[aria-label='Nama atau URL Halaman Facebook']`
										)
										await typeBisnis[0].click()
										
										console.log(parsedArgs.typeText)
										await page.keyboard.type(parsedArgs.typeText, {
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

										try {
											const buttonKirim = await page.$(
												'div[aria-label="Kirim"]'
											)
											await buttonKirim.click()
											console.log(buttonKirim, 'Selanjutnya!')
										} catch (error) {}
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
										} catch (error) {}

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')

										await page.waitForTimeout(2000) 
									}
								}
							}
						} else if (text === 'Penipuan') {
							await element.click()

							console.log('Penipuan')
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
									if (text2 === 'Meminta informasi keuangan kepada saya') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									} else if (text2 === 'Lainnya') {
										await elementOpsi.click()
										await page.waitForTimeout(1000)

										await page.waitForSelector(`div[aria-label="Selesai"]`, {
											timeout: 2000,
										})
										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'Selesai!')
									}
								}
							}
						} else if (text === 'Halaman Palsu') {
							await element.click()

							console.log('Halaman Palsu')
							await page.waitForTimeout(3000)

							const buttonKirim = await page.$('div[aria-label="Selesai"]')
							await buttonKirim.click()
							await page.waitForTimeout(3000)
						} else if (text === 'Kekayaan intelektual') {
							await element.click()

							console.log('Kekayaan intelektual')
							await page.waitForTimeout(3000)

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
