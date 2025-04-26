export function setupImagePreview(fileInputElement, previewContainerElement, onSelectedFile) {
    fileInputElement.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        let reader = new FileReader();
        reader.onload = function (e) {
            previewContainerElement.style.backgroundImage = `url('${e.target.result}')`;

            // 傳回檔案，用來傳至後端
            if (onSelectedFile) {
                onSelectedFile(file);
            }
        };

        reader.readAsDataURL(file);
    });
}
