(()=>{function e(e,t,n,a,o,i,r){try{var c=e[i](r),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(a,o)}var t,n={playAnimation:null,playIcon:document.getElementById("play-icon"),range:document.getElementById("range-input"),audio:document.querySelector("audio")},a=function(){n.playIcon.classList.contains("play-focus")&&n.playIcon.classList.remove("play-focus")},o=function(){n.range.classList.contains("range-focus")&&(n.range.classList.remove("range-focus"),document.querySelector("div#range-container").classList.remove("outline"))},i={root:document.querySelector("html"),time:function(e){var t,n=Math.floor(e/60);return"".concat(n,":").concat((t=e%60)<10?"0".concat(t):"".concat(t))},metadata:{forProgress:function(){n.audio.duration>0&&i.root.style.setProperty("--buffered-width","".concat(Math.floor(n.audio.buffered.end(n.audio.buffered.length-1))/n.range.max*100,"%"))},main:function(){n.range.max=Math.floor(n.audio.duration),document.querySelector("#duration").textContent=i.time(n.range.max),this.forProgress()}},inputEvent:function(){document.querySelector("#current-time").textContent=i.time(n.range.value),i.root.style.setProperty("--before-width","".concat(n.range.value/n.range.max*100,"%"))},updateCurrentTime:function(){n.range.value=Math.floor(n.audio.currentTime),i.inputEvent(),i.controlPlayback.updatePositionState(),i.rAF=requestAnimationFrame(i.updateCurrentTime)},controlRaf:{isPlayingRaf:!1,play:function(){requestAnimationFrame(i.updateCurrentTime),this.isPlayingRaf=!0},stop:function(){cancelAnimationFrame(i.rAF),this.isPlayingRaf=!1}},controlPlayback:{isShowingPlay:!0,playBack:function(){this.isShowingPlay?(n.audio.play(),n.playAnimation.playSegments([14,28],!0),n.playIcon.setAttribute("aria-label","pause"),i.controlRaf.play(),this.isShowingPlay=!1):(n.audio.paused||n.audio.pause(),n.playAnimation.playSegments([0,14],!0),n.playIcon.setAttribute("aria-label","play"),i.controlRaf.stop(),this.isShowingPlay=!0)},updatePositionState:function(){"setPositionState"in navigator.mediaSession&&navigator.mediaSession.setPositionState({duration:n.audio.duration,playbackRate:n.audio.playbackRate,position:n.audio.currentTime})}}};(t=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,bodymovin.loadAnimation;case 2:n.playAnimation=bodymovin.loadAnimation({container:n.playIcon,path:"../../lottieJson/pause.json",renderer:"svg",loop:!1,autoplay:!1}),n.playAnimation.goToAndStop(14,!0);case 4:case"end":return e.stop()}}),e)})),function(){var n=this,a=arguments;return new Promise((function(o,i){var r=t.apply(n,a);function c(t){e(r,o,i,c,s,"next",t)}function s(t){e(r,o,i,c,s,"throw",t)}c(void 0)}))})(),"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:document.querySelector(".album-title").textContent,artist:document.querySelector(".album-artiste").textContent,album:"".concat(document.querySelector(".album-title").textContent," - Single"),artwork:[{src:document.querySelector(".cover img").src,sizes:"96x96"},{src:document.querySelector(".cover img").src,sizes:"128x128"},{src:document.querySelector(".cover img").src,sizes:"192x192"},{src:document.querySelector(".cover img").src,sizes:"256x256"},{src:document.querySelector(".cover img").src,sizes:"384x384"},{src:document.querySelector(".cover img").src,sizes:"512x512"}]}),navigator.mediaSession.setActionHandler("play",(function(){i.controlPlayback.playBack()})),navigator.mediaSession.setActionHandler("pause",(function(){i.controlPlayback.playBack()})),navigator.mediaSession.setActionHandler("stop",(function(){n.audio.currentTime=0,n.range.value=0,i.controlRaf.stop(),i.inputEvent(),n.audio.paused||(n.playAnimation.playSegments([0,14],!0),n.playIcon.setAttribute("aria-label","play"),i.controlPlayback.isShowingPlay=!0)})),navigator.mediaSession.setActionHandler("seekbackward",(function(e){n.audio.currentTime=n.audio.currentTime-(e.seekOffset||10)})),navigator.mediaSession.setActionHandler("seekforward",(function(e){n.audio.currentTime=n.audio.currentTime+(e.seekOffset||10)})),navigator.mediaSession.setActionHandler("seekto",(function(e){e.fastSeek&&"d"in n.audio?n.audio.fastSeek(e.seekTime):n.audio.currentTime=e.seekTime}))),n.audio.readyState>0?i.metadata.main():n.audio.addEventListener("loadedmetadata",(function(){i.metadata.main()})),n.playIcon.addEventListener("click",(function(){i.controlPlayback.playBack()})),n.audio.addEventListener("progress",i.metadata.forProgress),n.playIcon.addEventListener("keyup",(function(){document.activeElement===n.playIcon&&!1===n.playIcon.classList.contains("play-focus")&&n.playIcon.classList.add("play-focus")})),n.playIcon.addEventListener("blur",a),n.playIcon.addEventListener("pointerdown",a),n.range.addEventListener("keyup",(function(){document.activeElement===n.range&&!1===n.range.classList.contains("range-focus")&&(n.range.classList.add("range-focus"),document.querySelector("div#range-container").classList.add("outline"))})),n.range.addEventListener("blur",o),n.range.addEventListener("pointerdown",o),n.range.addEventListener("input",(function(){i.controlRaf.stop(),i.inputEvent()})),n.range.addEventListener("change",(function(){n.audio.currentTime=n.range.value,n.audio.paused||i.controlRaf.play()}))})();