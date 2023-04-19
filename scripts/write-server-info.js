/** @param {NS} ns */
export async function main(ns) 
{
	const servers = ns.args;
	ns.tprint(servers);

	// Filter out purchased servers and home
	let targets = servers.filter(server => !(server.startsWith("server") || server === "home"));
	ns.tprint(targets);

	//Filter out targets
	let owns = servers.filter(server => server.startsWith("server") || server === "home");
	ns.tprint(owns);

	if (ns.fileExists("targets.txt")) { ns.rm("targets.txt") }

	let targetList = "";
	for (let target of targets) 
	{
		let info =
			target + "," +
			ns.hasRootAccess(target) + "," +
			ns.getServerRequiredHackingLevel(target) + "," +
			ns.getServerNumPortsRequired(target) + "," +
			ns.getServerMaxMoney(target) + "," +
			ns.getServerGrowth(target) + "," +
			ns.getServerMinSecurityLevel(target);

		ns.write("targets.txt", info + "\n", "a");
	}
	
	if (ns.fileExists("owned.txt")) { ns.rm("owned.txt") }

	let ownsList = "";
	for (let own of owns) 
	{
		let info =
			own + "," +
			ns.hasRootAccess(own) + "," +
			ns.getServerRequiredHackingLevel(own) + "," +
			ns.getServerNumPortsRequired(own) + "," +
			ns.getServerMaxMoney(own) + "," +
			ns.getServerGrowth(own) + "," +
			ns.getServerMinSecurityLevel(own);

		ns.write("owned.txt", info + "\n", "a");
	}
}