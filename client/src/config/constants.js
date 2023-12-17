import { swatch, fileIcon, ai, logoShirt, stylishShirt, mouse } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
    helperText: "Color",
  },
  {
    name: "filepicker",
    icon: fileIcon,
    helperText: "File",
  },
  {
    name: "aipicker",
    icon: ai,
    helperText: "AI",
  },
  {
    name: "mouseMovement",
    icon: mouse,
    helperText: "Mouse",
  }
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
    helperText: "Logo",
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
    helperText: "Texture",
  },
];
export const modelTabs = [ // Limit helpertext length to 6-7 characters
  {
    name: "tshirt",
    icon: logoShirt, // TODO: change to tshirt icon
    helperText: "T-Shirt",
  },
  {
    name: "poloShirt",
    icon: stylishShirt, // TODO: change to poloShirt icon
    helperText: "Polo",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
