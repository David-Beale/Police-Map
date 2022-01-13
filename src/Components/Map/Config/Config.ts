// All open-source options:
// berlin_tilezen_base.json
// berlin_tilezen_day_reduced.json
// berlin_tilezen_night_reduced.json
// berlin_tilezen_effects_streets.json
// berlin_tilezen_effects_outlines.json
import { Style, StyleSet } from "@here/harp-datasource-protocol";
import { Color } from "three";
export const theme =
  "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_effects_streets.json";

function generateHeatStyleSet(options: {
  thresholds: number[];
  color: string;
  property: string;
}): StyleSet {
  const styleSet: StyleSet = [];
  const length = options.thresholds.length;
  for (let i = 0; i < length; i++) {
    const color = new Color(options.color);
    color.multiplyScalar(((i + 1) * 0.8) / length + 0.2);
    const max = options.thresholds[i];
    const min = i - 1 < 0 ? 0 : options.thresholds[i - 1];
    const propertyName = options.property;
    const style: Style = {
      description: "geoJson property-based style",
      technique: "extruded-polygon",
      when:
        `$geometryType == 'polygon'` +
        `&& ${propertyName} > ${min}` +
        `&& ${propertyName} <= ${max}`,
      attr: {
        color: "#" + color.getHexString(),
        transparent: true,
        opacity: 0.7,
        constantHeight: true,
        boundaryWalls: false,
      },
      maxZoomLevel: 15,
      renderOrder: 1000,
    };
    styleSet.push(style);
  }
  return styleSet;
}

const densityStyleSet: StyleSet = generateHeatStyleSet({
  property: "density",
  thresholds: [50, 100, 150, 200, 250, 300, 350, 400, 450],
  color: "#0080ff",
});
export const customTheme = {
  extends:
    "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_effects_streets.json",
  styles: {
    geojson: densityStyleSet,
  },
};
