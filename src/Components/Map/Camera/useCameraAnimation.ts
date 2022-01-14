import { GeoCoordinates } from "@here/harp-geoutils";
import { MapView, MapViewEventNames, MapViewUtils } from "@here/harp-mapview";
import { useCallback, useRef } from "react";
import { CatmullRomCurve3 } from "three";

interface Location {
  target: GeoCoordinates;
  tilt: number;
  heading: number;
  distance: number;
}
interface MousePos {
  x: number;
  y: number;
}

export const useCameraAnimation = (map: MapView | null) => {
  const down = useRef<MousePos>();

  const onMouseDown = useCallback((e) => {
    down.current = { x: e.pageX, y: e.pageY };
  }, []);
  const onMouseUp = useCallback(
    (e) => {
      if (!map || !down.current) return;
      const dist =
        (down.current.x - e.pageX) ** 2 + (down.current.y - e.pageY) ** 2;
      if (dist > 10) return;

      const intersectionResults = map.intersectMapObjects(e.pageX, e.pageY);
      const usableResults = intersectionResults.filter(
        (result) => result.userData?.$layer === "Seattle"
      );
      if (!usableResults.length) return;
      const target = usableResults[0].userData.target;

      const to: Location = {
        target: new GeoCoordinates(target[1], target[0]),
        tilt: 40,
        heading: 0,
        distance: 5000,
      };

      const startPosition = map.camera.position.clone();
      const startQuaternion = map.camera.quaternion.clone();
      const targetPosition =
        MapViewUtils.getCameraPositionFromTargetCoordinates(
          to.target,
          to.distance,
          to.heading,
          to.tilt,
          map.projection
        );

      const targetQuaternion = MapViewUtils.getCameraRotationAtTarget(
        map.projection,
        to.target,
        to.heading,
        to.tilt
      );

      const startTime = Date.now();
      const curve = new CatmullRomCurve3([startPosition, targetPosition]);

      const updateListener = () => {
        const time = Date.now();
        let t = (time - startTime) / 1000;

        if (t >= 1) {
          t = 1;
          map.endAnimation();
          map.removeEventListener(MapViewEventNames.Render, updateListener);
        }
        map.camera.position.copy(curve.getPoint(t));
        const rotation = startQuaternion.clone().slerp(targetQuaternion, t);
        map.camera.quaternion.copy(rotation);
        map.camera.updateMatrixWorld(true);
      };

      map.addEventListener(MapViewEventNames.Render, updateListener);
      map.beginAnimation();
    },
    [map]
  );

  return [onMouseDown, onMouseUp];
};
