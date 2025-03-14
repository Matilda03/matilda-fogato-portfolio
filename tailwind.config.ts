import colors from 'tailwindcss/colors'
import typography from '@tailwindcss/typography'

export default {
    darkMode: 'class',
    plugins: [
        typography,
    ],
    theme: {
        fontFamily: {
            sans : ['"Figtree"', 'sans-serif'],
        },
        extend: {
            fontFamily: {
                inter: ['"Inter"', 'sans-serif'],
                georgia: ['"Georgia"', 'serif'],
            },
            colors: {
                primary: colors.sky,
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            fontWeight: '600',
                        }
                    }
                }
            }
        }
    }
}
