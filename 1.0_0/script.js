var menuId = chrome.contextMenus.create({
  title: "OSINT=*",
  id: "parent",
  contexts: [ "selection" ],
  onclick: main,
})

function main(info, tab) {
  chrome.windows.create({
      url: `https://www.virustotal.com/gui/search/${info.selectionText.trim()}`,
      incognito: false,
    })
}
