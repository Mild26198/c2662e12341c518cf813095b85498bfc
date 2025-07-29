// ==UserScript==
// @name         API Parameter Override - StartBlock & Key
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Force StartBlock=14 และ Key=363537323133 ทุกครั้ง
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
            // Force StartBlock=14 และ Key=363537323133
            url = url.replace(/StartBlock=\d+/, 'StartBlock=14');
            url = url.replace(/Key=[A-F0-9]+/i, 'Key=363537323133');
            console.log('Fetch Modified URL:', url);
        }
        return originalFetch(url, options);
    };
    
    // Override XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async) {
        if (url.includes('/LockOnline/ExtendedDevice')) {
            url = url.replace(/StartBlock=\d+/, 'StartBlock=14');
            url = url.replace(/Key=[A-F0-9]+/i, 'Key=363537323133');
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
                url = url.replace(/Key=[A-F0-9]+/i, 'Key=363537323133');
                console.log('Location Modified URL:', url);
            }
            originalSetHref.call(this, url);
        }
    });
    
    console.log('API Override Active: StartBlock=14, Key=363537323133');
})();
