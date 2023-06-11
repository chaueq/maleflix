(async () => {
    const index = getIndex();
    const allowlist = await getData('allowlist', [], true);
    const catList = document.getElementById('cat_list');
    for(const cat_id in index) {
        const allowed = allowlist.includes(cat_id);

        const row = document.createElement('div');
        row.id = cat_id;
        row.classList.add('catRow');

        const title = document.createElement('div');
        title.classList.add('catTitle');
        title.innerText = index[cat_id];

        const button = document.createElement('div');
        button.classList.add('catBtn');
        button.classList.add('button');
        if(allowed) {
            button.innerText = 'Allow';
        }
        else {
            button.classList.add('invert');
            button.innerText = 'Block';
        }
        button.addEventListener('click', async (e) => {
            const button = e.target;
            const id = button.parentElement.id;
            const allowlist = await getData('allowlist', []);
            if(button.classList.contains('invert')) {
                button.classList.remove('invert');
                button.innerText = 'Allow';
                allowlist.push(id);
            }
            else {
                button.classList.add('invert');
                button.innerText = 'Block';
                allowlist.splice(allowlist.indexOf(id), 1);
            }
            await setData('allowlist', allowlist);
            await generateBlocklist();
        });

        row.appendChild(title);
        row.appendChild(button);
        catList.appendChild(row);
    }
})();