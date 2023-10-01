const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const setDarkMode = () => {
    document.querySelector('body').classList = 'dark';
    localStorage.setItem('colorMode', 'dark');
};

const setLightMode = () => {
    document.querySelector('body').classList = 'light';
    localStorage.setItem('colorMode', 'light');
};

const colorModeFromLocalStorage = () => {
    return localStorage.getItem('colorMode');
}

const colorModeFromPref = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // light is default
}

const loadAndUpdateColor = () => {
    // local storage has precendence over the prefers-color-scheme
    const color = colorModeFromLocalStorage() || colorModeFromPref();

    color == 'dark' ? darkButton.click() : lightButton.click();
}

// check if inputs are clicked to find the checked radio buttons and change the color
const radioButtons = document.querySelectorAll('.toggle__wrapper input');
radioButtons.forEach(button => button.addEventListener('click', (event) => {
    if (darkButton.checked) {
        setDarkMode();
    } else {
        setLightMode();
    }
}));

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
        event.matches ? darkButton.click() : lightButton.click();
    });

// load
loadAndUpdateColor();
