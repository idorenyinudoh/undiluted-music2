const figures = document.getElementsByTagName('figure');
for (let i = 0; i < figures.length; i++) {
    const gray = () => {
        for (let j = 0; j < figures.length; j++) {
            if (i != j) {
                if (figures[j].classList.contains('grayscale')) {
                    figures[j].classList.remove('grayscale');
                }
                else figures[j].classList.add('grayscale');
            }
        }
    }
    figures[i].addEventListener('pointerover', gray);
    figures[i].addEventListener('pointerout', gray);
}