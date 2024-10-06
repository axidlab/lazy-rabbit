/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"  
  ],
  theme: {
    //Palette: https://coolors.co/201e50-525b76-869d96-c4f1be-a2c3a4
    colors: {
      'primary-blue': { DEFAULT: '#201e50', 100: '#070610', 200: '#0d0c21', 300: '#141331', 400: '#1a1941', 500: '#201e50', 600: '#38358b', 700: '#5652bd', 800: '#8e8cd3', 900: '#c7c5e9' },
      'paynes-gray': { DEFAULT: '#525b76', 100: '#101217', 200: '#21242f', 300: '#313646', 400: '#41485e', 500: '#525b76', 600: '#6c7799', 700: '#9199b2', 800: '#b6bbcc', 900: '#dadde5' }, 
      'secondary-blue': { DEFAULT: '#525b76', 100: '#101217', 200: '#21242f', 300: '#313646', 400: '#41485e', 500: '#525b76', 600: '#6c7799', 700: '#9199b2', 800: '#b6bbcc', 900: '#dadde5' }, 
      'primary-grey': { DEFAULT: '#869d96', 100: '#1a201e', 200: '#34413d', 300: '#4e615b', 400: '#678179', 500: '#869d96', 600: '#9eb1ab', 700: '#b6c4c0', 800: '#ced8d5', 900: '#e7ebea' }, 
      'primary-green': { DEFAULT: '#c4f1be', 100: '#16480f', 200: '#2b8f1e', 300: '#44d331', 400: '#85e278', 500: '#c4f1be', 600: '#d1f4cd', 700: '#ddf7d9', 800: '#e8fae6', 900: '#f4fcf2' }, 
      'secondary-green': { DEFAULT: '#a2c3a4', 100: '#1c2c1d', 200: '#38573a', 300: '#548357', 400: '#76a779', 500: '#a2c3a4', 600: '#b4cfb6', 700: '#c7dbc8', 800: '#dae7db', 900: '#ecf3ed' }
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}