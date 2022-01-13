import { MapView } from "@here/harp-mapview";
import {
  VectorTileDataSource,
  APIFormat,
} from "@here/harp-vectortile-datasource";
import { Theme } from "@here/harp-datasource-protocol";
import { useEffect } from "react";

export const useReports = (map: MapView | null) => {
  useEffect(() => {
    if (!map) return;
    (async () => {
      const reports = new VectorTileDataSource({
        baseUrl: "https://xyz.api.here.com/hub/spaces/f2RCpkYJ/tile/web",
        apiFormat: APIFormat.XYZSpace,
        authenticationCode: "APvHpXqZRCCJxzzPCQ55ZwA", //Use this token!
        styleSetName: "geojson",
      });

      await map.addDataSource(reports);
      const theme: Theme = {
        styles: {
          geojson: [
            {
              when: "$geometryType == 'point'",
              technique: "circles",
              renderOrder: 10000,
              minZoomLevel: 15,
              attr: {
                transparent: true,
                opacity: 0.7,
                color: "#0080ff",
                size: ["+", ["*", ["get", "count"], 0.09], 10],
              },
            },
          ],
        },
      };
      reports.setTheme(theme);
      map.update();
    })();
  }, [map]);
};
