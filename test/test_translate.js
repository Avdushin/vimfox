async function translate() {
  const response = await fetch("http://localhost:5000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: "Привет, мир!",
      source: "ru",
      target: "en"
    }),
  });

  if (!response.ok) {
    console.error("Ошибка HTTP:", response.status, response.statusText);
    const text = await response.text();
    console.error("Ответ сервера:", text);
    return;
  }

  const data = await response.json();
  console.log("Ответ сервера JSON:", data);
  console.log("Перевод:", data.translatedText);
}

translate();
