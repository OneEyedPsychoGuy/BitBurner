/** @param {NS} ns */
export async function main(ns) 
{
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
	for (let target of targets) 
	{
		if(ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target) && ns.hasRootAccess(target)) { continue; }

		let portsOpen = 0;

		if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(target); ++portsOpen; }
		if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(target); ++portsOpen; }
		if (ns.fileExists("relaySMTP.exe", "home")) { ns.relaysmtp(target); ++portsOpen; }
		if (ns.fileExists("HTTPWorm.exe", "home")) { ns.httpworm(target); ++portsOpen; }
		if (ns.fileExists("SQLInject.exe", "home")) { ns.sqlinject(target); ++portsOpen; }
		if (ns.getServerNumPortsRequired(target) <= portsOpen) { ns.nuke(target); }
	}
}