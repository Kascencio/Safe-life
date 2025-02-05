// @types/qrcode.react.d.ts

declare module 'qrcode.react' {
    import * as React from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
      includeMargin?: boolean;
      renderAs?: 'svg' | 'canvas';
      imageSettings?: {
        src: string;
        x?: number;
        y?: number;
        height?: number;
        width?: number;
        excavate?: boolean;
      };
      style?: React.CSSProperties;
    }
  
    const QRCode: React.FC<QRCodeProps>;
  
    export default QRCode;
  }
  