/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignore: ["/app/users/page.tsx", "/app/users/DropDownandInput.tsx"],
  },
};

module.exports = nextConfig;
