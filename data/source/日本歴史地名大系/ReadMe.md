
https://geoshape.ex.nii.ac.jp/nrct/

地名項目データセット（2023年11月24日版）

[geoshape-nrct-geolod.csv](geoshape-nrct-geolod.csv)

### to PM Tiles
```
docker pull unvt/nanban
docker run -it --rm -v ${PWD}:/data unvt/nanban
tippecanoe -o chimei.pmtiles  -L chimei:chimei.geojson
```
