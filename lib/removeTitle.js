async function remover(lastActive=true, lastAmount=0, lastDelay=500, ) {
    const active = await getData('active', true);
    if(active) {
        if(lastActive != active) {
            lastAmount = 0;
        }
        const amount = document.querySelectorAll('p.fallback-text').length;
        let delay = lastDelay + 500;
        if(amount != lastAmount) {
            delay = 500;
            const blocklist = await getData('blocklist', []);
            for(const title of blocklist) {
                removeTitle(title);
            }
        }
        setTimeout(remover, delay, true, amount, delay);
    }
    else {
        if(lastActive != active) {
            bringTilesBack();
        }
        setTimeout(remover, 1000, false, lastAmount, lastDelay);
    }
}

function removeTitle(title) {
    try {
        const allTiles = Array.from(document.querySelectorAll('p.fallback-text'));
        const tiles = allTiles.filter(el => el.textContent === title);
        for(const tile of tiles) {
            const target = tile.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            target.style.display = 'none';
        }
        return true;
    }
    catch (e) {
        return false;
    }
}

function bringTilesBack() {
    const allTiles = Array.from(document.querySelectorAll('p.fallback-text'));
    for(const tile of allTiles) {
        const target = tile.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        target.style.display = 'inline-block';
    }
}