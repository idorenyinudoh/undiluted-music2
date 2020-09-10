const links = document.getElementsByClassName('nav-link'),
genresButton = document.getElementById('genres-button'),
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
    const genresIcon = document.getElementById('icon');
    if (genresBox.classList.contains('hide')) {
        genresIcon.classList.add('rotate');
        genresBox.classList.replace('hide','gen');
    }
    else {
        genresIcon.classList.replace('rotate','unrotate');
        genresBox.classList.replace('gen','ungen');
        setTimeout(() => {
            genresIcon.classList.remove('unrotate');
            genresBox.classList.replace('ungen','hide');
        }, 500);
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
    },
    focus = () => {
        if(links[i]==document.activeElement) links[i].classList.add('nav-link-focus');
    },
    unfocus = () => {
        if(links[i].classList.contains('nav-link-focus')) links[i].classList.remove('nav-link-focus');
    };
    links[i].addEventListener('pointerover', enable);
    links[i].addEventListener('pointerout', disable);
    links[i].addEventListener('keyup', focus);
    links[i].addEventListener('blur', unfocus);
    links[i].addEventListener('pointerdown', unfocus);
}
document.getElementById('search-button').addEventListener('click', toggleForm);
document.getElementById('clear-button').addEventListener('click', toggleForm);
genresButton.addEventListener('click', toggleGenresBox);
window.addEventListener('click', (e) => {
    if(genresBox.classList.contains('hide') == false && e.target != genresButton && e.target != genresBox) {
        for (let i = 0; i < genresButton.children.length; i++) {
            if(e.target == genresButton.children[i]) {
                return;
            }
        }
        toggleGenresBox();
    }
});