const path = require("path");

const monorepoRoot = path.resolve(__dirname, "..");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: [__dirname],
          alias: {
            "@/lib": path.join(monorepoRoot, "src/lib"),
            "@": __dirname,
          },
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
    ],
  };
};
