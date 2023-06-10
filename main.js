updateWatcher();
getData('active', true, true).then((active) => {
    console.log(active);
    remover(active);
});