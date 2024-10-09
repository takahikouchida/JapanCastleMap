### to PostGIS
```
shp2pgsql -c -i -I -D -s 4301 '郡地図 Ver2.0.2.shp' gunchizu > gunchizu.sql
```

### 郡を結合して国だけのポリゴンを作る
```
CREATE MATERIALIZED VIEW kuni_gunchizu AS
SELECT
    kuni,
    (ST_CollectionExtract(ST_Union(geom), 3)).geom AS geom
FROM
    gunchizu
GROUP BY
    kuni;
```


### to GeoJSON
```
ogr2ogr -f "GeoJSON" -t_srs "EPSG:4326" gunchizu.geojson PG:"dbname=gis user=postgres password=postgres host=localhost" "gunchizu"
ogr2ogr -f "GeoJSON" -t_srs "EPSG:4326" kunichizu.geojson PG:"dbname=gis user=postgres password=postgres host=localhost" "kuni_gunchizu"
```


### to PM Tiles
```
docker pull unvt/nanban
docker run -it --rm -v ${PWD}:/data unvt/nanban
tippecanoe -o kunichizu.pmtiles  -L gun:gunchizu.geojson.geojson -L kuni:kunichizu.geojson
```

### 城に国名を付与する

GeoJSONをPostGISへ登録する
```
root@53cdd5c388eb:/data# ogr2ogr -f "PostgreSQL" PG:"host=localhost port=5432 dbname=gis user=postgres password=postgres" shiro_all.geojson  -nln "shiro"
```

### カラムの追加
```
ALTER TABLE shiro
ADD COLUMN kuni varchar(255),
ADD COLUMN gun varchar(255);
```

### 国名、郡名を登録
```
UPDATE shiro
SET
    kuni = (select kuni from kuni_gunchizu where ST_Within(ST_Transform(shiro.wkb_geometry, 4301), kuni_gunchizu.geom)),
    gun = (select gun from gunchizu where ST_Within(ST_Transform(shiro.wkb_geometry, 4301), gunchizu.geom))
```

### PostGISからGeoJSONへ変換

```
ogr2ogr -f "GeoJSON" -t_srs "EPSG:4326" shiro.geojson PG:"dbname=gis user=postgres password=postgres host=localhost" "shiro"
```




