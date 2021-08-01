module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},

    },
    corePlugins: {
      // ...
     tableLayout: false,
    },
    variants: {
      extend: {
        // ...
       tableLayout: ['hover', 'focus'],
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('tailwind-scrollbar-hide'),
      require('@tailwindcss/typography'),
    ],
};
