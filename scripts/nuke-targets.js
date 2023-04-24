import { fetchTargetServers } from "./fetch-servers";

/** @param {NS} ns */
export async function main(ns) 
{
	let targets = fetchTargetServers(ns);
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