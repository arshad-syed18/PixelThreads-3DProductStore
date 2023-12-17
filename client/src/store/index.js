import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD4E',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './catLogo.png',
    fullDecal: './texture.jpg',
    model: 'tshirt'
});

export default state;