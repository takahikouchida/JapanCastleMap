<?php
//echo "<html><head><meta charset='utf-8'></head>";

//$no_coordinates_list_file_name = "no_coordinates_list.csv";
//$no_coordinates_list = "";

//$features = [];



$data = file_get_contents("shiro.geojson");
$geoJson = json_decode($data, true);

//$features = $geoJson["features"];

// result  ディレクトリのファイルに処理をする
$files = scandir('result_full');
    foreach ($files as $file) {

        if (!is_dir($file)) {

            $content = file_get_contents("./result_full/" . $file);
            $json = json_decode($content, true);

            if (isset($json['query']['pages'])) {

                foreach ($json['query']['pages'] as $id => $page) {
                    if (isset($page["title"])) {
                        $title = $page['title'];
                        $extract = $page['extract'];
                        $thumbnail = isset($page['thumbnail']['source'])?$page['thumbnail']['source']:"";
                        $revisions = $page['revisions'][0]["*"];
                    } else {
                        $title = null;
                        $revisions = null;
                    }
                    $coodinate = extractAndConvertCoordinates($revisions);

                    if($coodinate === false) {

                        // 転送の場合
                        $redirect = extractRedirect($revisions);
                        if($redirect != false) {
//                            echo "転送:$title"."=>".$redirect."<br/>".PHP_EOL;

                        } else {
                            $coodinate = extractAndConvertCoordinates2($revisions);
                            if ($coodinate === false) {
//                                echo "<a target='_blank' href='https://ja.wikipedia.org/wiki/" . urlencode($title) . "'>" . $title . "</a><br>" . PHP_EOL;
                            }
                        }
                    }

                    if($coodinate !== false) {

                        $newfeature = [
                            "type" => "Feature",
                            "geometry" => [
                                "type" => "Point",
                                "coordinates" => [$coodinate["lon"], $coodinate["lat"]]
                            ],
                            "properties" => [
                                "title" => $title,
//                                "extract" => $extract,
                                "thumbnail" =>$thumbnail
                            ]
                        ];
                        array_push($geoJson["features"], $newfeature);
                    }
                }
            }
        }
    }

//$geojson = [
//    "type" => "FeatureCollection",
//    "features" => $features
//];
//file_put_contents($no_coordinates_list_file_name,$no_coordinates_list);

file_put_contents("shiro_all.geojson",json_encode($geoJson));


function extractAndConvertCoordinates($inputString)
{
    // 文字列から位置座標情報を抽出するための正規表現パターン
    $pattern = '/\{\{ウィキ座標2段度分秒\|(\d+)\|(\d+)\|([\d\.]+)\|(N|S)\|(\d+)\|(\d+)\|([\d\.]+)\|(E|W)\|.*\}\}/';

    // 正規表現を使用して位置座標情報を抽出
    preg_match($pattern, $inputString, $matches);

    // 座標情報が見つからなかった場合はエラーを表示
    if (empty($matches)) {
        //echo "座標情報が見つかりませんでした。";
        return false;
    }

    // マッチした座標情報を取得
    $latitudeDegree = $matches[1];
    $latitudeMinute = $matches[2];
    $latitudeSecond = $matches[3];
    $latitudeDirection = $matches[4];

    $longitudeDegree = $matches[5];
    $longitudeMinute = $matches[6];
    $longitudeSecond = $matches[7];
    $longitudeDirection = $matches[8];

    // 度分秒から10進数の緯度経度に変換
    $latitude = convertToDecimal($latitudeDegree, $latitudeMinute, $latitudeSecond, $latitudeDirection);
    $longitude = convertToDecimal($longitudeDegree, $longitudeMinute, $longitudeSecond, $longitudeDirection);

    // 10進数の緯度経度を表示
//    echo "10進数の緯度: " . $latitude . ", 10進数の経度: " . $longitude;
//    return [$longitude, $latitude];
    return [
        "lon" => $longitude,
        "lat" => $latitude
        ];
}

// 度分秒を10進数に変換する関数
function convertToDecimal($degree, $minute, $second, $direction)
{
    $decimal = $degree + ($minute / 60) + ($second / 3600);
    if ($direction === 'S' || $direction === 'W') {
        $decimal = -$decimal; // 南半球または西半球の場合はマイナスを付ける
    }
    return $decimal;
}


function extractAndConvertCoordinates2($inputString)
{
    // 文字列から位置座標情報を抽出するための正規表現パターン
    $pattern = '/\{\{coord\|(\d+)\|(\d+)\|([\d\.]+)\|(N|S)\|(\d+)\|(\d+)\|([\d\.]+)\|(E|W)\|.*\}\}/';

    // 正規表現を使用して位置座標情報を抽出
    preg_match($pattern, $inputString, $matches);

    // 座標情報が見つからなかった場合はエラーを表示
    if (empty($matches)) {
//        echo "座標情報が見つかりませんでした。";
        return false;
    }

    // マッチした座標情報を取得
    $latitudeDegree = $matches[1];
    $latitudeMinute = $matches[2];
    $latitudeSecond = $matches[3];
    $latitudeDirection = $matches[4];

    $longitudeDegree = $matches[5];
    $longitudeMinute = $matches[6];
    $longitudeSecond = $matches[7];
    $longitudeDirection = $matches[8];

    // 度分秒から10進数の緯度経度に変換
    $latitude = convertToDecimal($latitudeDegree, $latitudeMinute, $latitudeSecond, $latitudeDirection);
    $longitude = convertToDecimal($longitudeDegree, $longitudeMinute, $longitudeSecond, $longitudeDirection);

    // 10進数の緯度経度を表示
//    echo "10進数の緯度: " . $latitude . ", 10進数の経度: " . $longitude;
    return [
        "lon" => $longitude,
        "lat" => $latitude
    ];
}


function extractRedirect($inputString)
{
    // 文字列が#転送から始まるかを確認
    if (strpos($inputString, '#転送') === 0) {
        // 文字列からページタイトルを抽出するための正規表現パターン
        $pattern = '/\[\[(.*?)\]\]/';

        // 正規表現を使用してページタイトルを抽出
        preg_match($pattern, $inputString, $matches);

        // タイトルが見つからなかった場合はエラーを表示
        if (empty($matches)) {
//            echo "タイトルが見つかりませんでした。";
            return false;
        }

        // マッチしたタイトルを取得
        $pageTitle = $matches[1];

        // タイトルを表示
        //echo "抽出されたタイトル: " . $pageTitle;
        return $pageTitle;
    } else {
        return false;
    }
}

?>