<?php

// リンク先のURLリスト
$links = [
    "北海道" => "https://www.nokotsudo.info/list/hokkaido.html",
    "青森県" => "https://www.nokotsudo.info/list/aomori.html",
    "岩手県" => "https://www.nokotsudo.info/list/iwate.html",
    "宮城県" => "https://www.nokotsudo.info/list/miyagi.html",
    "秋田県" => "https://www.nokotsudo.info/list/akita.html",
    "山形県" => "https://www.nokotsudo.info/list/yamagata.html",
    "福島県" => "https://www.nokotsudo.info/list/fukushima.html",
    "茨城県" => "https://www.nokotsudo.info/list/ibaraki.html",
    "栃木県" => "https://www.nokotsudo.info/list/tochigi.html",
    "群馬県" => "https://www.nokotsudo.info/list/gunma.html",
    "埼玉県" => "https://www.nokotsudo.info/list/saitama.html",
    "千葉県" => "https://www.nokotsudo.info/list/chiba.html",
    "東京23区" => "https://www.nokotsudo.info/list/tokyo-23.html",
    "東京市町部" => "https://www.nokotsudo.info/list/tokyoshichoubu.html",
    "神奈川県" => "https://www.nokotsudo.info/list/kanagawa.html",
    "新潟県" => "https://www.nokotsudo.info/list/nigata.html",
    "富山県" => "https://www.nokotsudo.info/list/toyama.html",
    "石川県" => "https://www.nokotsudo.info/list/ishikawa.html",
    "福井県" => "https://www.nokotsudo.info/list/fukui.html",
    "山梨県" => "https://www.nokotsudo.info/list/yamanashi.html",
    "長野県" => "https://www.nokotsudo.info/list/nagano.html",
    "岐阜県" => "https://www.nokotsudo.info/list/gifu.html",
    "静岡県" => "https://www.nokotsudo.info/list/shizuoka.html",
    "愛知県" => "https://www.nokotsudo.info/list/aichi.html",
    "三重県" => "https://www.nokotsudo.info/list/mie.html",
    "滋賀県" => "https://www.nokotsudo.info/list/shiga.html",
    "京都府" => "https://www.nokotsudo.info/list/kyoto.html",
    "大阪府" => "https://www.nokotsudo.info/list/osaka.html",
    "兵庫県" => "https://www.nokotsudo.info/list/hyogo.html",
    "奈良県" => "https://www.nokotsudo.info/list/nara.html",
    "和歌山県" => "https://www.nokotsudo.info/list/wakayama.html",
    "鳥取県" => "https://www.nokotsudo.info/list/tottori.html",
    "島根県" => "https://www.nokotsudo.info/list/shimane.html",
    "岡山県" => "https://www.nokotsudo.info/list/okayama.html",
    "広島県" => "https://www.nokotsudo.info/list/hiroshima.html",
    "山口県" => "https://www.nokotsudo.info/list/yamaguchi.html",
    "徳島県" => "https://www.nokotsudo.info/list/tokushima.html",
    "香川県" => "https://www.nokotsudo.info/list/kagawa.html",
    "愛媛県" => "https://www.nokotsudo.info/list/ehime.html",
    "高知県" => "https://www.nokotsudo.info/list/kochi.html",
    "福岡県" => "https://www.nokotsudo.info/list/fukuoka.html",
    "佐賀県" => "https://www.nokotsudo.info/list/saga.html",
    "長崎県" => "https://www.nokotsudo.info/list/nagasaki.html",
    "熊本県" => "https://www.nokotsudo.info/list/kumamoto.html",
    "大分県" => "https://www.nokotsudo.info/list/oita.html",
    "宮崎県" => "https://www.nokotsudo.info/list/miyazaki.html",
    "鹿児島県" => "https://www.nokotsudo.info/list/kagoshima.html",
    "沖縄県" => "https://www.nokotsudo.info/list/okinawa.html",
];

// 保存するディレクトリ
$saveDir = __DIR__ . "/downloads";

// ディレクトリが存在しない場合は作成
if (!is_dir($saveDir)) {
    mkdir($saveDir, 0777, true);
}

foreach ($links as $prefecture => $url) {
    // ファイル名を都道府県名で保存
    $fileName = $saveDir . "/" . $prefecture . ".html";

    // リンク先のデータを取得
    $fileContent = file_get_contents($url);

    if ($fileContent !== false) {
        // データをファイルに保存
        file_put_contents($fileName, $fileContent);
        echo "Downloaded: $prefecture ($url)\n";
    } else {
        echo "Failed to download: $prefecture ($url)\n";
    }
}

echo "ダウンロードが完了しました。\n";
?>
