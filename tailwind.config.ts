
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					purple: '#8A2BE2',
					pink: '#FF1493',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px rgba(138, 43, 226, 0.8), 0 0 15px rgba(138, 43, 226, 0.5)'
					},
					'50%': { 
						textShadow: '0 0 20px rgba(255, 20, 147, 0.8), 0 0 30px rgba(255, 20, 147, 0.5)'
					}
				},
				'pulse-neon': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(138, 43, 226, 0.8), 0 0 15px rgba(138, 43, 226, 0.5)'
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(255, 20, 147, 0.8), 0 0 30px rgba(255, 20, 147, 0.5)'
					}
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'slide-in': 'slide-in 0.3s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'neon-gradient': 'linear-gradient(90deg, #8A2BE2, #FF1493)',
			},
			boxShadow: {
				'neon': '0 0 5px rgba(138, 43, 226, 0.8), 0 0 15px rgba(138, 43, 226, 0.5)',
				'neon-hover': '0 0 10px rgba(255, 20, 147, 0.8), 0 0 20px rgba(255, 20, 147, 0.5)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
