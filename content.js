function createPopup(translation, x, y) {
  const existingPopup = document.querySelector(".vimbox-popup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.textContent = translation;
  popup.className = "vimbox-popup";
  popup.style.position = "absolute";
  popup.style.background = "#222";
  popup.style.color = "white";
  popup.style.padding = "8px 12px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  popup.style.zIndex = "9999";
  popup.style.top = `${y + 10}px`;
  popup.style.left = `${x + 10}px`;
  popup.style.maxWidth = "300px";
  popup.style.userSelect = "text"; // ✅ позволяет копировать текст
  popup.style.cursor = "text";

  document.body.appendChild(popup);

  const removePopup = (ev) => {
    if (!popup.contains(ev.target)) {
      popup.remove();
      document.removeEventListener("click", removePopup);
    }
  };
  setTimeout(() => {
    document.addEventListener("click", removePopup);
  }, 100);
}

async function translateText(text) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        type: "translate",
        payload: {
          q: text,
          source: "en",
          target: "ru",
          format: "text"
        }
      },
      (response) => {
        if (response?.success) {
          resolve(response.translation);
        } else if (!response) {
          resolve("Переводчик недоступен");
        } else {
          resolve("Ошибка перевода");
        }
      }
    );
  });
}


document.addEventListener("mouseup", async (e) => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const selectedText = selection.toString().trim();
  if (selectedText.length < 2) return;

  // Не переводим текст в попапе
  if (e.target.closest(".vimbox-popup")) return;

  const translation = await translateText(selectedText);
  createPopup(translation, e.pageX, e.pageY);
  console.log("Selected:", selectedText);
});