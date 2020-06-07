let toggle = () => {
    const header = document.getElementById('header');
    const form = document.getElementById('form');

    if (form.classList.contains('hide')) {
        form.classList.remove('hide');
        form.classList.add('down');
        document.getElementById('search-input').focus();
        header.classList.add('fade');
        setTimeout(() => {
            header.classList.add('hide');
            header.classList.remove('fade');
        }, 250);
    }
    else {
        form.classList.remove('down');
        form.classList.add('up');
        header.classList.remove('hide');
        header.classList.add('unfade');
        setTimeout(() => {
            form.classList.remove('up');
            form.classList.add('hide');
            header.classList.remove('unfade');
        }, 250);
    }
};

document.getElementById('search-button').addEventListener('click', toggle);
document.getElementById('clear-button').addEventListener('click', toggle);

const links = document.getElementsByClassName('nav-link');
for (let i = 0; i < links.length; i++) {
    const disable = () => {
        for (let j = 0; j < links.length; j++) {
            if (i != j) {
                if (links[j].classList.contains('disabled')) {
                    links[j].classList.remove('disabled');
                }
                else links[j].classList.add('disabled');
            }
        }
    }
    links[i].addEventListener('pointerover', disable);
    links[i].addEventListener('pointerout', disable);
}

const toggleGenresBox = () => {
    const genresActivated = document.getElementById('genres-activated');
    const genresBox = document.getElementById('genres-box');
    if (genresActivated.classList.contains('hide')) {
        genresActivated.classList.remove('hide');
        genresActivated.classList.add('activate');
        genresBox.classList.remove('hide');
        genresBox.classList.add('gen');
        setTimeout(() => {
            genresActivated.classList.remove('activate');
        }, 100);
    }
}

document.getElementById('genres-button').addEventListener('click', toggleGenresBox);