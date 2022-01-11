import convert from "react-from-dom";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
import { MapView } from "@here/harp-mapview";
import { ReactElement, useMemo } from "react";

interface Props {
  map: MapView | null;
}

const minZoomLevel = 3;
const maxZoomLevel = 20;

export default function MapUI({ map }: Props) {
  return useMemo(() => {
    if (!map) return null;
    const controls = new MapControls(map);
    const uiControls = new MapControlsUI(controls);

    controls.minZoomLevel = minZoomLevel;
    controls.maxZoomLevel = maxZoomLevel;

    return convert(uiControls.domElement) as ReactElement;
  }, [map]);
}
