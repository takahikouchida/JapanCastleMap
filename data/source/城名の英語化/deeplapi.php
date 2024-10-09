<?php

// Deepl APIキー
$api_key = 'd60c900e-8a11-6107-282b-260a511a6f03:fx';

$json = json_decode(file_get_contents("shiro.geojson"),true);

foreach($json['features'] as &$feature) {

//    $urls[] = 'https://ufirst.jp/JapanCastleMap/map/'.urlencode($feature['properties']['title']);
    $feature['properties']['title_en'] = translateText($feature['properties']['title'], 'EN');
}

file_put_contents( 'shiro_en.geojson',json_encode($json) );

function translateText($text, $targetLanguage = 'EN') {
    // Deepl APIキー
    $api_key = 'd60c900e-8a11-6107-282b-260a511a6f03:fx';

    // Deepl APIのエンドポイント
    $api_url = 'https://api-free.deepl.com/v2/translate';

    // APIリクエストのデータ
    $data = array(
        'auth_key' => $api_key,
        'text' => $text,
        'target_lang' => $targetLanguage,
    );

    // cURLセットアップ
    $ch = curl_init($api_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // APIリクエストの実行
    $response = curl_exec($ch);

    // cURLセッションのクローズ
    curl_close($ch);

    // レスポンスの解析
    $result = json_decode($response, true);


    // 翻訳結果の返却
    if ($result && isset($result['translations'][0]['text'])) {
        echo $text.':'.$result['translations'][0]['text'].PHP_EOL;
        return $result['translations'][0]['text'];
    } else {
        echo $text.':'.PHP_EOL;
        return '';
    }
}

?>
