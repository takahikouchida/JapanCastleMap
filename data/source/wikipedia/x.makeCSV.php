<?php

$features = [];

// result  ディレクトリのファイルに処理をする
$files = scandir('result');
    foreach ($files as $file) {

        if (!is_dir($file)) {

            $content = file_get_contents("./result/" . $file);
            $json = json_decode($content, true);

            if (isset($json['query']['pages'])) {

                foreach ($json['query']['pages'] as $id => $page) {
                    if (isset($page["extract"])) {
                        $title = $page['title'];
                        $extract = $page['extract'];
                    } else {
                        $title = null;
                        $extract = null;
                    }

                    if (isset($page['coordinates'])) {
                        foreach ($page['coordinates'] as $coord) {
                            $lat = $coord['lat'];
                            $lon = $coord['lon'];
                        }
                    } else {
                        $lat = null;
                        $lon = null;
                    }
                    echo $file.",".$title.",".$lon.",".$lat.PHP_EOL;
                    if (isset($title) && isset($extract) && isset($lat) && isset($lon)) {

                        $newfeature = [
                            "type" => "Feature",
                            "geometry" => [
                                "type" => "Point",
                                "coordinates" => [$lon, $lat]
                            ],
                            "properties" => [
                                "title" => $title,
                                "extract" => $extract
                            ]
                        ];
                        array_push($features, $newfeature);

                    }
                }
            }
        }
    }

//$geojson = [
//    "type" => "FeatureCollection",
//    "features" => $features
//];
//echo json_encode($geojson);
?>