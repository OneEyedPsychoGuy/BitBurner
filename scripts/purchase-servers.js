/** @param {NS} ns */
export async function main(ns) {

    //Set RAM here
    const ram = ns.getPurchasedServerMaxRam();
    let i = ns.getPurchasedServers().length;

    while (i < ns.getPurchasedServerLimit()) 
	{
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) 
		{
			ns.purchaseServer("server-node-" + i, ram)
            ++i;
        }
        //Prevents Bitburner from freezing
        await ns.sleep(1000);
    }

    ns.tprint("Maximum Servers Purchased!");
}