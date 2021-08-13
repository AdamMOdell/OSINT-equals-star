var menuId = chrome.contextMenus.create({
  title: "OSINT=*",
  id: "parent",
  contexts: [ "selection" ],
  onclick: main,
})

function main(info, tab) {
	// get highlighted text
	var IOC = info.selectionText;
	
	// replace "[dot]" with "."
	IOC = IOC.replace(/\[dot\]/g, '.');
	
	// remove whitespace, quotes, brackets
	IOC = IOC.replace(/[\"\'\[\] ]/g, '');
	
	// regex check if IOC is md5, sha1, sha256 hash
	var ishash = !IOC.search(/\b[A-Fa-f0-9]{32,64}\b/);
	
	// regex check if IOC is IPv4 address
	var isIP = !IOC.search(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
	
	if (ishash){ // search hash OSINT sources
		chrome.windows.create({
		  url: [`https://www.virustotal.com/gui/search/${IOC}`,
				`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
				`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
				`https://www.hybrid-analysis.com/search?query=${IOC}`],
		  incognito: false,
		})
	}
	else if (isIP){ // search IP OSINT sources
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
	else{ // assume IOC is domain name, search domain name OSINT sources
		chrome.windows.create({
		  url: [`https://www.virustotal.com/gui/search/${IOC}`,
				`https://talosintelligence.com/reputation_center/lookup?search=${IOC}`,
				`https://exchange.xforce.ibmcloud.com/search/${IOC}`,
				`https://www.shodan.io/search?query=${IOC}`],
		  incognito: false,
		});
	}
}
