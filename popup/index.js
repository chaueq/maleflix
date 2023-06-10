document.getElementById('onoff_btn').addEventListener('click', (e) => {
    const btn = e.target;
    let status;
    if(btn.classList.contains('active')) {
        status = false;
        btn.classList.replace('active', 'inactive');
    }
    else {
        btn.classList.replace('inactive', 'active');
        status = true;
    }

    setData('active', status);
});

getData('active', true, true).then((active) => {
    document.getElementById('onoff_btn').classList.add(active ? 'active' : 'inactive');
});

document.getElementById('categories_btn').addEventListener('click', (e) => {
    window.location.href = 'categories.html';
});
