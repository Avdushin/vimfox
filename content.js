function createPopup(translation, x, y) {
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
  document.body.appendChild(popup);

  const removePopup = () => {
    popup.remove();
    document.removeEventListener("click", removePopup);
  };
  setTimeout(() => {
    document.addEventListener("click", removePopup);
  }, 100);
}

async function translateText(text) {
  try {
    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "ru",
        format: "text"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      console.error("Ошибка HTTP:", res.status, res.statusText);
      const errText = await res.text();
      console.error("Ответ сервера:", errText);
      return "Ошибка перевода";
    }

    const data = await res.json();
    console.log("Translation result:", data);
    return data.translatedText;
  } catch (err) {
    console.error("Translation error:", err);
    return "Ошибка перевода";
  }
}

document.addEventListener("mouseup", async (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    console.log("Selected text:", selectedText);
    const translation = await translateText(selectedText);
    createPopup(translation, e.pageX, e.pageY);
  }
});
