/** @param {NS} ns */
export function main(ns) {
	ns.tprint("All: " + fetchAllServers(ns));
	ns.tprint("Targets: " + fetchTargetServers(ns));
	ns.tprint("Owned: " + fetchOwnedServers(ns));
}

export function fetchAllServers(ns) {
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

export function fetchTargetServers(ns) {
	return fetchAllServers(ns).filter(server => !(server.startsWith("server") || server === "home"));
}

export function fetchOwnedServers(ns) {
	return fetchAllServers(ns).filter(server => server.startsWith("server") || server === "home");
}