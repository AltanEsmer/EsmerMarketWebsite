declare module 'pannellum-react' {
  import React from 'react';

  export interface PannellumProps {
    id?: string;
    width?: string;
    height?: string;
    image?: string;
    pitch?: number;
    yaw?: number;
    hfov?: number;
    maxHfov?: number;
    minHfov?: number;
    maxPitch?: number;
    minPitch?: number;
    maxYaw?: number;
    minYaw?: number;
    autoRotate?: number;
    compass?: boolean;
    preview?: string;
    previewTitle?: string;
    previewAuthor?: string;
    title?: string;
    author?: string;
    autoLoad?: boolean;
    orientationOnByDefault?: boolean;
    showZoomCtrl?: boolean;
    keyboardZoom?: boolean;
    mouseZoom?: boolean;
    draggable?: boolean;
    disableKeyboardCtrl?: boolean;
    showFullscreenCtrl?: boolean;
    showControls?: boolean;
    onLoad?: () => void;
    onError?: (err: any) => void;
    onErrorcleared?: () => void;
    onMousedown?: (evt: any) => void;
    onMouseup?: (evt: any) => void;
    onTouchstart?: (evt: any) => void;
    onTouchend?: (evt: any) => void;
    hotspotDebug?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ref?: React.RefObject<any>;
  }

  export interface HotspotProps {
    id?: string;
    type: 'info' | 'custom';
    pitch: number;
    yaw: number;
    text?: string;
    URL?: string;
    cssClass?: string;
    tooltip?: (hotSpotDiv: HTMLElement, args: any) => void;
    tooltipArg?: any;
    handleClick?: (evt?: any, args?: any) => void;
    handleClickArg?: any;
  }

  export class Pannellum extends React.Component<PannellumProps> {
    static Hotspot: React.FC<HotspotProps>;
    getViewer(): any;
    forceRender(): void;
  }

  export interface PannellumVideoProps extends PannellumProps {
    video?: string;
    loop?: boolean;
    autoplay?: boolean;
    controls?: boolean;
    muted?: boolean;
  }

  export class PannellumVideo extends React.Component<PannellumVideoProps> {
    static Hotspot: React.FC<HotspotProps>;
    getViewer(): any;
    forceRender(): void;
  }
} 