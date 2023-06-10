async function getData(key, alternative=undefined, triggerSetOnAlt=false) {
    try {
        const result = await chrome.storage.local.get(key);
        const json = result[key];
        return JSON.parse(json);
    }
    catch (e) {
        if(triggerSetOnAlt && alternative !== undefined) {
            await setData(key, alternative);
        }
        return alternative;
    }
}

async function setData(key, val) {
    const json = JSON.stringify(val);
    const obj = {};
    obj[key] = json;
    return chrome.storage.local.set(obj);
}