EXT_NAME := vimfox
ZIP_NAME := $(EXT_NAME).zip
OUT_DIR := ext
SRC_FILES := background.js content.js manifest.json popup.html popup.js
CSS_DIR := css
IMG_DIR := images

.PHONY: all clean zip-linux zip-win

all: zip-linux zip-win

zip-linux:
	@echo "Создание ZIP-архива для Linux..."
	@mkdir -p $(OUT_DIR)
	@zip -r $(OUT_DIR)/$(ZIP_NAME) $(SRC_FILES) $(CSS_DIR) $(IMG_DIR) -x "test/*" "*.DS_Store"
	@echo "Готово: $(OUT_DIR)/$(ZIP_NAME)"

zip-win:
	@echo "Создание ZIP-архива для Windows..."
	@mkdir -p $(OUT_DIR)
	@powershell -Command "Compress-Archive -Path $(SRC_FILES) $(CSS_DIR) $(IMG_DIR) -DestinationPath $(OUT_DIR)/$(ZIP_NAME) -Force"
	@echo "Готово: $(OUT_DIR)/$(ZIP_NAME)"

clean:
	@echo "Очистка..."
	@rm -f $(OUT_DIR)/$(ZIP_NAME)
