export interface BackgroundColorType {
  scolor: string;
  type: string;
  borderColor: string;
  useBorder: boolean;
  contentOffsetX: number;
  contentOffsetY: number;
  originalWidth: number;
  originalHeight: number;
  contentScale: number;
  verticalAlign: "middle" | "top" | "bottom";
}

export interface ElementType {
  type: string;
  layerType: string;
  properties: {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    url?: string;
    rotation?: number;
    flip: string;
    blur: {
      useBlur: boolean;
      pixels: number;
    };
    dropShadow: {
      useShadow: boolean;
      vShadow: number;
      spread: number;
      hShadow: number;
      color: string;
      blur: number;
    };
    contentOffsetX: number;
    contentOffsetY: number;
    backgroundColor: BackgroundColorType;
    labelStyle: {
      color: string;
      fontFamily: string;
      fontSize: string;
      fontWeight: string;
    };
    html: string;
    textShadow: {
      useShadow: boolean;
      vShadow: number;
      spread: number;
      hShadow: number;
      color: string;
      blur: number;
    };
    scale: number;
    fontSize: number;
    config: {
      type: string;
      nodes: Array<{
        type: string;
        defaultFontSettings: {
          fontFamily: string;
          fontType: string;
          fontStyle: string;
          fontPrefix: string | null;
          fontWeight: number;
          fontUrl: string | null;
          fontFaceUrl: string | null;
        };
        children: Array<{
          text: string;
          color: string;
          textScript: string;
          textDecoration: string;
          textTransform: string;
          fontSettings: {
            selection: string | null;
            keepSelection: boolean;
            fontFamily: string;
            fontWeight: number;
          };
        }>;
      }>;
    };
  };
}

export interface mainElType {
  elements: ElementType[];
  type: string;
  properties: {
    id: number;
    duration?: number;
    backgroundColor?: BackgroundColorType;
  };
  //transition
  //guidelines
}

export interface BannerPropertyType {
  width: number;
  height: number;
  name: string;
  backgroundColor: BackgroundColorType;
}

export interface BannerType {
  properties: BannerPropertyType;
  elements: mainElType[];
  resources: object;
}

export interface RootType {
  hash: string;
  userId: string;
  banner: BannerType;
}
