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
    backgroundColor: GRAY,
    barTop: {
        backgroundColor: "#000",
        color: SUN_FLOWER,
        borderColor: "#454545"
    },
    menuBar: {
        btnChecked: SUN_FLOWER,
        btnNoChecked: EMERALD,
        backgroundColor: MIDNIGHT_BLUE
    }, 
    result: {
        btnAddNewResult: {
            backgroundColor: "#000",
            color: "#fff"
        }
    },
    form: {
        main: "#ccf",
        second: "#eee",
        input: "#ff9",
        dataPicker: "#ff9",
        dropdownItemTextSelected: "#777",
        dropdownItemTextNoSelected: "#ddd",
        dropdownPickerBackground: "#333",
        clearBtn: {
            backgroundColor: "#356",
            color: "#cba"
        }
    },
    alert: {
        backgroundColor: '#999999',
        borderColor: '#55555',
        titleColor: '#000000',
        subtitleColor: '#000000',
        optionBgColor: '#1111ff',
        optionColor: '#ffffff',
        noBgColor: '#ee0000',
        yesBgColor: '#009900',
        noColor: '#ffffff',
        yesColor: '#ffffff'
    },
    resultItem: {
        editBg: "#1464a0",
        deleteBg: "#0f4b78",
        editFocusBg: "#060",
        deleteFocusBg: "#600",
        editColor: "#fff",
        deleteColor: "#fff",
        borderColor: GRAY,
        listGameType: {
            1: SUN_FLOWER,
            2: ALIZARIN,
            3: CLOUDS,
            4: EMERALD
        },
        fontMain: MIDNIGHT_BLUE,
        fontSecond: GRAY
    }
};

const Ciemny = {
    ...common,
    backgroundColor: "#232323",
    barTop: {
        backgroundColor: "#121212",
        color: "#7E5541",
        borderColor: "#454545"
    },
    menuBar: {
        btnChecked: "#7E5541",
        btnNoChecked: "#454545",
        backgroundColor: "#121212"
    }, 
    result: {
        btnAddNewResult: {
            backgroundColor: "#121212",
            color: "#7E5541"
        }
    },
    form: {
        main: "#7E5541",
        second: "#757457",
        input: "#757457",
        dataPicker: "#757457",
        dropdownItemTextSelected: "#232323",
        dropdownItemTextNoSelected: "#757457",
        dropdownPickerBackground: "#121212",
        clearBtn: {
            backgroundColor: "#6d4a38",
            color: "#232323"
        }
    },
    alert: {
        backgroundColor: '#121212',
        borderColor: '#454545',
        titleColor: '#7E5541',
        subtitleColor: '#757457',
        optionBgColor: '#414c7e',
        optionColor: '#121212',
        noBgColor: '#7e414c',
        yesBgColor: '#417e55',
        noColor: '#121212',
        yesColor: '#121212'
    },
    resultItem: {
        editBg: "#223358",
        deleteBg: "#192a51",
        editFocusBg: "#274221",
        deleteFocusBg: "#50141B",
        editColor: "#454545",
        deleteColor: "#454545",
        borderColor: "#454545",
        listGameType: {
            1: "#50141B",
            2: "#30243C",
            3: "#012226",
            4: "#274221",
            5: "#0E2C3E",
        },
        fontMain: "#7E5541",
        fontSecond: '#757457'
    }
};

const Jasny = {
    ...common,
    backgroundColor: "#B7B7A4",
    barTop: {
        backgroundColor: "#5c3e30",
        color: "#CD997E",
        borderColor: "#DDBEA9"
    },
    menuBar: {
        btnChecked: "#FFE8D6",
        btnNoChecked: "#DDBEA9",
        backgroundColor: "#5c3e30"
    }, 
    result: {
        btnAddNewResult: {
            backgroundColor: "#5c3e30",
            color: "#FFE8D6"
        }
    },
    form: {
        main: "#5c3e30",
        second: "#8f604a",
        input: "#8f604a",
        dataPicker: "#8f604a",
        dropdownItemTextSelected: "#e7c8a0",
        dropdownItemTextNoSelected: "#5c3e30",
        dropdownPickerBackground: "#d4a373",
        clearBtn: {
            backgroundColor: "#d4a373",
            color: "#5c3e30"
        }
    },
    alert: {
        backgroundColor: '#CD997E',
        borderColor: '#DDBEA9',
        titleColor: '#5c3e30',
        subtitleColor: '#8f604a',
        optionBgColor: '#ffb5a7',
        optionColor: '#5c3e30',
        noBgColor: '#F08080',
        yesBgColor: '#ccd5ae',
        noColor: '#5c3e30',
        yesColor: '#5c3e30'
    },
    resultItem: {
        editBg: "#7fc8f8",
        deleteBg: "#5aa9e6",
        editFocusBg: "#60d394",
        deleteFocusBg: "#ee6055",
        editColor: "#5c3e30",
        deleteColor: "#5c3e30",
        borderColor: "#DDBEA9",
        listGameType: {
            1: "#809bce",
            2: "#f48498",
            3: "#acd8aa",
            5: "#ffd972",
            4: "#ab87ff",
        },
        fontMain: "#5c3e30",
        fontSecond: '#5c3e30'
    }
};

export const colors = {Ciemny, Jasny};