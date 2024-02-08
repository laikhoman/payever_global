import React, { useState } from "react";
import ReactGlobe from "react-globe";
import "./App.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import markerRenderer from "./marker";
import { markers } from "./data";

const options = {
  ambientLightColor: "grey",
  ambientLightIntensity: 0.5,
  cameraAutoRotateSpeed: 0.01,
  cameraRotateSpeed: 0.2,
  enableCameraZoom: true,
  focusAnimationDuration: 400,
  globeCloudsOpacity: 0.02,
  globeGlowCoefficient: 0.07,
  globeGlowPower: 5,
  globeGlowRadiusScale: 0.2,
  pointLightIntensity: 3,
  pointLightPositionRadiusScales: [-1, 1.5, -2.5],
  markerRenderer,
  globeGlowColor: "#EEEEEE",
  markerTooltipRenderer: (marker) => `${marker.city}`,
};

export default function App() {
  const [info, setInfo] = useState(undefined);
  const [menuHide, setMeunHide] = useState(true);
  const [focus, setFocus] = useState(null);
  const [landedCity, setLandedCity] = useState(false);
  const handleSituation = (v) => {
    setInfo(v);
    setFocus([v.coordinates[0], v.coordinates[1]]);
    setLandedCity(true);
    setMeunHide(false);
  };
  return (
    <div>
      <div className={menuHide ? "menu-div" : "not-display"}>
        {markers.map((v, i) => (
          <div key={i} onClick={() => handleSituation(v)}>
            <h4>{v.city}</h4>
          </div>
        ))}
      </div>
      <div className="head">
        <h2>PAYEVER LOCATION</h2>
      </div>
      <div>
        {info !== undefined ? (
          <div className={landedCity ? "display" : "not-display"}>
            <div>
              <div className="dis-flex">
                <button
                  onClick={() => {
                    setLandedCity(false);
                    setFocus(null);
                    setMeunHide(true);
                  }}
                >
                  x
                </button>
                <h5>{info.country}</h5>
              </div>
              <h3>{info.city}</h3>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ReactGlobe
        focus={focus}
        height="60vh"
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
        globeCloudsTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png"
        markers={markers}
        globeBackgroundTexture={null}
        options={options}
        onDefocus={() => {
          setLandedCity(false);
          setFocus(null);
          setMeunHide(true);
        }}
        onClickMarker={(markerObject) => {
          setInfo(markerObject);
          setFocus([markerObject.coordinates[0], markerObject.coordinates[1]]);
          setLandedCity(true);
          setMeunHide(false);
        }}
      />
    </div>
  );
}
