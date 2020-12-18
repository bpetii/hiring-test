module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules"],
  verbose: true,
};
