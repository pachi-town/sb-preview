// HTML要素を取得
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const croppedImage = document.getElementById('croppedImage');

// 制限定数
const MAX_FILE_SIZE = 717312; // 701KB
const ALLOWED_WIDTH = 800;
const ALLOWED_HEIGHT = 2000;

// 画像ファイルの読み込み
function handleImageUpload(file) {
    if (file.size > MAX_FILE_SIZE) {
        displayError("ファイルサイズが701KBを超えています");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            if (img.width !== ALLOWED_WIDTH || img.height !== ALLOWED_HEIGHT) {
                displayError("サイズが違います");
                return;
            }
            cropImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// エラーメッセージを表示
function displayError(message) {
    uploadZone.style.borderColor = "red";
    uploadZone.textContent = message;
    setTimeout(() => {
        uploadZone.textContent = ""; // エラーを消す
        uploadZone.style.borderColor = "#007bff";
    }, 3000); // 3秒後にエラーメッセージをリセット
}

// 画像を切り取る処理
function cropImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 切り取る範囲を指定
    canvas.width = 800;
    canvas.height = 1190; // 2000px - 360px (上) - 450px (下)
    ctx.drawImage(img, 0, -360, 800, 2000);

    // 切り取った画像をプレビューに表示
    croppedImage.src = canvas.toDataURL();
}

// ドラッグアンドドロップのイベント
uploadZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadZone.style.borderColor = "#28a745";
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = "#007bff";
});

uploadZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageUpload(file);
    }
});

// ファイル選択のイベント
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageUpload(file);
    }
});
