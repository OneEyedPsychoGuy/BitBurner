/** @param {NS} ns */
export async function main(ns) {
	const sleepDelay = 1000;

	while(true) {
		const numNodes = ns.hacknet.numNodes();
		const purchaseNodeCost = ns.hacknet.getPurchaseNodeCost();

		let cheapest = purchaseNodeCost;
		let cheapestIndex = -1;

		for(let i = 0; i < numNodes; i++)
		{
			let currentCheapest = Math.min(
				ns.hacknet.getLevelUpgradeCost(i, 10), 
				ns.hacknet.getRamUpgradeCost(i, 1), 
				ns.hacknet.getCoreUpgradeCost(i, 1)
			);

			if(cheapest > currentCheapest) {
				cheapest = currentCheapest;
				cheapestIndex = i;
			}
		}

		while(true) {
			if(cheapest < ns.getServerMoneyAvailable("home")) break;
			await ns.sleep(sleepDelay);
		}

		if(cheapest === purchaseNodeCost) ns.hacknet.purchaseNode();
		else if(cheapest === ns.hacknet.getCoreUpgradeCost(cheapestIndex, 1)) ns.hacknet.upgradeCore(cheapestIndex, 1);
		else if(cheapest === ns.hacknet.getRamUpgradeCost(cheapestIndex, 1)) ns.hacknet.upgradeRam(cheapestIndex, 1);
		else if(cheapest === ns.hacknet.getLevelUpgradeCost(cheapestIndex, 10)) ns.hacknet.upgradeLevel(cheapestIndex, 10);

		await ns.sleep(sleepDelay);
	}
}