module.exports = {
  siteMetadata: {
    siteUrl: "https://greensoftware.foundation/",
    title: "Green Software Foundation",
  },
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "92c1b380aae9e3cd567d6f16f11e47",
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/static-images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/static-images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
};
