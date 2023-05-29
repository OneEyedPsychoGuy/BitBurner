/** @param {NS} ns */
export async function main(ns) {
    //This is the main script that runs everything. Make sure you have enough RAM to run this.

    if(!ns.scriptRunning("auto-purchase-hacknet-nodes.js", ns.getHostname())) {
        ns.run("auto-purchase-hacknet-nodes.js");
    }
}