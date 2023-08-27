import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: { preflight: false }, // Make button not invisible. https://stackoverflow.com/questions/75202373/button-in-material-ui-is-transparent-when-loading
}
export default config
