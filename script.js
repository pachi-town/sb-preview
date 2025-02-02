const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const croppedImage1 = document.getElementById('croppedImage1');
const croppedImage2 = document.getElementById('croppedImage2');

// エラーメッセージ表示エリア
const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.marginTop = '10px';
errorMessage.style.fontSize = '14px';
uploadZone.appendChild(errorMessage);

// 画像ファイルの読み込みとサイズチェック
function handleImageUpload(file) {
    if (!file.type.match('image/(jpeg|png)')) {
        showError('形式が違います（jpgまたはpngのみ対応）');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            if (img.width === 800 && img.height === 2000) {
                cropImages(img);
                clearError();
            } else {
                showError('サイズが違います（800×2000pxのみ対応）');
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 画像を切り取る処理
function cropImages(img) {
    // 表示イメージ①: 上360px + 下450pxを削除
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    canvas1.width = 800;
    canvas1.height = 1190; // 2000px - 360px (上) - 450px (下)
    ctx1.drawImage(img, 0, 360, 800, 1190, 0, 0, 800, 1190);

    const croppedImage1 = document.getElementById("croppedImage1");
    croppedImage1.src = canvas1.toDataURL();

    // 表示イメージ②: 上360px + 下360pxを削除
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 800;
    canvas2.height = 1280; // 2000px - 360px (上) - 360px (下)
    ctx2.drawImage(img, 0, 360, 800, 1280, 0, 0, 800, 1280);

    const croppedImage2 = document.getElementById("croppedImage2");
    croppedImage2.src = canvas2.toDataURL();
}


// エラーメッセージを表示
function showError(message) {
    errorMessage.textContent = message;
}

// エラーメッセージをクリア
function clearError() {
    errorMessage.textContent = '';
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
    uploadZone.style.borderColor = "#007bff";
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
