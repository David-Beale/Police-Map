import React, { useEffect, useRef, useState } from "react";

import { GeoCoordinates, sphereProjection } from "@here/harp-geoutils";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
import { MapView } from "@here/harp-mapview";

import { theme } from "./Config/Config";
import { VectorTileDataSource } from "@here/harp-vectortile-datasource";
import { usePoliceBoundaries } from "./Data/usePoliceBoundaries";
import { useReports } from "./Data/useReports";
import { useCameraAnimation } from "./Camera/useCameraAnimation";

const initialCoordinates = new GeoCoordinates(47.58, -122.34);
const initialZoomLevel = 12.4;
const initialTilt = 40;
const initialHeading = 0;

const dataSource = new VectorTileDataSource({
  authenticationCode: "J0IJdYzKDYS3nHVDDEWETIqK3nAcxqW42vz7xeSq61M",
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
      tilt: initialTilt,
      heading: initialHeading,
      projection: sphereProjection,
      decoderUrl: "decoder.bundle.js",
    });

    map.addDataSource(dataSource);

    const onWindowResize = () =>
      map.resize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", onWindowResize);

    setMap(map);

    const controls = new MapControls(map);
    const ui = new MapControlsUI(controls);
    canvasRef.current.parentElement!.appendChild(ui.domElement);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  usePoliceBoundaries(map);
  useReports(map);

  const [onMouseDown, onMouseUp] = useCameraAnimation(map);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onPointerDown={onMouseDown}
        onPointerUp={onMouseUp}
      />
    </div>
  );
}
