import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import MuiBox from "@mui/material/Box";

import { getFiletypeColor, type SupportedFileExtensionsType } from "~/utils/custom/file";

const FiletypeImage: NamedExoticComponent<{
  extension: SupportedFileExtensionsType;
  width?: number;
  height?: number;
}> = memo(({ extension, width = 40, height = 40 }) => {
  const textColor = "#fff";
  const color = useMemo(() => getFiletypeColor(extension), [extension]);

  return (
    <MuiBox
      component="svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 红色文件主体 */}
      <path
        d="M23.172 0C23.7022 0 24.2107 0.210507 24.5857 0.585255L36.4137 12.4044C36.7891 12.7795 37 13.2884 37 13.8191V35.3333C37 37.9107 34.8689 40 32.24 40H7.76C5.13112 40 3 37.9107 3 35.3333V4.66667C3 2.08934 5.13112 0 7.76 0H23.172Z"
        fill={color}
      />

      {/* 折叠角效果 */}
      <g filter="url(#filter0_d_1255_158068)">
        <path
          d="M35.1548 12.1381C35.4678 12.4537 35.2443 12.9902 34.7998 12.9902H29C26.4227 12.9902 24.0976 10.7233 24.0976 8.21031V2.20435C24.0976 1.75791 24.6382 1.53528 24.9526 1.85224L35.1548 12.1381Z"
          fill="white"
          fillOpacity="0.24"
          shapeRendering="crispEdges"
        />
      </g>

      {/* 文字标识 */}
      <text
        x="50%"
        y="60%"
        fontSize="10"
        fontWeight="bold"
        fill={textColor}
        fontFamily="Arial"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {extension.slice(1)}
      </text>

      {/* 阴影滤镜定义 */}
      <defs>
        <filter
          id="filter0_d_1255_158068"
          x="22.0977"
          y="1.70337"
          width="15.2031"
          height="15.2869"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1255_158068" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1255_158068"
            result="shape"
          />
        </filter>
      </defs>
    </MuiBox>
  );
});

export default FiletypeImage;
