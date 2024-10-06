shiro.geojson


<?php

$json = json_decode(file_get_contents("shiro.geojson"),true);

foreach($json['features'] as $feature) {
    echo $feature['properties']['title'].PHP_EOL;
}


//print_r($json['features'][0]['properties']['title']);


?>