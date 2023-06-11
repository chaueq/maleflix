updateWatcher();
getData('active', true, true).then((active) => {
    remover(active);
});