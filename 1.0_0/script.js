var menuId = chrome.contextMenus.create({
  title: "OSINT=*",
  id: "parent",
  contexts: [ "selection" ],
  onclick: main,
})

function main(info, tab) {
	var IOC = info.selectionText;
	IOC = IOC.replace(/[\"\']/g, '');
	IOC = IOC.trim();
	
	var ishash = !IOC.search(/\b[A-Fa-f0-9]{32,64}\b/); // run hash search with regex
	
	if (ishash)
	
chrome.windows.create({
      url: [`https://www.virustotal.com/gui/search/${info.selectionText.trim()}`,
			`https://talosintelligence.com/reputation_center/lookup?search=${info.selectionText.trim()}`,
			`https://exchange.xforce.ibmcloud.com/search/${info.selectionText.trim()}`,
			`https://www.hybrid-analysis.com/search?query=${info.selectionText.trim()}`],
      incognito: false,
    })
	
	else
	
  chrome.windows.create({
      url: [`https://www.virustotal.com/gui/search/${IOC}`,
			`https://www.abuseipdb.com/check/${IOC}`,
			`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
			`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
			`https://ipinfo.io/${IOC}`,
			`https://www.greynoise.io/viz/riot/${IOC}`],
      incognito: false,
    });
}
