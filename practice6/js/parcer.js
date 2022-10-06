"use strict";

window.addEventListener("DOMContentLoaded", () => {

    const body = document.querySelector("body");
    let textNodes = [];

    function recurcy(element) {
        element.childNodes.forEach(node => {
            if (node.nodeName.match(/^A/)) {
                const obj = {
                    link: node.nodeName,
                    content: node.textContent
                };

                textNodes.push(obj);
            } else {
                recurcy(node);
            }
        });
    }

    recurcy(body);

    fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },

        body: JSON.stringify(textNodes)
    
    })
        .then(response => response.json())
        .then(json => console.log(json));

});