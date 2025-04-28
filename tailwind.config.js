/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
  	screens: {
  		sm: '340px',
  		md: '540px',
  		lg: '768px',
  		xl: '1180px'
  	},
  	extend: {
  		colors: {
  			background: '#fdfdfd',
  			landing: {
  				background: '#f7fdfd',
  				paymentblue: '#004B9D'
  			},
  			main: '#3749A6',
  			dashboard: {
  				selected: '#4C61CC',
  				background: '#F5F6FA',
  				status: {
  					done: '#00B69B',
  					pending: '#FCBE2D',
  					noshow: '#FD5454'
  				},
  				buttons: {
  					add: '#008000'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--reka-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--reka-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	fontSize: {
  		xs: '0.7rem',
  		sm: '0.8rem',
  		base: '1rem',
  		xl: '1.25rem',
  		'2xl': '1.563rem',
  		'3xl': [
  			'1.953rem',
  			'37px'
  		],
  		'4xl': '2.441rem',
  		'5xl': '3.052rem'
  	},
  	fontFamily: {
  		sans: [
  			'Inter',
  			'sans-serif'
  		]
  	}
  },
  variants: {
    extend: {}
  },
  plugins: [require("tailwindcss-animate")],
}

