var search = document.getElementById('search-button');
var header = document.getElementById('header');
var form = document.getElementById('form');
var clear = document.getElementById('clear-button');

var toggle = () => {
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

search.addEventListener('click', toggle);
clear.addEventListener('click', toggle);