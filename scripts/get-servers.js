/** @param {NS} ns */
export function main(ns) {
	ns.tprint("All: " + getAllServers(ns));
	ns.tprint("Targets: " + getTargetServers(ns));
	ns.tprint("Owned: " + getOwnedServers(ns));
	ns.tprint("Cracked: " + getCrackedServers(ns));
}

export function getAllServers(ns) {
	let servers = ["home"];

	for (let server of servers) {
		let scans = ns.scan(server);

		for (let scan of scans) {
			if (!servers.includes(scan)) {
				servers.push(scan);
			}
		}
	}

	return servers;
}

export function getTargetServers(ns) {
	return getAllServers(ns).filter(server => !(server.startsWith("pserv-") || server === "home"));
}

export function getOwnedServers(ns) {
	return getAllServers(ns).filter(server => server.startsWith("pserv-") || server === "home");
}

export function getCrackedServers(ns) {
	return getAllServers(ns).filter(server => ns.hasRootAccess(server));
}