const loose = true;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose,
        modules: false
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/proposal-class-properties", { loose }],
    ["@babel/proposal-object-rest-spread", { loose }],
    ["transform-react-remove-prop-types", { mode: "unsafe-wrap" }]
  ]
};
