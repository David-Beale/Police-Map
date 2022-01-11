import React, { useEffect, useRef, useState } from "react";

import { GeoCoordinates, sphereProjection } from "@here/harp-geoutils";
import { GeoJsonDataProvider } from "@here/harp-geojson-datasource";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
import { MapView } from "@here/harp-mapview";

import { theme } from "./Config";
import { VectorTileDataSource } from "@here/harp-vectortile-datasource";
import MapUI from "./MapUI";

const initialCoordinates = new GeoCoordinates(52.53102, 13.3848);
const initialZoomLevel = 5;

const dataSource = new VectorTileDataSource({
  authenticationCode: "ieQtdEqB6SMc1KT0IIVA0_YNCqIGsPlPYUwUiGROjbA",
});

export default function Map() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [map, setMap] = useState<MapView | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const map = new MapView({
      theme,
      canvas: canvasRef.current,
      target: initialCoordinates,
      zoomLevel: initialZoomLevel,
      projection: sphereProjection,
      decoderUrl: "decoder.bundle.js",
    });

    map.addDataSource(dataSource);

    const onWindowResize = () =>
      map.resize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", onWindowResize);

    setMap(map);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />;
      <MapUI map={map} />
    </div>
  );
}
