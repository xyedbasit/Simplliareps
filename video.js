function attachDom(id, type, src) {
    let elem = document.getElementById(id)
    return new Promise((resolve) => {
        if (!elem) {
            elem = document.createElement(type)
            elem.id = id
            elem.src = src
            elem.onload = () => {
                resolve()
            }
            document.head.append(elem)
        } else {
            resolve()
        }
    })
}
const videoPlayer = document.querySelector('.home-group48419')

videoPlayer.addEventListener('click', function () {
    const playerElement = document.getElementById('video-player-2');
    playerElement.style.display = 'block'
    playVideo('video-player-2')
    playerElement.onended = () => {
        playerElement.style.display = 'none'
    }
})
function playVideo(id) {
    const playerElement = document.getElementById(id);
    attachDom('hls-player', 'script', 'https://cdn.jsdelivr.net/npm/hls.js@latest')
        .then(() => {
            let videoSrc = playerElement.children[0].src
            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(videoSrc);
                hls.attachMedia(playerElement);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                playerElement.src = videoSrc;
            }
            playerElement.play()
        })
}
function stopVideo(id) {
    const playerElement = document.getElementById(id);
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource('');
        hls.attachMedia(playerElement);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        playerElement.src = '';
    }
}
function playVideoInPopup() {
    document.getElementById('popup-main').style.display = 'block';
    playVideo('video-player-1')
}
function closeVideoPopup() {
    document.getElementById('popup-main').style.display = 'none';
    stopVideo('video-player-1')
}
