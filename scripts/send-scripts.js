import { fetchTargetServers, fetchOwnedServers } from "./fetch-servers";

/** @param {NS} ns */
export async function main(ns) {
	//Send and execute hack scripts to targets
	let targets = fetchTargetServers(ns);
	const filename = "basic-hack.js";

	for(let target of targets)
	{
		if(!ns.hasRootAccess(target)) { continue; }

		let threads = Math.floor(ns.getServerMaxRam(target) / ns.getScriptRam(filename, "home"));

		if(threads === 0) { continue; }

		ns.scp(filename, target, "home");
		ns.exec(filename, target, threads);
	}

	//Send and execute share scripts owned servers
	let owned = fetchOwnedServers(ns);
	const filename2 = "trivial-share.js";
	
	for(let own of owned) {
		if(own === "home") { continue; }

		let threads = Math.floor(ns.getServerMaxRam(own) / ns.getScriptRam(filename2, "home"));

		if(threads === 0) { continue; }

		ns.scp(filename2, own, "home");
		ns.exec(filename2, own, threads);
	}
}