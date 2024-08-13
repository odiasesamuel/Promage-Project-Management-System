/** @type {import('next').NextConfig} */

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = {
  env: {
    SMTP_HOST: "smtp.gmail.com",
    SMTP_PORT: "465",
    SMTP_USER: "codewithodiase@gmail.com",
    SMTP_PASS: "umbqordbeprkedhu",
  },
};


// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=465
// SMTP_USER=codewithodiase@gmail.com
// SMTP_PASS=umbqordbeprkedhu

export default nextConfig;
