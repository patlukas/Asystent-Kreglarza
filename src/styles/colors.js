const SUN_FLOWER = '#f1c40f';
const ASBESTOS = '#7f8c8d';
const MIDNIGHT_BLUE = '#2c3e50';
const EMERALD = '#2ecc71';
const ALIZARIN = '#e74c3c';
const CLOUDS = '#ff00ff';
const SILVER = '#bdc3c7';
const BLACK = "#000000";

const common = {
    PRIMARY: SUN_FLOWER,
    SUCCESS: EMERALD,
    ERROR: ALIZARIN,
    menuBar_btnNoChecked: EMERALD,
    menuBar_btnChecked: SUN_FLOWER
};

const light = {
    ...common,
    BACKGROUND: CLOUDS,
    TEXT: MIDNIGHT_BLUE,
    TEXT_SECONDARY: ASBESTOS,
    menuBar_bg: SILVER
};

const dark = {
    ...common,
    BACKGROUND: MIDNIGHT_BLUE,
    TEXT: CLOUDS,
    TEXT_SECONDARY: SILVER,
    menuBar_bg: BLACK
};

export const colors = {light, dark};