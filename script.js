document.addEventListener("DOMContentLoaded", function() {
    const noButton = document.getElementById("no-btn");

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Android cihazlarÄ±nda direkt olarak butonu rastgele bir yere hareket ettir
        setInterval(moveButtonRandomly, 250); // 0.3 saniyede bir hareket ettir
    } else {
        // DiÄŸer cihazlarda mouse butona geldiÄŸinde butonu rastgele bir yere hareket ettir
        noButton.addEventListener("mouseover", function() {
            moveButtonRandomly();
        });
    }
});

function moveButtonRandomly() {
    const button = document.getElementById("no-btn");
    const bodyWidth = document.body.offsetWidth;
    const bodyHeight = document.body.offsetHeight;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Ekran sÄ±nÄ±rlarÄ±nÄ± belirle
    const maxX = bodyWidth - buttonWidth;
    const maxY = bodyHeight - buttonHeight;

    // Rastgele bir konum seÃ§
    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);

    // Ekran sÄ±nÄ±rlarÄ±na Ã§arpma
    x = Math.max(x, 0); // x en az 0 olmalÄ±
    y = Math.max(y, 0); // y en az 0 olmalÄ±
    x = Math.min(x, maxX); // x en fazla maxX olmalÄ±
    y = Math.min(y, maxY); // y en fazla maxY olmalÄ±

    // Butonun konumunu gÃ¼ncelle
   
    button.style.left = x + "px";
    button.style.top = y + "px";
}

















let popupCounter = 0; // Popup sayacÄ±
let tabPressed = false; // Tab tuÅŸuna basÄ±ldÄ± mÄ±?

// SaÄŸ tÄ±klama olayÄ±nÄ± engelleme
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

// Alt + F4 ve Ctrl + U tuÅŸlarÄ±nÄ±n engellenmesi
document.addEventListener("keydown", function(e) {
    if ((e.altKey && e.key === "F4") || (e.ctrlKey && e.key === "u")) {
        e.preventDefault();
    }
});

// Tab tuÅŸunun engellenmemesi ve uyarÄ± mesajÄ±nÄ±n gÃ¶sterilmesi
document.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
        // EÄŸer tab tuÅŸuna daha Ã¶nce basÄ±lmÄ±ÅŸsa
        if (tabPressed) {
            e.preventDefault(); // Tab tuÅŸunu engelle
            return;
        }

        // Tab tuÅŸuna basÄ±ldÄ±ÄŸÄ±nÄ± iÅŸaretle
        tabPressed = true;

        // 200 pop-up oluÅŸtur
        for (let i = 0; i < 200; i++) {
            createPopup();
        }

        // Tab tuÅŸuna bir daha basÄ±ldÄ±ÄŸÄ±nda tab tuÅŸunun Ã§alÄ±ÅŸmamasÄ± iÃ§in
        e.preventDefault();
    }
});

// Pop-up oluÅŸturma fonksiyonu
function createPopup() {
    // UyarÄ± mesajÄ± iÃ§in bir div oluÅŸtur
    const alertDiv = document.createElement("div");
    alertDiv.textContent = "Hile yapma";
    alertDiv.style.position = "fixed";
    alertDiv.style.top = `${Math.random() * 100}%`; // YÃ¼kseklik
    alertDiv.style.left = `${Math.random() * 100}%`; // GeniÅŸlik
    alertDiv.style.transform = "translate(-50%, -50%)";
    alertDiv.style.backgroundColor = "red";
    alertDiv.style.color = "white";
    alertDiv.style.padding = "20px";
    alertDiv.style.borderRadius = "10px";
    alertDiv.style.zIndex = "9999";

    // Div'i body'ye ekle
    document.body.appendChild(alertDiv);

    // Popup sayacÄ±nÄ± arttÄ±r
    popupCounter++;

    // 5 saniye sonra div'i kaldÄ±r
    setTimeout(function() {
        document.body.removeChild(alertDiv);
        popupCounter--;

        // EÄŸer tÃ¼m pop-up'lar kaybolduysa
        if (popupCounter === 0 && tabPressed) {
            // Tab tuÅŸuna basÄ±lmamÄ±ÅŸ olarak iÅŸaretle
            tabPressed = false;
        }

        // HayÄ±r butonunu kaldÄ±r
        if (popupCounter === 0) {
            const noButton = document.getElementById("no-btn");
            noButton.remove();
        }
    }, 2000);
}
