/** @param {NS} ns */
export async function main(ns) {

	//Pulled from scan-servers.js
	let servers = ["home"];

	for (let server of servers) {
		let scans = ns.scan(server);

		for (let scan of scans) {
			if (!servers.includes(scan)) {
				servers.push(scan);
			}
		}
	}
	//End of scan-servers.js

	let targets = servers.filter(server => !(server.startsWith("server") || server === "home"));

	const filename = "basic-hack.js";
	for(let target of targets)
	{
		if(!ns.hasRootAccess(target)) { continue; }

		let threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam(filename, "home"));

		if(threads === 0) { continue; }

		ns.scp(filename, target);
		ns.exec(filename, target, threads);
	}
}
