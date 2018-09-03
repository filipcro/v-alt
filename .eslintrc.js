module.exports = {
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", "never"],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": ["error", { "extensions": [".js"] }],
        "react/prop-types": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": "off"
    },
    "env": {
        "browser": true
    }
};