import { MapView } from "@here/harp-mapview";
import {
  VectorTileDataSource,
  GeoJsonDataProvider,
} from "@here/harp-vectortile-datasource";
import { useEffect } from "react";

export const usePoliceBoundaries = (map: MapView | null) => {
  useEffect(() => {
    if (!map) return;
    (async () => {
      const geoJsonDataProvider = new GeoJsonDataProvider(
        "Seattle",
        new URL("Resources/police.json", window.location.href)
      );

      const policeBoundaries = new VectorTileDataSource({
        dataProvider: geoJsonDataProvider,
        styleSetName: "geojson",
        gatherFeatureAttributes: true,
        addGroundPlane: false,
      });

      await map.addDataSource(policeBoundaries);

      map.update();
    })();
  }, [map]);
};
