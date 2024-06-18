import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  mainElType,
  RootType,
  ElementType,
} from "../../types/JsonDesign.types";

interface AppProps {
  data: RootType;
}

export const App: FC<AppProps> = ({ data }) => {
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const renderElement = (element: ElementType) => {
    const elProperties = element.properties;
    switch (element.layerType) {
      case "image":
        return (
          <div
            style={{
              position: "absolute",
              left: elProperties.x,
              top: elProperties.y,
              width: elProperties.width,
              height: elProperties.height,
              transform: `rotate(${elProperties.rotation}deg)`,
              filter: elProperties.blur.useBlur
                ? `blur(${elProperties.blur.pixels}px)`
                : elProperties.dropShadow.useShadow
                ? `drop-shadow(${elProperties.dropShadow.color} ${elProperties.dropShadow.hShadow}px ${elProperties.dropShadow.vShadow}px ${elProperties.dropShadow.blur}px)`
                : "none",
              backgroundImage: `url(https://d2gla4g2ia06u2.cloudfront.net/assets/media/${elProperties.url})`,
              backgroundPosition: `${elProperties.contentOffsetX}% ${elProperties.contentOffsetY}%`,
              backgroundSize: `cover`,
            }}
          />
        );
      case "button":
        return (
          <button
            style={{
              position: "absolute",
              left: elProperties.x,
              top: elProperties.y,
              width: elProperties.width,
              height: elProperties.height,
              backgroundColor:
                elProperties.backgroundColor?.scolor ?? "inherit",
              color: elProperties?.labelStyle?.color,
              fontFamily: elProperties?.labelStyle?.fontFamily,
              fontSize: elProperties?.labelStyle?.fontSize,
              fontWeight: elProperties?.labelStyle?.fontWeight,
              border: elProperties.backgroundColor?.useBorder
                ? `1px ${elProperties.backgroundColor.type} ${elProperties.backgroundColor.borderColor}`
                : "none",
            }}
          >
            <p
              style={{
                ...elProperties.labelStyle,
                margin: 0,
                marginInline: "unset !important",
                marginBlock: "unset !important",
              }}
            >
              {elProperties.html}
            </p>
          </button>
        );
      case "text":
        return (
          <div
            style={{
              position: "absolute",
              left: elProperties.x,
              top: elProperties.y,
              width: elProperties.width,
              height: elProperties.height,
              textAlign: "center",
              transform: `scale(${elProperties.scale})`,
              textShadow: elProperties.textShadow.useShadow
                ? `${elProperties.textShadow.hShadow}px ${elProperties.textShadow.vShadow}px ${elProperties.textShadow.blur}px ${elProperties.textShadow.color}`
                : "none ",
            }}
          >
            <p
              style={{
                ...elProperties.config?.nodes[0].children[0].fontSettings,
                margin: 0,
                fontSize: elProperties.fontSize,
                color: elProperties.config?.nodes[0].children[0].color,
              }}
            >
              {elProperties.config?.nodes[0].children[0].text}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSlide = (mainEl: mainElType) => (
    <div key={mainEl.properties.id}>
      {mainEl.elements.map((element: ElementType) => (
        <React.Fragment key={element.properties.id}>
          {renderElement(element)}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div>
      <div
        style={
          data?.banner?.properties
            ? {
                width: data.banner.properties.width,
                height: data.banner.properties.height,
                backgroundColor:
                  data.banner.properties.backgroundColor?.scolor ?? "inherit",
                border: data?.banner?.properties?.backgroundColor?.useBorder
                  ? `1px ${data.banner.properties.backgroundColor.type} ${data.banner.properties.backgroundColor.borderColor}`
                  : "none",
                position: "relative",
                transformOrigin: "0px 0px 0px",
                transform: `scale(${
                  height / (data.banner.properties.height + 2)
                })`,
                backgroundRepeat: "repeat",
              }
            : {}
        }
      >
        {data.banner.elements.map((mainEl: mainElType) => renderSlide(mainEl))}
      </div>
    </div>
  );
};

if (typeof document !== "undefined") {
  const data: any = (window as any).__INITIAL_DATA__;
  ReactDOM.hydrate(
    <App data={data as RootType} />,
    document.getElementById("root")
  );
}
