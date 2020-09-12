const figures = document.getElementsByTagName('figure');
for(let i = 0; i < figures.length; i++) {
    const gray = () => {
        for(let j = 0; j < figures.length; j++) {
            if(i != j) figures[j].classList.add('grayscale');
        }
    },
    ungray = () => {
        for(let j = 0; j < figures.length; j++) {
            if(i != j) figures[j].classList.remove('grayscale');
        }
    };
    figures[i].addEventListener('pointerover', gray);
    figures[i].addEventListener('pointerout', ungray);
}