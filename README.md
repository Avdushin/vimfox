### 🔄 1. Обнови расширение

1. Перейди в `about:debugging#/runtime/this-firefox`;
2. Удали старое расширение;
3. Загрузите снова с новым `manifest.json`.

---

### ✅ 2. Дополнительно: проверь, где тестируешь

Firefox **не разрешает контент-скриптам** работать на:

* `about:` страницах (`about:newtab`, `about:blank`, `about:home`);
* `addons.mozilla.org`;
* `chrome://` страницах;
* страницах расширений.

✅ Проверь работу на любом обычном сайте, например:
[https://en.wikipedia.org/wiki/Cat](https://en.wikipedia.org/wiki/Cat)

---