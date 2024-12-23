/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Nếu bạn dùng thư mục `pages`
    "./components/**/*.{js,ts,jsx,tsx}", // Nếu bạn lưu components ở đây
    "./app/**/*.{js,ts,jsx,tsx}", // Nếu bạn dùng app router trong Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
