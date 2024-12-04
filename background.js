chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    if (prevState === 'OFF')
        chrome.scripting
            .executeScript({
                target: { tabId: tab.id },
                files: ["start.js"],
            })
            .then(() => console.log("start script injected"));
    else
        chrome.scripting
            .executeScript({
                target: { tabId: tab.id },
                files: ["stop.js"],
            })
            .then(() => console.log("stop script injected"));
});