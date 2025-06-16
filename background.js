chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "translate") {
        fetch("http://localhost:5000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message.payload)
        })
            .then((res) => res.json())
            .then((data) => {
                sendResponse({ success: true, translation: data.translatedText });
            })
            .catch((err) => {
                console.error("Translation error from background:", err);
                sendResponse({ success: false });
            });

        return true; // обязательно для асинхронного ответа
    }
    console.log("Translation request:", message.payload);
});
