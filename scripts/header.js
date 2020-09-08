const links = document.getElementsByClassName('nav-link'),
genresButton = document.getElementById('genres-button'),
genresActivated = document.getElementById('genres-activated'),
genresBox = document.getElementById('genres-box'),
toggleForm = () => {
    const header = document.getElementById('header'),
    form = document.getElementById('form');
    if (form.classList.contains('hide')) {
        form.classList.replace('hide','down')
        document.getElementById('search-input').focus();
        header.classList.add('fade');
        setTimeout(() => {
            header.classList.replace('fade','hide');
        }, 250);
    }
    else {
        form.classList.replace('down','up');
        header.classList.replace('hide','unfade');
        setTimeout(() => {
            form.classList.replace('up','hide');
            header.classList.remove('unfade');
        }, 250);
    }
},
toggleGenresBox = () => {
    genresButton.blur();
    const genresIcon = document.getElementById('icon');
    if (genresActivated.classList.contains('hide')) {
        genresIcon.classList.add('rotate');
        genresActivated.classList.replace('hide','activate');
        genresBox.classList.replace('hide','gen');
        setTimeout(() => {
            genresActivated.classList.remove('activate');
        }, 100);
    }
    else {
        genresIcon.classList.replace('rotate','unrotate');
        genresActivated.classList.add('deactivate');
        genresBox.classList.replace('gen','ungen');
        setTimeout(() => {
            genresIcon.classList.remove('unrotate');
            genresBox.classList.replace('ungen','hide');
        }, 500);
        setTimeout(() => {
            genresActivated.classList.replace('deactivate','hide');
        }, 600);
    }
};
for(let i = 0; i < links.length; i++) {
    const disable = () => {
        for (let j = 0; j < links.length; j++) {
            if (i != j) links[j].classList.remove('disabled');
        }
    },
    enable = () => {
        for (let j = 0; j < links.length; j++) {
            if (i != j) links[j].classList.add('disabled');
        }
    };
    links[i].addEventListener('pointerover', enable);
    links[i].addEventListener('pointerout', disable);
}
document.getElementById('search-button').addEventListener('click', toggleForm);
document.getElementById('clear-button').addEventListener('click', toggleForm);
genresButton.addEventListener('click', toggleGenresBox);
window.addEventListener('click', (e) => {
    if(genresActivated.classList.contains('hide') == false && e.target != genresButton && e.target != genresBox) {
        for (let i = 0; i < genresButton.children.length; i++) {
            if(e.target == genresButton.children[i]) {
                return;
            }
        }
        toggleGenresBox();
    }
});