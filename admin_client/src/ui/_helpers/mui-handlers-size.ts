export enum BaseSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export function getIconSize(size: BaseSize): number {
  switch (size) {
    case BaseSize.SMALL:
      return 32;
    case BaseSize.MEDIUM:
      return 40;
    case BaseSize.LARGE:
      return 56;
  }
}
