const vueEnv = Object.keys(process.env)
  .filter(x => /^VUE_APP_/.test(x))
  .reduce((acc, cur, i) => ({ ...acc, [cur]: process.env[cur] }), {});

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/index/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
      configureWebpack: {
        optimization: {
          runtimeChunk: "single",
          splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // get the name. E.g. node_modules/packageName/not/this/part.js
                  // or node_modules/packageName
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1];

                  // npm package names are URL-safe, but some servers don't like @ symbols
                  return `npm.${packageName.replace("@", "")}`;
                }
              }
            }
          }
        }
      },
      envs: vueEnv
    }
  },
  integrity: true
};
