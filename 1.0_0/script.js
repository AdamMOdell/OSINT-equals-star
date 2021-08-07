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
