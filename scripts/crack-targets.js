import { getTargetServers } from "./get-servers";

/** @param {NS} ns */
export async function main(ns) 
{
	const home = "home";
	const cracks = {
		"BruteSSH.exe": ns.brutessh,
		"FTPCrack.exe": ns.ftpcrack,
		"relaySMTP.exe": ns.relaysmtp,
		"HTTPWorm.exe": ns.httpworm,
		"SQLInject.exe": ns.sqlinject
	};

	for (let target of getTargetServers(ns)) {
		if(canCrack(target)) crack(target);
	}

	function getNumCracks() {
		return Object.keys(cracks).filter(file => ns.fileExists(file, home)).length;
	}

	function canCrack(target) {
		const hasCracked = ns.hasRootAccess(target);
		const hasLevel = ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target);
		const hasNumCracks = getNumCracks() >= ns.getServerNumPortsRequired(target);
		return !hasCracked && hasLevel && hasNumCracks;
	}

	function crack(target) {
		ns.print("Cracking: " + target);
		for(let file of Object.keys(cracks)) {
			if(ns.fileExists(file, home)) {
				cracks[file](target);
			}
		}
		ns.nuke(target);
	}
}