// ==UserScript==
// @name         Bypass API ZK
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Force StartBlock=14 เท่านั้น ไม่แก้ไข Key
// @author       You
// @match        http://127.0.0.1:24009/*
// @match        http://localhost:24009/*
// @match        https://zkserver.dobedoacs.com:28080/*
// @match        http://10.70.0.125:8098/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('API Override Script Loaded');

    // Override fetch function
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (url.includes('/LockOnline/ExtendedDevice')) {
            // Force StartBlock=14 เท่านั้น
            url = url.replace(/StartBlock=\d+/, 'StartBlock=14');
            console.log('Fetch Modified URL:', url);
        }
        return originalFetch(url, options);
    };

    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async) {
        if (url.includes('/LockOnline/ExtendedDevice')) {
            url = url.replace(/StartBlock=\d+/, 'StartBlock=14');
            console.log('XHR Modified URL:', url);
        }
        return originalOpen.apply(this, [method, url, async]);
    };

    // Override window.location.href สำหรับ direct navigation
    const originalSetHref = Object.getOwnPropertyDescriptor(window.location, 'href').set;
    Object.defineProperty(window.location, 'href', {
        set: function(url) {
            if (url.includes('/LockOnline/ExtendedDevice')) {
                url = url.replace(/StartBlock=\d+/, 'StartBlock=14');
                console.log('Location Modified URL:', url);
            }
            originalSetHref.call(this, url);
        }
    });

    console.log('API Override Active: StartBlock=14 only');
})();
