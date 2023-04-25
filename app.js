//npm run test:likeFb post=2 id=j5p4ni9 link=INAGAME.ID
const express = require('express')
const { exec } = require('child_process')
const { default: axios } = require('axios')
const app = express()
const fs = require('fs').promises
const filePath = './tests/e2e/db/'

async function test(fileName) {
	// check file exist
	try {
		const files = await fs.readFile(filePath + fileName)
		return true
	} catch (err) {
		return false
	}
}

async function sendRequest(id) {
	try {
		const response = await axios({
			method: 'GET',
			url: 'http://127.0.0.1:50325/api/v1/browser/start?user_id=' + id,
		})

		await fs.writeFile(filePath + id + '.json', JSON.stringify(response.data))
		return true
	} catch (err) {
		return false
	}
}

app.use(express.json())

app.post('/', async (req, res) => {
	let data = req.body
	let cmd = 'npm run ' + data.run
	let id = 0
	Object.keys(data.args).forEach(function (key) {
		if (key == 'id') id = data.args[key]
		cmd += ' ' + key + '=' + data.args[key]
	})

	let checkFile = await test(id + '.json')
	if (!checkFile) {
		await sendRequest(id)
	}

	exec(cmd, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`)
			return
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`)
			return
		}
		console.log(`stdout: ${stdout}`)
	})
	res.json({ cmd: cmd })
})

const server = app.listen(3000, () => {
	console.log('server up')
})
