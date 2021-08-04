const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

function isDark(hexcolor) {
    return getYiq(hexcolor) <= 160;
}

function getYiq(hexcolor) {
    if (hexcolor[0] === '#') {
        hexcolor = hexcolor.substr(1);
    }
    if (hexcolor.length === 3) {
        hexcolor += '' + hexcolor;
    }
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function lightenDarkenColor(col, amt) {
    col = col.replace(/^#/, '')
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

    let [r, g, b] = col.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)

    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b

    return `#${rr}${gg}${bb}`
}

module.exports = {
    purge: [],
    important: true,
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            tailuindTheme: 'bootstrap',
            tailuindThemes: {
                bootstrap: theme => ({
                    "default": theme('colors.gray.200'),
                    "primary": theme('colors.blue.600'),
                    "secondary": theme('colors.gray.600'),
                    "success": theme('colors.green.600'),
                    "danger": theme('colors.red.600'),
                    "warning": theme('colors.yellow.600'),
                    "info": theme('colors.blue.100'),
                    "light": theme('colors.white'),
                    "dark": theme('colors.black'),
                    "link": theme('colors.blue.600'),
                }),
                porklabz: theme => ({
                    "default": theme('colors.gray.200'),
                    "primary": theme('colors.purple.600'),
                    "secondary": theme('colors.pink.600'),
                    "success": theme('colors.green.600'),
                    "danger": theme('colors.red.600'),
                    "warning": theme('colors.yellow.600'),
                    "info": theme('colors.blue.100'),
                    "light": theme('colors.gray.100'),
                    "dark": theme('colors.gray.800'),
                    "link": theme('colors.blue.600'),
                })
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({addUtilities, theme, variants, addComponents, e, prefix, config, postcss}) {
            let themeName = '';
            _.map(theme('tailuindTheme', ''), (value) => themeName += value);
            const selectedTheme = theme('tailuindThemes', {})[themeName];
            if (!selectedTheme) {
                return;
            }
            const newUtilities = {};
            const rootColors = {':root': {}};

            _.map(selectedTheme(theme), (backgroundColor, key) => {
                const yiq = getYiq(backgroundColor);
                let themeIsDark = isDark(backgroundColor);
                let colorDark = lightenDarkenColor(backgroundColor, 180);
                let colorLight = lightenDarkenColor(backgroundColor, -150);
                let bgHover = lightenDarkenColor(backgroundColor, themeIsDark ? 20 : -20);
                let bgActive = lightenDarkenColor(backgroundColor, themeIsDark ? -10 : -30);
                let borderColor = lightenDarkenColor(backgroundColor, themeIsDark ? -10 : -30);
                let clearColor = lightenDarkenColor(backgroundColor, 80);
                let textColor = backgroundColor;

                if (yiq <= 50) {
                    bgHover = lightenDarkenColor(backgroundColor, 40);
                    bgActive = lightenDarkenColor(backgroundColor, 50);
                    colorDark = lightenDarkenColor(backgroundColor, 200);
                    borderColor = lightenDarkenColor(backgroundColor, 30);
                }
                if (yiq >= 200) {
                    textColor = theme('colors.gray.800');

                }
                if (key === 'link') {
                    themeIsDark = false;
                    colorDark = colorLight = backgroundColor;
                    backgroundColor = 'transparent';
                    bgHover = 'transparent';
                    bgActive = 'transparent';
                    clearColor = lightenDarkenColor(colorLight, 30);
                }

                // @TODO quando for disabled, remover states

                newUtilities[`.tui-${key}`] = {
                    backgroundColor,
                    color: themeIsDark ? colorDark : colorLight
                };
                newUtilities[`.tui-${key}-clear`] = {backgroundColor: clearColor};
                newUtilities[`.tui-border-${key}`] = {borderColor};
                newUtilities[`.tui-text-${key}`] = {
                    color: textColor,
                    '&:hover': {
                        color: isDark(bgHover) ? colorDark : colorLight
                    },
                };
                rootColors[':root'][`--tui-${key}`] = backgroundColor;

                newUtilities[`.tui-states-${key}`] = {
                    '&:hover': {
                        '&:not([disabled])': {
                            backgroundColor: bgHover,
                            color: isDark(bgHover) ? colorDark : colorLight
                        }
                    },
                    '&:active': {
                    //     backgroundColor: bgActive,
                    //     color: isDark(bgActive) ? colorDark : colorLight
                    },
                    '&:disabled': {
                        opacity: theme('opacity.70'),
                        backgroundColor
                    }
                }
            });


            // console.log('');
            // console.log(newUtilities);

            addUtilities(newUtilities, {
                respectPrefix: false,
                variants: ['responsive', 'hover', 'active'],
            });
            addUtilities(rootColors, {
                respectPrefix: false,
            });
            // addComponents(buttons, {
            //     respectPrefix: false,
            //     variants: ['responsive', 'hover'],
            // });


            // console.log(selectedTheme(theme));
            // console.log(selectedTheme(theme).primary.hover);
        })
    ],
}
