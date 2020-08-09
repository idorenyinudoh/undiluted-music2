const varz = {
    playAnimation: null,
    previousAnimation: null,
    nextAnimation: null,
    arr: [
        playIcon = document.getElementById('play-button'),
        previousIcon=document.getElementById('previous-button'),
        nextIcon=document.getElementById('next-button')
    ],
    range: document.getElementById('range-input'),
    audio: document.querySelector('audio'),
    src: [
        'https://idorenyinudoh.github.io/my-audio-player/10%20Sing%20About%20Me,%20I\'m%20Dying%20of%20Thirs.m4a',
        'https://idorenyinudoh.github.io/my-audio-player/beamer-rema_ft_rvssian.mp3',
        // 'file:///C:/Users/hp/Documents/GitHub/my-audio-player/10%20Sing%20About%20Me,%20I\'m%20Dying%20of%20Thirs.m4a',
        // 'file:///C:/Users/hp/Documents/GitHub/my-audio-player/beamer-rema_ft_rvssian.mp3'
    ]
},
audioPlayerPresentation = {
    addPlayFocus() {
        varz.arr.forEach((i) => {
            if(document.activeElement === i && i.classList.contains('play-focus') === false) i.classList.add('play-focus');
        });
    },
    removePlayFocus() {
        varz.arr.forEach((i) => {
            if(i.classList.contains('play-focus')) i.classList.remove('play-focus');
        });
    },
    addRangeFocus() {
        if(document.activeElement === varz.range && varz.range.classList.contains('range-focus') === false) {
            varz.range.classList.add('range-focus');
            document.querySelector('div#range-container').classList.add('outline');
        }
    },
    removeRangeFocus() {
        if(varz.range.classList.contains('range-focus')) {
            varz.range.classList.remove('range-focus');
            document.querySelector('div#range-container').classList.remove('outline');
        }
    }
},
audioPlayerInteraction = {
    root: document.querySelector('html'),
    cur: document.getElementById('current-time'),
    dur: document.getElementById('duration'),
    time(val) {
        let min = Math.floor(val / 60);
        let secsCalc = () => {
            let secs = val % 60;
            return secs < 10 ? `0${secs}` : `${secs}`;
        }
        return `${min}:${secsCalc()}`;
    },
    metadata: {
        forProgress() {
            if(varz.audio.duration > 0)audioPlayerInteraction.root.style.setProperty('--buffered-width', `${Math.floor(varz.audio.buffered.end(varz.audio.buffered.length - 1)) / varz.range.max * 100}%`);
        },
        main() {
            varz.range.max = Math.floor(varz.audio.duration);
            audioPlayerInteraction.dur.textContent = audioPlayerInteraction.time(varz.range.max);
            this.forProgress();
        }
    },
    inputEvent() {
        this.cur.textContent = audioPlayerInteraction.time(varz.range.value);
        this.root.style.setProperty('--before-width', `${varz.range.value / varz.range.max * 100}%`);
    },
    updateCurrentTime() {
        varz.range.value = Math.floor(varz.audio.currentTime);
        audioPlayerInteraction.inputEvent();
        audioPlayerInteraction.rAF = requestAnimationFrame(audioPlayerInteraction.updateCurrentTime);
    },
    controlRaf: {
        isPlayingRaf: false,
        play() {
            requestAnimationFrame(audioPlayerInteraction.updateCurrentTime);
            this.isPlayingRaf = true;
        },
        stop() {
            cancelAnimationFrame(audioPlayerInteraction.rAF);
            this.isPlayingRaf = false;
        }
    },
    controlPlayback: {
        isShowingPlay: true,
        playBack() {
            if(this.isShowingPlay) {
                varz.audio.play();
                varz.playAnimation.playSegments([14, 28], true);
                varz.arr[0].setAttribute('aria-label', 'pause');
                audioPlayerInteraction.controlRaf.play();
                this.isShowingPlay = false;
            } else {
                if(!varz.audio.paused)varz.audio.pause();
                varz.playAnimation.playSegments([0, 14], true);
                varz.arr[0].setAttribute('aria-label', 'play');
                audioPlayerInteraction.controlRaf.stop();
                this.isShowingPlay = true;
            }
        },
        prenext() {
            if(!this.isShowingPlay)varz.audio.autoplay = true;else varz.audio.autoplay = false;
            varz.range.value = 0;
            audioPlayerInteraction.cur.textContent = '0:00';
            audioPlayerInteraction.dur.textContent = '0:00';
            audioPlayerInteraction.root.style.setProperty('--before-width','0%');
            audioPlayerInteraction.root.style.setProperty('--buffered-width','0%');
        },
        previous() {
            for(let i=0; i<varz.src.length; i++){
                if(varz.audio.src === varz.src[i]){
                    if(i===0)varz.audio.src=varz.src[varz.src.length-1];else varz.audio.src=varz.src[i-1];
                    this.prenext();
                    break;
                }
            }
        },
        next() {
            for(let i=0; i<varz.src.length; i++){
                if(varz.audio.src === varz.src[i]){
                    if(i===varz.src.length-1)varz.audio.src=varz.src[0];else varz.audio.src=varz.src[i+1];
                    this.prenext();
                    break;
                }
            }
        }
    }
};
(async () => {
    await bodymovin.loadAnimation;
    varz.playAnimation = bodymovin.loadAnimation({
        container: varz.arr[0],
        path: 'pause.json', //for production
        // path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false
    });
    varz.previousAnimation = bodymovin.loadAnimation({
        container: varz.arr[1],
        path: 'previous.json', //for production
        // path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/skip-backwards/skip-backwards.json',
        renderer: 'svg',
        loop: false,
        autoplay: false
    });
    varz.nextAnimation = bodymovin.loadAnimation({
        container: varz.arr[2],
        path: 'next.json', //for production
        // path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/skip-forwards/skip-forwards.json',
        renderer: 'svg',
        loop: false,
        autoplay: false
    });
    varz.playAnimation.addEventListener('data_ready', () => {
        varz.playAnimation.goToAndStop(14, true);
    });
})();
if(varz.audio.readyState > 0) audioPlayerInteraction.metadata.main(); else varz.audio.addEventListener('loadedmetadata', () => { audioPlayerInteraction.metadata.main();});
varz.arr[0].addEventListener('click', () => {audioPlayerInteraction.controlPlayback.playBack();});
varz.audio.addEventListener('progress', audioPlayerInteraction.metadata.forProgress);
varz.range.addEventListener('keyup', audioPlayerPresentation.addRangeFocus);
varz.range.addEventListener('blur', audioPlayerPresentation.removeRangeFocus);
varz.range.addEventListener('pointerdown', audioPlayerPresentation.removeRangeFocus);
varz.range.addEventListener('input', () => {
    audioPlayerInteraction.controlRaf.stop();
    audioPlayerInteraction.inputEvent();
});
varz.range.addEventListener('change', () => {
    varz.audio.currentTime=varz.range.value;
    if(!varz.audio.paused)audioPlayerInteraction.controlRaf.play();
});
varz.arr[1].addEventListener('click', () => {
    audioPlayerInteraction.controlPlayback.previous();
    varz.previousAnimation.playSegments([10, 25], true);
});
varz.arr[2].addEventListener('click', () => {
    audioPlayerInteraction.controlPlayback.next();
    varz.nextAnimation.playSegments([10, 25], true);
});
varz.arr.forEach((i) => {
    i.addEventListener('keyup', audioPlayerPresentation.addPlayFocus);
    i.addEventListener('blur', audioPlayerPresentation.removePlayFocus);
    i.addEventListener('pointerdown', audioPlayerPresentation.removePlayFocus);
});
varz.audio.addEventListener('ended', () => {audioPlayerInteraction.controlPlayback.next()});
