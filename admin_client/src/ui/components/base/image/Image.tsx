import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

export type ImageProps = PropsWithChildren<
  MuiBoxProps & { imageModule?: string; width?: number; height?: number }
>;

/**
 * 不建议使用项目 /public 目录下的图片资源
 * 建议在开发时仅通过模块化导入并使用 /src/assets 中的 .png、.webp 资源
 * 因为我不想额外配置使用 storybook 打包时的 domain 路径，因此会出现打包后会出现路径错误图片丢失问题
 */
const Image: NamedExoticComponent<ImageProps> = memo(
  ({ imageModule, width = 32, height, sx, ...props }) => {
    return (
      <div style={{ display: "inline-block", width, height: height || width }}>
        <MuiBox
          sx={{
            height: "100% !important",
            width: "100% !important",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(${imageModule}) !important`,
            ...sx,
          }}
          {...props}
        />
      </div>
    );
  },
);

export default Image;
