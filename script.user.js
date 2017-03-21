// ==UserScript==
// @name         YouTube Video Limiter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Limits YouTube videos to having no more than two open at any given time.
// @author       Ryan Zhang
// @match        https://www.youtube.com/watch*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @updateURL    https://raw.githubusercontent.com/Ryan778/yt-limiter/master/script.user.js
// @downloadURL  https://raw.githubusercontent.com/Ryan778/yt-limiter/master/script.user.js
// ==/UserScript==

(function() {
    'use strict';
    function hideVideo(){
        document.getElementById('unavailable-message').innerHTML = 'You have too many YouTube videos open at once.';
        document.getElementById('unavailable-submessage').innerHTML = 'You cannot have more than two concurrent videos open at the same time. Close a video and reload the page to play this video.';
        var icon_meh = document.getElementsByClassName('icon meh')[0];
        icon_meh.className += ' player-unavailable';
        icon_meh.style.background = 'transparent';
        icon_meh.style.backgroundImage = 'url(//s.ytimg.com/yts/img/meh7-vflGevej7.png)';
        icon_meh.style.backgroundRepeat = 'no-repeat';
        document.getElementById('player-api').style.display = 'none';
        document.getElementById('player-unavailable').style.display = 'initial';
        setInterval(function(){
            document.getElementsByTagName('video')[0].pause();
        }, 200);
    }
    var vid1 = GM_getValue('ytvl_runningVid_1', null);
    if(Date.now() - parseInt(vid1) < 3000 && vid1 !== null && location.href !== GM_getValue('ytvl_vidLnk_1')){
        var vid2 = GM_getValue('ytvl_runningVid_2', null);
        if(Date.now() - parseInt(vid2) < 3000 && vid2 !== null && location.href !== GM_getValue('ytvl_vidLnk_2')){
            hideVideo();
        }
        else{
            console.log('YTVL: Second video running');
            setInterval(function(){
                GM_setValue('ytvl_runningVid_2', Date.now());
                GM_setValue('ytvl_vidLnk_2', location.href);
            }, 1000);
        }
    }
    else{
        console.log('YTVL: First video running');
        setInterval(function(){
            GM_setValue('ytvl_runningVid_1', Date.now());
            GM_setValue('ytvl_vidLnk_1', location.href);
        }, 1000);
    }
})();
