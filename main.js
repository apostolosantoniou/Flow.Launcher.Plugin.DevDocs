import open from 'open'
import { match } from './docs.js'

const { method, parameters } = JSON.parse(process.argv[2])

if (method === "query") {
	const result = match(parameters[0])

	if (result) {
		console.log(JSON.stringify(
			{
				"result": [{
					"Title": result.name,
					"Subtitle": result.url,
					"JsonRPCAction": {
						"method": "load_url",
						"parameters": [result?.url]
					},
					"IcoPath": `icons/${result.key}.png`
				}]
			}
		));
	} else {
		console.log(JSON.stringify(
			{
				"result": [{
					"Title": parameters[0].length > 0 ? "No matches found" : "Search languages, frameworks and tools.",
					"JsonRPCAction": {},
					"IcoPath": "icons/app.png"
				}]
			}
		));
	}
}

if (method === "load_url") {
	open(parameters[0])
}
 

