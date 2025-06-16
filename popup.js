const input = document.getElementById("text-input");
const langSelect = document.getElementById("lang-select");
const resultDiv = document.getElementById("translation-result");

let debounceTimer;

function detectLang(text) {
    // Простейшая проверка — есть ли русские буквы
    return /[а-яА-ЯёЁ]/.test(text) ? "ru" : "en";
}

function translate(text, targetSelectValue) {
    const detected = detectLang(text);
    let targetLang = targetSelectValue;

    if (targetSelectValue === "auto") {
        // если текст на русском — переводим на английский
        targetLang = detected === "ru" ? "en" : "ru";
    }

    chrome.runtime.sendMessage({
        type: "translate",
        payload: {
            q: text,
            source: "auto", // пусть сервер определяет
            target: targetLang,
            format: "text"
        }
    }, (response) => {
        if (response?.success) {
            resultDiv.textContent = response.translation;
        } else {
            resultDiv.textContent = "Ошибка перевода";
        }
    });
}

input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const text = input.value.trim();
    // if (text.length < 2) {
    //     resultDiv.textContent = "Введите текст для перевода";
    //     return;
    // }
    debounceTimer = setTimeout(() => {
        translate(text, langSelect.value);
    }, 500);
});

langSelect.addEventListener("change", () => {
    const text = input.value.trim();
    if (text.length > 1) {
        translate(text, langSelect.value);
    }
});

// Установим фокус сразу на поле ввода
window.addEventListener("DOMContentLoaded", () => {
    input.focus();
});