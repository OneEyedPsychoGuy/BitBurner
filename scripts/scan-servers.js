/** @param {NS} ns */
export async function main(ns) {
	let servers = ["home"];

	for (let server of servers) {
		let scans = ns.scan(server);

		for (let scan of scans) {
			if (!servers.includes(scan)) {
				servers.push(scan);
			}
		}
	}

	/*
	const scriptName = "write-server-info.js"
	ns.exec(scriptName, "home", 1, ...servers);
	*/
}