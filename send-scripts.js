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

	//Send and execute hack scripts to targets
	let targets = servers.filter(server => !(server.startsWith("server") || server === "home"));
	const filename = "basic-hack.js";

	for(let target of targets)
	{
		if(!ns.hasRootAccess(target)) { continue; }

		let threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam(filename, "home"));

		if(threads === 0) { continue; }

		ns.scp(filename, target, "home");
		ns.exec(filename, target, threads);
	}

	//Semd amd execute share scripts owned servers
	let owns = servers.filter(server => server.startsWith("server") || server === "home");
	const filename2 = "trivial-share.js";
	
	for(let own of owns) {
		if(own === "home") { continue; }

		let threads = Math.floor(ns.getServerMaxRam(own) / ns.getScriptRam(filename2, "home"));

		if(threads === 0) { continue; }

		ns.scp(filename2, own, "home");
		ns.exec(filename2, own, threads);
	}
}
