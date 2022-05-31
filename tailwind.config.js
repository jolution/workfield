module.exports = {
    content: [
        './index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
        './src/**/*.html',
        './src/**/*.js',
    ],
    safelist: [
        'tw-bg-blue-800/75',
        {
            pattern: /(bg|text)-(blue)-(800)/,
            variants: ['hover'],
        },
    ],
    prefix: 'tw-',
    theme: {
        extend: {
            colors: {
                'bg-semi-75': 'rgba(0, 0, 0, 0.75)'
            }
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
