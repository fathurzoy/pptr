/* 	npm run test:report id=j65aprq post=2 problem=1 kekerasan=2 link=https://www.facebook.com/efasnakindramayu
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem=Kekerasan kekerasanOpsi="Konten sadis"
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem=Ketelanjangan ketelanjanganOpsi=Ketelanjangan Orang Dewasa
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem="Penjualan tidak resmi" penjualanOpsi="Obat Terlarang"
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem="Informasi palsu" informasiPalsuOpsi="Obat Terlarang"
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem="Terorisme"
	npm run test:report id=j65aprq post=2 link=auliakechil.kechil.3 problem="Ujaran Kebencian" ujaranOpsi="Asal Negara"
	npm run test:report id=j65aprq post=3 link=auliakechil.kechil.3 problem="Hal Lain" halOpsi="Kekayaan intelektual" */

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

		// Scroll
		let loop = 0
		while (loop < parsedArgs.post + 10) {
			const selector = await page.$$(
				`div[aria-posinset="${parsedArgs.post}"] div[aria-label="Tindakan untuk postingan ini"]:nth-of-type(1)`
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

		//  Report
		const countTindakan = await page.$$eval(
			'div[aria-label="Tindakan untuk postingan ini"]',
			element => element.length
		)
		if (countTindakan > 0) {
			const selectorsTindakan = await page.$$(
				'div[aria-label="Tindakan untuk postingan ini"]'
			)
			console.log(selectorsTindakan, 'TINDAKAN!')
			await page.waitForTimeout(1000)
			if (parsedArgs.post) {
				selectorsTindakan[parsedArgs.post].click()
				await page.waitForTimeout(1000)
				await page.waitForXPath(
					"//span[normalize-space()='Laporkan postingan'][1]"
				)
				const [laporkanPostingan] = await page.$x(
					"//span[normalize-space()='Laporkan postingan'][1]"
				)
				// console.log(laporkanPostingan, 'LAPORKAN!')
				await laporkanPostingan.click()
				await page.waitForTimeout(2000)

				//problem
				console.log(parsedArgs.problem, 'parse progblem')
				if (parsedArgs.problem) {
					const selector = selectorsTindakan[parsedArgs.post]
					if (selector) {
						// await selector.click()
						// await page.waitForXPath("//div[@role='dialog']")
						// await page.waitForTimeout(1000)

						const elementProblem = await page.$$(
							'div[role="list"] > div[role="listitem"] span[dir="auto"]'
						)

						for (const element of elementProblem) {
							const textContent = await element.getProperty('textContent')
							const text = await textContent.jsonValue()
							console.log(parsedArgs.problem, text, 'text loop')
							if (parsedArgs.problem === text) {
								if (text === 'Spam') {
									await element.click()

									console.log('SPAM IN')
									await page.waitForTimeout(1000)

									const buttonKirim = await page.$('div[aria-label="Kirim"]')
									await buttonKirim.click()

									await page.waitForTimeout(1000)

									const buttonSelesai = await page.$(
										'div[aria-label="Selesai"]'
									)
									await buttonSelesai.click()
								} else if (text === 'Ketelanjangan') {
									await element.click()

									const ketelanjanganOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('KetelanjanganOpsi')
									console.log(ketelanjanganOpsi)

									for (const elementKetelanjangan of ketelanjanganOpsi) {
										const textContent = await elementKetelanjangan.getProperty(
											'textContent'
										)

										const text2 = await textContent.jsonValue()
										console.log(text2, 'Ketelanjangan Orang Dewasa')
										if (parsedArgs.ketelanjanganOpsi === text2) {
											if (text2 === 'Ketelanjangan Orang Dewasa') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('Ketelanjangan Orang Dewasa!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Bersifat Seksual') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('BERSIFAT SEKSUAL!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Aktivas Seksual') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('AKTIVAS SEKSUAL!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Eksploitasi Seksual') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('EKSPLOITASI SEKSUAL!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Layanan Seksual') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('LAYANAN SEKSUAL!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Melibatkan anak') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('MELIBATKAN ANAK!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
											if (text2 === 'Membagikan gambar pribadi') {
												await elementKetelanjangan.click()
												await page.waitForTimeout(1000)
												console.log('MEMBAGIKAN GAMBAR PRIBADI!')
												await page.waitForTimeout(1000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}
										}
									}
								} else if (text === 'Kekerasan') {
									await element.click()

									const kekerasanOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('kekerasanOpsi')
									console.log(kekerasanOpsi)

									for (const elementKekerasan of kekerasanOpsi) {
										const textContent = await elementKekerasan.getProperty(
											'textContent'
										)
										const text1 = await textContent.jsonValue()
										console.log(text1, 'Konten Sadis')
										if (parsedArgs.kekerasanOpsi === text1) {
											if (text1 === 'Konten Sadis') {
												await elementKekerasan.click()
												console.log('KONTENSADIS!')

												await page.waitForTimeout(1000)

												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
												console.log(buttonSelesai, 'SELESAI!')
											}

											if (text1 === 'Kematian atau Cedera Parah') {
												await elementKekerasan.click()
												console.log('KEMATIAN ATAU CEDERA PARAH!')

												await page.waitForTimeout(2000)

												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
											}
											if (text1 === 'Ancaman Kekerasan') {
												await elementKekerasan.click()
												console.log('ANCAMAN KEKERASAN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text1 === 'Penyiksaan Hewan') {
												await elementKekerasan.click()
												console.log('PENYIKSAAN HEWAN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text1 === 'Kekerasan Seksual') {
												await elementKekerasan.click()
												console.log('KEKERASAN SEKSUAL!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text1 === 'Hal Lain') {
												await elementKekerasan.click()
												console.log('HAL LAIN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								} else if (text === 'Penjualan tidak resmi') {
									await element.click()
									const penjualanOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('penjualanOpsi')
									console.log(penjualanOpsi)

									for (const elementUjaran of penjualanOpsi) {
										const textContent = await elementPenjualan.getProperty(
											'textContent'
										)
										const text3 = await textContent.jsonValue()
										console.log(text3, 'Obat Terlarang')
										if (parsedArgs.penjualanOpsi === text3) {
											if (text3 === 'Obat Terlarang') {
												await elementPenjualan.click()
												console.log('OBAT TERLARANG!')

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text3 === 'Senjata') {
												await elementPenjualan.click()
												console.log('SENJATA!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text3 === 'Hewan Langka') {
												await elementPenjualan.click()
												console.log('HEWAN LANGKA!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text3 === 'Hewan Lain') {
												await elementPenjualan.click()
												console.log('HEWAN LAIN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text3 === 'Hal Lain') {
												await elementPenjualan.click()
												console.log('Hal LAIN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								}
								// ARRAY UNTUK PELECEHAN TEMAN
								else if (text === 'Pelecehan') {
									await element.click()
									const pelecehanOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('pelecehanOpsi')
									console.log(pelecehanOpsi)

									for (const elementPelecehan of pelecehanOpsi) {
										const textContent = await elementPelecehan.getProperty(
											'textContent'
										)
										const text4 = await textContent.jsonValue()
										console.log(text4, 'Saya')

										if (parsedArgs.pelecehanOpsi === text4) {
											if (text4 === 'Saya') {
												await elementPelecehan.click()
												console.log('SAYA!')
												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text4 === 'Teman') {
												await elementPelecehan.click()
												console.log('Teman!')
												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								} else if (text === 'Terorisme') {
									await element.click()

									if (text === 'Terorisme') {
										await element.click()

										console.log('TERORISME')
										await page.waitForTimeout(1000)

										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'SELESAI!')
									}
								} else if (text === 'Ujaran kebencian') {
									await element.click()
									const ujaranOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('UJARAN OPSI')
									// console.log(ujaranOpsi)

									for (const elementUjaran of ujaranOpsi) {
										const textContent = await elementUjaran.getProperty(
											'textContent'
										)
										const text5 = await textContent.jsonValue()
										console.log(text5, 'Ras atau Etnis')
										if (parsedArgs.ujaranOpsi === text5) {
											if (text5 === 'Ras atau Etnis') {
												await elementUjaran.click()
												console.log('RAS ATAU ETNIS!')

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Asal Negara') {
												await elementUjaran.click()
												console.log('ASAL NEGARA!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Afiliasi Agama') {
												await elementUjaran.click()
												console.log('AFILIASI AGAMA!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Kasta Sosial') {
												await elementUjaran.click()
												console.log('Kasta Sosial!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Orientasi Seksual') {
												await elementUjaran.click()
												console.log('ORIENTASI SEKSUAL!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Jenis Kelamin atau Identitas Gender') {
												await elementUjaran.click()
												console.log('Jenis Kelamin atau Identitas Gender!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Disabilitas atau Penyakit') {
												await elementUjaran.click()
												console.log('DISABILITAS ATAU PENYAKIT!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text5 === 'Hal Lain') {
												await elementUjaran.click()
												console.log('HAL LAIN!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								} else if (text === 'Informasi palsu') {
									await element.click()
									const informasiPalsuOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('PALSU OPSI')
									console.log(informasiPalsuOpsi)

									for (const elementInformasi of informasiPalsuOpsi) {
										const textContent = await elementInformasi.getProperty(
											'textContent'
										)
										const text6 = await textContent.jsonValue()
										console.log(text6, 'Kesehatan')
										if (parsedArgs.informasiPalsuOpsi === text6) {
											if (text6 === 'Kesehatan') {
												await elementInformasi.click()
												console.log('KESEHATAN!')

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Kirim"]'
												)
												await buttonKirim.click()

												await page.waitForTimeout(3000)

												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
											}
											if (text6 === 'Politik') {
												await elementInformasi.click()
												console.log('POLITIK!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text6 === 'Isu Sosial') {
												await elementInformasi.click()
												console.log('ISU SOSIAL!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text6 === 'Hal Lain') {
												await elementInformasi.click()
												console.log('Hal Lain!')

												await page.waitForTimeout(2000)

												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								} else if (text === 'Bunuh diri atau melukai diri sendiri') {
									await element.click()
									if (text === 'Bunuh diri atau melukai diri sendiri') {
										await element.click()

										console.log('Bunuh diri atau melukai diri sendiri')
										await page.waitForTimeout(3000)

										const buttonSelesai = await page.$(
											'div[aria-label="Selesai"]'
										)
										await buttonSelesai.click()
										console.log(buttonSelesai, 'SELESAI!')
									}
								} else if (text === 'Hal Lain') {
									await element.click()
									await page.waitForTimeout(2000)
									const halOpsi = await page.$$(
										'div[role="list"] > div[role="listitem"] span[dir="auto"]'
									)
									console.log('halOpsi')
									console.log('xo ', halOpsi)

									for (const elementhalLain of halOpsi) {
										const textContent = await elementhalLain.getProperty(
											'textContent'
										)
										const text7 = await textContent.jsonValue()
										// console.log('xo ', text7)
										console.log('parsedArgs.halOpsi', parsedArgs.halOpsi)
										if (parsedArgs.halOpsi === text7) {
											console.log('text7', text7)
											console.log('run')

											if (text7 === 'Kekayaan intelektual') {
												console.log('run')
												await elementhalLain.click()
												await page.waitForTimeout(1000)
												console.log(elementhalLain, 'Kekayaan intelektual!')

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Penipuan') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Penipuan!')
												await page.waitForTimeout(2000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
											}

											// await page.waitForTimeout(1000)
											// const buttonKirim = await page.$(
											// 	'div[aria-label="Kirim"]'
											// )
											// await buttonSelanjutnya.click()

											// await page.waitForTimeout(1000)
											// const buttonSelanjutnya = await page.$(
											// 	'div[aria-label="Selanjutnya"]'
											// )
											// await buttonKirim.click()

											if (text7 === 'Pelanggaran Privasi') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Pelanggaran Privasi!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Mengejek Korban') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Mengejek Korban!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Perundungan (Bullying)') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Perundungan (Bullying)!')

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}

											if (text7 === 'Kekerasan Anak') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Kekerasan Anak!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Penyiksaan Hewan') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Penyiksaan Hewan!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Aktivitas Seksual') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Aktivitas Seksual!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Bunuh diri atau melukai diri sendiri') {
												await elementhalLain.click()
												console.log(
													elementhalLain,
													'Bunuh diri atau melukai diri sendiri!'
												)

												await page.waitForTimeout(3000)
												const buttonSelesai = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonSelesai.click()
											}
											if (text7 === 'Ujaran kebencian') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Ujaran kebencian!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Mempromosikan Penggunaan Obat Terlarang') {
												await elementhalLain.click()
												console.log(
													elementhalLain,
													'Mempromosikan Penggunaan Obat Terlarang!'
												)

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Foto Intim Non-Konsensual') {
												await elementhalLain.click()
												console.log(
													elementhalLain,
													'Foto Intim Non-Konsensual!'
												)

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Eksploitasi Seksual') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Eksploitasi Seksual!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Pelecehan') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Pelecehan!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Penjualan tidak resmi') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Penjualan tidak resmi!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Kekerasan') {
												await elementhalLain.click()
												console.log(elementhalLain, 'Kekerasan!')

												await page.waitForTimeout(2000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
											if (text7 === 'Membagikan gambar pribadi') {
												await elementhalLain.click()
												console.log(
													elementhalLain,
													'Membagikan gambar pribadi!'
												)

												await page.waitForTimeout(1000)
												const buttonKirim = await page.$(
													'div[aria-label="Selesai"]'
												)
												await buttonKirim.click()
											}
										}
									}
								}
							}
						}
						// if (problemIndex >= 0 && problemIndex < problemList.length) {
						//     const [selectedProblem] = await page.$x(`//span[normalize-space()='${problemList[problemIndex]}']`);

						//     await selectedProblem.click()
						//     await page.waitForTimeout(2000)
						// }

						// const problemIndex = parsedArgs.problem
						// if (problemIndex >= 0 && problemIndex < problemList.length) {
						// 	const [selectedProblem] = await page.$x(
						// 		`//span[normalize-space()='${problemList[problemIndex]}']`
						// 	)
						// 	await selectedProblem.click()
						// 	await page.waitForTimeout(2000)
						// }
					} else {
						console.error('Selector is not found')
					}
				}

				//listProblem
				// if (parsedArgs.problem) {
				// 	const problemList = [
				// 		'Ketelanjangan',
				// 		'Spam',
				// 		'Kekerasan',
				// 		'Penjualan tidak resmi',
				// 		'Pelecehan',
				// 		'Terorisme',
				// 		'Ujaran kebencian',
				// 		'Informasi palsu',
				// 		'Bunuh diri atau melukai diri sendiri',
				// 		'Hal lain',
				// 	]
				// 	const problemIndex = parsedArgs.problem // 3
				// 	if (problemIndex >= 0 && problemIndex < problemList.length) {
				// 		const [selectedProblem] = await page.$x(
				// 			`//span[normalize-space()='${problemList[problemIndex]}']`
				// 		)

				// 		await selectedProblem.click()
				// 		await page.waitForTimeout(2000)

				// 	// Jika opsi yang dipilih adalah "Spam", klik tombol "Selesai"
				// 	if (problemList[problemIndex] === 'Spam') {
				// 		const [kirimButton] = await page.$x(
				// 			"//span[normalize-space()='Kirim']"
				// 		)
				// 		console.log(kirimButton, 'KIRIM!')
				// 		await kirimButton.click()
				// 		await page.waitForTimeout(2000)

				// 		const [selesaiButton] = await page.$x(
				// 			"//span[normalize-space()='Selesai']"
				// 		)
				// 		console.log(selesaiButton, 'SELESAI!')
				// 		await selesaiButton.click()
				// 		await page.waitForTimeout(2000)
				// 	}
				// }
				// else if (problemList[problemIndex] === 'Kekerasan') {
				// 	if (parsedArgs.kekerasan) {
				// 		const kekerasan = [
				// 			'Konten Sadis',
				// 			'Kematian atau Cedera Parah',
				// 			'Ancaman Kekerasan',
				// 			'Penyiksaan Hewan',
				// 			'Kekerasan Seksual',
				// 			'Hal Lain',
				// 		]

				// 		console.log('Pilih opsi kekerasan berikut:')
				// 		kekerasan.forEach((option, index) => {
				// 			console.log(`${index + 1}. ${option}`)
				// 		})

				// 		const input = await page.prompt()
				// 		const selectedOption = kekerasan[parseInt(input) - 1]

				// 		const optionsForSelectedOption = options[selectedOption]
				// 		console.log('Pilih salah satu opsi berikut:')
				// 		optionsForSelectedOption.forEach((option, index) => {
				// 			console.log(`${index + 1}. ${option}`)
				// 		})

				// 		const optionInput = await page.prompt()
				// 		const selectedOptionForSelectedOption =
				// 			optionsForSelectedOption[parseInt(optionInput) - 1]

				// 		const [selectedProblem] = await page.$x(
				// 			`//span[normalize-space()='${selectedOptionForSelectedOption}']`
				// 		)
				// 		await selectedProblem.click()
				// 		await page.waitForTimeout(2000)
				// 	}
				// }
				// }
			}
			// 	try {
			// 		await page.waitForXPath(`//span[normalize-space()='Spam'][1]`, {
			// 			timeout: 2000,
			// 		})
			// 	} catch (error) {
			// 		console.log('Spam timeout')
			// 	}
			// 	await page.waitForTimeout(1000)
			// 	await page.waitForXPath("//span[normalize-space()='Spam'][1]")
			// 	const [spam] = await page.$x("//span[normalize-space()='Spam'][1]")
			// 	await spam.click()
			// } else {
			// 	selectorsTindakan.slice(0, 1).forEach(async (selector, index) => {
			// 		console.log('qq')
			// 		await page.waitForTimeout(1000)
			// 		// await selector.click( { delay: 500 })
			// 		selectorsTindakan[index].click()
			// 		await page.waitForXPath("//span[contains(text(), 'Kirim')][1]")
			// 		const [laporkanPostingan] = await page.$x(
			// 			"//span[contains(text(), 'Kirim')][1]"
			// 		)
			// 		await laporkanPostingan.click()

			// 		await page.click("div[role='Spam']", parsedArgs.click)
			// 	})
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
		console.log(err, 'test error')
	}
	process.exit()
}
run()
