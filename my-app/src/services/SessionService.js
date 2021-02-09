export async function getSession() {
	
	const response = await fetch('http://localhost:3080/session')
	console.log("==== response", response)
	return await response
}