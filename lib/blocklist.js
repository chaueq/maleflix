async function generateBlocklist() {
    const db = await getData('categories');
    const allowlist = await getData('allowlist');
    let all = [];
    for(const cat in db) {
        if(allowlist.includes(cat)) {
            continue;
        }
        all = all.concat(db[cat]);
    }
    const blocklist = [... new Set(all)];
    await setData('blocklist', blocklist); 
}