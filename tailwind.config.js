const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily:{
                sans: ['Poppins']
            },
            backgroundSize: {
                'auto': 'auto',
                'cover': 'cover',
                'contain': 'contain',
                '50%': '50%',
                '16': '4rem',
            },
            backgroundPosition: {
                'right-center': 'right center'
            },
            backgroundImage: {
                'quota-instance': "url('/resources/images/quotas/istanza.svg')",
                'quota-ram': "url('/resources/images/quotas/ram.svg')",
                'quota-volume': "url('/resources/images/quotas/volume.svg')",
                'quota-cpu': "url('/resources/images/quotas/cpu.svg')",
                'quota-floatingIp': "url('/resources/images/quotas/floatingIp.svg')",
                'quota-backup': "url('/resources/images/quotas/backup.svg')",
            },
            colors: {
                netsons: {
                    slate: {
                        50: '#F8FAFC',
                        100: '#F1F5F9',
                        200: '#E2E8F0',
                        400: '#94A3B8',
                        500: '#64748B',
                        600: '#475569',
                        700: '#334155'
                    },
                    blue: {
                        50: '#EFF6FF',
                        100: '#DBEAFE',
                        200: '#cfe2ff',
                        300: '#93C5FD',
                        400: '#60A5FA',
                        600: '#2563EB',
                        700: '#1d4ed8',
                        900: '#1E3A8A'
                    }
                }
            }
        },
    },

    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class'
        }),
    ],
};
