<?php

$putputfilename = "shiro.geojson";

//$no_coordinates_list_file_name = "no_coordinates_list.csv";
$no_coordinates_list = "";

$features = [];

// result  ディレクトリのファイルに処理をする
$files = scandir('result');
    foreach ($files as $file) {

        if (!is_dir($file)) {

            $content = file_get_contents("./result/" . $file);
            $json = json_decode($content, true);

//            print_r($json);

            if (isset($json['query']['pages'])) {

                foreach ($json['query']['pages'] as $id => $page) {
                    if (isset($page["extract"])) {
                        $title = $page['title'];
                        $extract = $page['extract'];
                        $thumbnail = isset($page['thumbnail']['source'])?$page['thumbnail']['source']:"";
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

                    if (isset($title) && isset($extract) && isset($lat) && isset($lon)) {

                        $newfeature = [
                            "type" => "Feature",
                            "geometry" => [
                                "type" => "Point",
                                "coordinates" => [$lon, $lat]
                            ],
                            "properties" => [
                                "title" => $title,
//                                "extract" => $extract,
                                "thumbnail" =>$thumbnail
                            ]
                        ];
                        array_push($features, $newfeature);
                    } else {
                        if($title != null) {

                            // 座標を取得出来ない城は再度APIを叩く
                            echo $title.PHP_EOL;
                            //$no_coordinates_list .= $title . PHP_EOL;
                            $url = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|revisions|pageimages&rvprop=content&titles=".urlencode($title);
                            file_put_contents("./result_full/".$title.'.json',file_get_contents($url));
                        }
                    }
                }
            }
        }
    }

$geojson = [
    "type" => "FeatureCollection",
    "features" => $features
];
//file_put_contents($no_coordinates_list_file_name,$no_coordinates_list);

//echo json_encode($geojson);

file_put_contents($putputfilename,json_encode($geojson));


?>