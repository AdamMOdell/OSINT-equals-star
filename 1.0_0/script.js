var menuId = chrome.contextMenus.create({
  title: "OSINT=*",
  id: "parent",
  contexts: [ "selection" ],
  onclick: main,
})

function main(info, tab) {
  chrome.windows.create({
      url: [`https://www.virustotal.com/gui/search/${info.selectionText.trim()}`,
			`https://www.abuseipdb.com/check/${info.selectionText.trim()}`,
			`https://talosintelligence.com/reputation_center/lookup?search=${info.selectionText.trim()}`,
			`https://exchange.xforce.ibmcloud.com/search/${info.selectionText.trim()}`,
			`https://ipinfo.io/${info.selectionText.trim()}`,
			`https://www.greynoise.io/viz/riot/${info.selectionText.trim()}`],
      incognito: false,
    })
}
