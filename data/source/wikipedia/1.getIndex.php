<?php
$url = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9F%8E%E4%B8%80%E8%A6%A7";

$data = file_get_contents($url);
$json = json_decode($data, true);

$pageid = array_keys($json['query']['pages'])[0];
$content = $json['query']['pages'][$pageid]['revisions'][0]['*'];

//
preg_match_all('/\[\[((?!(#|File:|ファイル:|:Category:))(.*?)(?<!\.jpg))(?:\|.*?)?]]/', $content, $matches);

$links = $matches[1];

$start_key = array_search('松前城', $links);
$end_key = array_search('順天城', $links);

if ($start_key !== false && $end_key !== false) {
    $length = $end_key - $start_key + 1;
    $subarray = array_slice($links, $start_key, $length);
} else {
    echo "松前城 or 順天城 is not found in the array";
}

print_r($subarray);

//exit;

// result フォルダがなければ生成する
if (!file_exists("result")) {
        mkdir("result");
    }

foreach($subarray as $item) {
    echo $item.PHP_EOL;
//    $url = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|coordinates&explaintext&titles=".urlencode($item);
    $url = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|coordinates|pageimages&explaintext&titles=".urlencode($item);

    //    $data = file_get_contents($url);
    file_put_contents("./result/".$item.'.json',file_get_contents($url));
}
?>