async function updateWatcher() {
    const delay = 60 * 60 * 6; //6h
    const last = await getData('last_update', 0);
    const now = Math.floor(Date.now() / 1000);
    const next = last + delay;
    setTimeout(updateLists, (next - now)*1000);
}

async function updateLists() {
    const index = getIndex();
    const promises = [];
    const db = {};
    for(const catId in index) {
        promises.push(updateList(catId));
    }
    for(const p of promises) {
        const category = await p;
        db[category.id] = category.titles;
    }
    await Promise.all([
        setData('categories', db),
        setData('last_update', Math.floor(Date.now()/1000)),
    ]);
    await generateBlocklist();
    updateWatcher();
}

async function updateList(categoryId) {
    const response = await fetch("https://www.netflix.com/browse/genre/" + categoryId);
    const text = await response.text();
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(text, "text/html");
    const elements = htmlDocument.documentElement.querySelectorAll('p.fallback-text');
    const titles = [];
    for(const e of elements) {
        titles.push(e.innerText);
    }
    return {
        id: categoryId,
        titles: titles
    };
}