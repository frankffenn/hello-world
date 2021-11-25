module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 移除生产上没有用到的样式
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        container: {
            center: true,
        },
        colors:{
            myblue:'#049AE2',
        },
        backgroundImage: theme => ({
            'login-box': "url('/src/assets/bg.jpg')",
           })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
