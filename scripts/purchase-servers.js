/** @param {NS} ns */
export async function main(ns) {

    //Set RAM here
    const ram = 16384;
    let i = ns.getPurchasedServers().length;

    ns.tprint(ram + ", " + ns.getPurchasedServerCost(ram));

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