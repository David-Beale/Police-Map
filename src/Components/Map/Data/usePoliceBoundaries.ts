import { FeatureCollection, Theme } from "@here/harp-datasource-protocol";
import { MapView } from "@here/harp-mapview";
import {
  VectorTileDataSource,
  GeoJsonDataProvider,
} from "@here/harp-vectortile-datasource";
import { useEffect } from "react";
import { interpolateBlues } from "d3-scale-chromatic";

interface NeighbourhoodCount {
  [index: string]: number;
}
export const usePoliceBoundaries = (map: MapView | null) => {
  useEffect(() => {
    if (!map) return;

    (async () => {
      //fetch local data
      const res = await fetch("./data/policeBoundaries.json");
      if (res.status !== 200) return;
      const data: FeatureCollection = await res.json();
      const res2 = await fetch("./data/NeighbourhoodCount2021.json");
      if (res2.status !== 200) return;
      const neighbourhoods: NeighbourhoodCount = await res2.json();

      const maxCount = Math.max(...Object.values(neighbourhoods));

      data.features.forEach((feature) => {
        const count =
          neighbourhoods[feature.properties.NEIGHBORHOOD] / maxCount || 0;
        feature.properties.color = interpolateBlues(count);
        feature.properties.height = count * 2700;
      });

      const geoJsonDataProvider = new GeoJsonDataProvider("Seattle", data);

      const policeBoundaries = new VectorTileDataSource({
        dataProvider: geoJsonDataProvider,
        styleSetName: "geojson",
        gatherFeatureAttributes: true,
        addGroundPlane: false,
      });

      await map.addDataSource(policeBoundaries);

      const theme: Theme = {
        styles: {
          geojson: [
            {
              when: "$geometryType == 'polygon'",
              technique: "extruded-polygon",
              renderOrder: 1000,
              maxZoomLevel: 15,
              attr: {
                color: ["get", "color"],
                transparent: true,
                opacity: 0.6,
                constantHeight: true,
                boundaryWalls: false,
              },
            },
          ],
        },
      };
      policeBoundaries.setTheme(theme);

      map.update();
    })();
  }, [map]);
};
