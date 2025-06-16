const input = document.getElementById("text-input");
const langSelect = document.getElementById("lang-select");
const resultDiv = document.getElementById("translation-result");

let debounceTimer;

function translate(text, target) {
    chrome.runtime.sendMessage({
        type: "translate",
        payload: {
            q: text,
            source: "auto",
            target: target === "auto" ? "ru" : target,
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
    if (text.length < 2) {
        resultDiv.textContent = "Введите текст для перевода";
        return;
    }
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
