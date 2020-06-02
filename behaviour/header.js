var search = document.getElementById('search-button');
var header = document.getElementById('header');
var form = document.getElementById('form');
var clear = document.getElementById('clear-button');

var toggle = () => {
    if (form.classList.contains('hide')) {
        form.classList.remove('hide');
        form.classList.add('down');
        header.classList.add('fade');
        setTimeout(() => {
            header.classList.add('hide');
            header.classList.remove('fade');
        }, 10000);
    }
    else {
        form.classList.remove('down');
        form.classList.add('up');
        setTimeout(() => {
            form.classList.remove('up');
            form.classList.add('hide');
        }, 10000);
    }
};

search.addEventListener('click', toggle);
clear.addEventListener('click', toggle);