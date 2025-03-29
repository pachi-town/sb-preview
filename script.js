// HTML要素を取得する
定数アップロードゾーン = document.getElementById('アップロードゾーン');
const fileInput = document.getElementById('fileInput');
const croppedImage1 = document.getElementById('croppedImage1');
const croppedImage2 = document.getElementById('croppedImage2');
エラーメッセージは document.getElementById('エラーメッセージ');

// 最大許容サイズ（701KB = 717,824バイト）
定数MAX_FILE_SIZE = 717824;

// 画像ファイルの読み込み
関数handleImageUpload(ファイル) {
    // ファイル形式チェック
    ファイルタイプが/image\/(jpeg|png)/と一致する場合
        displayError("対応していないファイル形式です（JPGまたはPNGのみ）");
        戻る;
    }

    // ファイルサイズチェック
    ファイルサイズが MAX_FILE_SIZE より大きい場合
        displayError("ファイルサイズが大きすぎます（最大701KB）");
        戻る;
    }

    const img = 新しい画像();
    img.onload = 関数（）{
        // 画像サイズチェック
        (画像の幅 !== 800 || 画像の高さ !== 2000) {
            displayError("サイズが違います（800×2000pxのみ対応）");
            戻る;
        }

        // 通常時はエラーメッセージを消去
        エラーをクリアします。

        // 表示イメージ① (上290px + 下320px 削除)
        cropImage(画像、切り取られた画像1、290、320);
        // 表示イメージ② (上290px + 下290px 削除)
        cropImage(画像、切り取られた画像2、290、290);
    };
    img.src = URL.createObjectURL(ファイル);
}

// 画像を切り取る処理
関数 cropImage(img, previewElement, topCrop, bottomCrop) {
    定数キャンバス = document.createElement('キャンバス');
    const ctx = canvas.getContext('2d');

    // 切り取る範囲を指定
    キャンバスの幅 = 800;
    キャンバスの高さ = 2000 - 上部クロップ - 下部クロップ;
    ctx.drawImage(img, 0, -topCrop, 800, 2000);

    // 切り取った画像をプレビューに表示
    previewElement.src = canvas.toDataURL();
}

// エラーメッセージを表示する関数
関数 displayError(メッセージ) {
    errorMessage.textContent = メッセージ;
    errorMessage.style.display = "ブロック"; // エラーメッセージを表示
}

// エラーメッセージを停止関数（画像が正常なら停止）
関数 clearError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "なし";
}

// リサイクルアンドドロップのイベント
uploadZone.addEventListener('dragover', (イベント) => {
    イベントをデフォルトにしない();
    アップロードゾーンのスタイルを境界線の色で指定します。
});

アップロードゾーン.addEventListener('ドロップ', (イベント) => {
    イベントをデフォルトにしない();
    定数ファイル = event.dataTransfer.files[0];
    if (ファイル) {
        handleImageUpload(ファイル);
    }
});

// ファイル選択のイベント
fileInput.addEventListener('change', (イベント) => {
    定数ファイル = event.target.files[0];
    if (ファイル) {
        handleImageUpload(ファイル);
    }
});
