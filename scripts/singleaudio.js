const varz = {
    playAnimation: null,
    playIcon: document.getElementById('play-icon'),
    range: document.getElementById('range-input'),
    audio: document.querySelector('audio')
},
audioPlayerPresentation = {
    addPlayFocus() {
        if(document.activeElement === varz.playIcon && varz.playIcon.classList.contains('play-focus') === false) {
            varz.playIcon.classList.add('play-focus');
        }
    },
    removePlayFocus() {
        if(varz.playIcon.classList.contains('play-focus')) {
            varz.playIcon.classList.remove('play-focus');
        }
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
            if(varz.audio.duration > 0) {
                audioPlayerInteraction.root.style.setProperty('--buffered-width', `${Math.floor(varz.audio.buffered.end(varz.audio.buffered.length - 1)) / varz.range.max * 100}%`);
            }
        },
        main() {
            varz.range.max = Math.floor(varz.audio.duration);
            document.querySelector('#duration').textContent = audioPlayerInteraction.time(varz.range.max);
            this.forProgress();
        }
    },
    inputEvent() {
        document.querySelector('#current-time').textContent = audioPlayerInteraction.time(varz.range.value);
        audioPlayerInteraction.root.style.setProperty('--before-width', `${varz.range.value / varz.range.max * 100}%`);
    },
    updateCurrentTime() {
        varz.range.value = Math.floor(varz.audio.currentTime);
        audioPlayerInteraction.inputEvent();
        audioPlayerInteraction.controlPlayback.updatePositionState();
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
                varz.playIcon.setAttribute('aria-label', 'pause');
                audioPlayerInteraction.controlRaf.play();
                this.isShowingPlay = false;
            } else {
                if(!varz.audio.paused)varz.audio.pause();
                varz.playAnimation.playSegments([0, 14], true);
                varz.playIcon.setAttribute('aria-label', 'play');
                audioPlayerInteraction.controlRaf.stop();
                this.isShowingPlay = true;
            }
        },
        updatePositionState() {
            if('setPositionState' in navigator.mediaSession) {
                navigator.mediaSession.setPositionState({
                    duration: varz.audio.duration,
                    playbackRate: varz.audio.playbackRate,
                    position: varz.audio.currentTime
                });
            }
        }
    }
};
(async () => {
    await bodymovin.loadAnimation;
    varz.playAnimation = bodymovin.loadAnimation({
        container: varz.playIcon,
        path: '../../lottieJson/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false
    });
    varz.playAnimation.goToAndStop(14, true);
})();
if('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: document.querySelector('.album-title').textContent,
        artist: document.querySelector('.album-artiste').textContent,
        album: `${document.querySelector('.album-title').textContent} - Single`,
        artwork: [
            {src: document.querySelector('.cover img').src, sizes: '96x96'},
            {src: document.querySelector('.cover img').src, sizes: '128x128'},
            {src: document.querySelector('.cover img').src, sizes: '192x192'},
            {src: document.querySelector('.cover img').src, sizes: '256x256'},
            {src: document.querySelector('.cover img').src, sizes: '384x384'},
            {src: document.querySelector('.cover img').src, sizes: '512x512'}
        ]
    });
    navigator.mediaSession.setActionHandler('play', () => {audioPlayerInteraction.controlPlayback.playBack()});
    navigator.mediaSession.setActionHandler('pause', () => {audioPlayerInteraction.controlPlayback.playBack()});
    navigator.mediaSession.setActionHandler('stop', () => {
        varz.audio.currentTime = 0;
        varz.range.value = 0;
        audioPlayerInteraction.controlRaf.stop();
        audioPlayerInteraction.inputEvent();
        if(!varz.audio.paused) {
            varz.playAnimation.playSegments([0, 14], true);
            varz.playIcon.setAttribute('aria-label', 'play');
            audioPlayerInteraction.controlPlayback.isShowingPlay = true;
        }
    });
    navigator.mediaSession.setActionHandler('seekbackward', (d) => {
        varz.audio.currentTime = varz.audio.currentTime - (d.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekforward', (d) => {
        varz.audio.currentTime = varz.audio.currentTime + (d.seekOffset || 10);
    });
    navigator.mediaSession.setActionHandler('seekto', (d) => {
        if(d.fastSeek && 'd' in varz.audio) {
            varz.audio.fastSeek(d.seekTime);
            return;
        }
        varz.audio.currentTime = d.seekTime;
    });
}
if(varz.audio.readyState > 0) {
    audioPlayerInteraction.metadata.main();
} else {
    varz.audio.addEventListener('loadedmetadata', () => { audioPlayerInteraction.metadata.main();});
}
varz.playIcon.addEventListener('click', () => {audioPlayerInteraction.controlPlayback.playBack();});
varz.audio.addEventListener('progress', audioPlayerInteraction.metadata.forProgress);
varz.playIcon.addEventListener('keyup', audioPlayerPresentation.addPlayFocus);
varz.playIcon.addEventListener('blur', audioPlayerPresentation.removePlayFocus);
varz.playIcon.addEventListener('pointerdown', audioPlayerPresentation.removePlayFocus);
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