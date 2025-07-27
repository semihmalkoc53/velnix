// ==UserScript==
// @name         Google Görsel Yüklenmiş Gibi Göster
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Google resimlerinin yüklendiği izlenimini verir
// @author       Sen
// @match        *://*.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Image objesi override
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
        get: function () {
            return true;
        }
    });

    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
        get: function () {
            return 100;
        }
    });

    Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', {
        get: function () {
            return 100;
        }
    });

    // Resimlerin onerror durumunu bastır (isteğe bağlı)
    const imgs = document.getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('error', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // boş gif
        }, true);
    }
})();
