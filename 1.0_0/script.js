var menuId = chrome.contextMenus.create({
  title: "OSINT=*",
  id: "parent",
  contexts: [ "selection" ],
  onclick: main,
})

function main(info, tab) {
	var IOC = info.selectionText;
	IOC = IOC.replace(/[\"\'\[\] ]/g, '');
	
	var ishash = !IOC.search(/\b[A-Fa-f0-9]{32,64}\b/); // run hash search with regex
	var isIP = !IOC.search(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
	if (ishash){ // hash
		chrome.windows.create({
		  url: [`https://www.virustotal.com/gui/search/${IOC}`,
				`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
				`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
				`https://www.hybrid-analysis.com/search?query=${IOC}`],
		  incognito: false,
		})
	}
	else if (isIP){
		chrome.windows.create({
		  url: [`https://www.virustotal.com/gui/search/${IOC}`,
				`https://www.abuseipdb.com/check/${IOC}`,
				`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
				`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
				`https://ipinfo.io/${IOC}`,
				`https://www.greynoise.io/viz/riot/${IOC}`,
				`https://www.shodan.io/search?query=${IOC}`],
		  incognito: false,
		});
	}
	else{
		chrome.windows.create({
		  url: [`https://www.virustotal.com/gui/search/${IOC}`,
				`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
				`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
				`https://www.shodan.io/search?query=${IOC}`],
		  incognito: false,
		});
	}
}
