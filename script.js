// HTML要素を取得
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const croppedImage1 = document.getElementById('croppedImage1');
const croppedImage2 = document.getElementById('croppedImage2');
const errorMessage = document.getElementById('error-message');

// 最大許容サイズ（701KB = 717,824バイト）
const MAX_FILE_SIZE = 717824;

// 画像ファイルの読み込み
function handleImageUpload(file) {
    // **新しい画像が選択されたら、まずエラーメッセージを消す**
    clearError();

    // ファイル形式チェック
    if (!file.type.match(/image\/(jpeg|png)/)) {
        displayError("対応していないファイル形式です（JPGまたはPNGのみ）");
        return;
    }

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
        displayError("ファイルサイズが大きすぎます（最大700KB）");
        return;
    }

    const img = new Image();
    img.onload = function () {
        // 画像サイズチェック
        if (img.width !== 800 || img.height !== 2000) {
            displayError("サイズが違います（800×2000pxのみ対応）");
            return;
        }

        // **ここでもう一度エラーメッセージを消す（念のため）**
        clearError();

        // 表示イメージ① (上290px + 下320px 削除)
        cropImage(img, croppedImage1, 290, 320);
        // 表示イメージ② (上290px + 下290px 削除)
        cropImage(img, croppedImage2, 290, 290);
    };

    // 画像の読み込みエラー処理
    img.onerror = function () {
        displayError("画像の読み込みに失敗しました");
    };

    // 画像を読み込む
    img.src = URL.createObjectURL(file);
}

// 画像を切り取る処理
function cropImage(img, previewElement, topCrop, bottomCrop) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 切り取る範囲を指定
    canvas.width = 800;
    canvas.height = 2000 - topCrop - bottomCrop;
    ctx.drawImage(img, 0, -topCrop, 800, 2000);

    // 切り取った画像をプレビューに表示
    previewElement.src = canvas.toDataURL();
}

// エラーメッセージを表示する関数
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// **エラーメッセージを消す関数**
function clearError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}

// ドラッグアンドドロップのイベント
uploadZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadZone.style.borderColor = "#28a745";
});

uploadZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

// ファイル選択のイベント
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});
