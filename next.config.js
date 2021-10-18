module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BASE_URL:
      process.env.NODE_ENV === "production"
        ? `https://elreydelpanchuque-plum.vercel.app/`
        : `http://localhost:3000`,
    MONGODB_URL:
      "mongodb+srv://stefano:123@cluster0.vcetv.mongodb.net/Ecommerce?retryWrites=true&w=majority",
    TOKEN_SECRET: "-{<q?mNJ-dq9]F&&+`k^+Y#:3c[[cE+ApS-[JB@]u5VTan~H",
    REFRESH_TOKEN: "8v'Z.NL7A$w~'t:NjEj)(Ck:Snpj2{6f@d~NsF^;r4B}R}R->s",
    CLOUDINARY_NAME: "stefanoferrari0",
    CLOUDINARY_API_KEY: "938431338682274",
    CLOUDINARY_API_SECRET: "dj2sDGLsBGXm-9eIoKb6LAkrtL8",
  },
};
