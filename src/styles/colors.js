const SUN_FLOWER = '#f1c40f';
const ASBESTOS = '#7f8c8d';
const MIDNIGHT_BLUE = '#2c3e50';
const EMERALD = '#2ecc71';
const ALIZARIN = '#e74c3c';
const CLOUDS = '#ff00ff';
const SILVER = '#bdc3c7';
const BLACK = "#000000";
const GRAY = "#555555"

const common = {
    PRIMARY: SUN_FLOWER,
    SUCCESS: EMERALD,
    ERROR: ALIZARIN,
    menuBar_btnNoChecked: EMERALD,
    menuBar_btnChecked: SUN_FLOWER,
    gameType: {
        1: SUN_FLOWER,
        2: ALIZARIN,
        3: CLOUDS,
        4: EMERALD
    },
    listResultsBorder: GRAY,
    font: {
        basic: MIDNIGHT_BLUE,
        notImportant: GRAY,
    },
    resultsBtnAddNewResult: {
        backgroundColor: "#000",
        color: "#fff"
    },
    barTop: {
        backgroundColor: "#000",
        color: SUN_FLOWER
    },
    form: {
        main: "#ccf",
        second: "#eee",
        input: "#ff9",
        dataPicker: "#ff9",
        dropdownItemTextSelected: "#777",
        dropdownItemTextNoSelected: "#ddd",
        dropdownPickerBackground: "#333"
    },
    formForCreateResult: { //to del
        fontHead: "#66f",
        clearBtnBg: "#356",
        clearBtnColor: "#cba",
    },
    alert: {
        optionBackgroundColor: '#1111ff',
        backgroundColor: '#999999',
        borderColor: '#55555',
        titleColor: '#000000',
        subtitleColor: '#000000',
        optionColor: '#ffffff',
        noBgColor: '#ee0000',
        yesBgColor: '#009900',
        noColor: '#ffffff',
        yesColor: '#ffffff'
    }
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