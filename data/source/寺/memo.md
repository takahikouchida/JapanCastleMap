https://www.nokotsudo.info/list/

http://jiin-shiryo.komajo.ac.jp/



docker run --rm -v $(pwd):/usr/src/myapp -w /usr/src/myapp php:8.1-cli php download.php


### to PM Tiles
```
docker pull unvt/nanban
docker run -it --rm -v ${PWD}:/data unvt/nanban
tippecanoe -o temple.pmtiles  -L temple:temple.geojson
```
/Users/uchidatakahiko/myproject/castlemap_jp/data/source/寺/