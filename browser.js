// ==UserScript==
// @name         newgen fuckery
// @author       forveined
// @match        https://receive-sms-free.cc/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const a = document.querySelectorAll('span');
    const b = /\+358\s\d{10}/g;
    const c = [];
    a.forEach(d => {
        const e = d.textContent;
        const f = e.match(b);
        if (f) {
            c.push(...f);
        }
    });
    console.log('numbers:', c);
})();
