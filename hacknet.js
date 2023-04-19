/** @param {NS} ns */
export async function main(ns) {
	const sleepDelay = 1000;

	while(true) {
		let cheapest, cheapestLevel, cheapestRAM, cheapestCore, nodeCost, nodes, nodeCheapestLevelIndex, nodeCheapestRAMIndex, nodeCheapestCoreIndex;
		cheapest = Infinity;
		cheapestLevel = Infinity;
		cheapestRAM = Infinity;
		cheapestCore = Infinity;
		nodeCost = ns.hacknet.getPurchaseNodeCost();
		nodes = ns.hacknet.numNodes();
		nodeCheapestLevelIndex = -1;
		nodeCheapestRAMIndex = -1;
		nodeCheapestCoreIndex = -1;

		for(let i = 0; i < nodes; i++)
		{
			let nodeLevelCost = ns.hacknet.getLevelUpgradeCost(i, 10);
			let nodeRAMCost = ns.hacknet.getRamUpgradeCost(i, 1);
			let nodeCoreCost = ns.hacknet.getCoreUpgradeCost(i, 1);

			if(nodeLevelCost < cheapestLevel) {
				cheapestLevel = nodeLevelCost;
				nodeCheapestLevelIndex = i;
			}
			if(nodeRAMCost < cheapestRAM) {
				cheapestRAM = nodeRAMCost;
				nodeCheapestRAMIndex = i;
			}
			if(nodeCoreCost < cheapestCore) {
				cheapestCore = nodeCoreCost;
				nodeCheapestCoreIndex = i;
			}
		}

		cheapest = Math.min(cheapestLevel, cheapestRAM, cheapestCore, nodeCost);

		if(cheapest === Infinity) {
			ns.tprint("Problem with Hacknet.js!");
			ns.exit();
		}

		while(true) {
			if(cheapest < ns.getServerMoneyAvailable("home")) break;
			await ns.sleep(sleepDelay);
		}

		if(cheapest === cheapestLevel && nodeCheapestLevelIndex !== -1) ns.hacknet.upgradeLevel(nodeCheapestLevelIndex, 10);
		else if(cheapest === cheapestRAM && nodeCheapestRAMIndex !== -1) ns.hacknet.upgradeRam(nodeCheapestRAMIndex, 1);
		else if(cheapest === cheapestCore && nodeCheapestCoreIndex !== -1) ns.hacknet.upgradeCore(nodeCheapestCoreIndex, 1);
		else if(cheapest === nodeCost) ns.hacknet.purchaseNode();
		else {
			ns.tprint("Problem with hacknet.js!");
			ns.exit();
		}

		await ns.sleep(sleepDelay);
	}
}
