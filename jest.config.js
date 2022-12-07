module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    "collectCoverage": true,
    "collectCoverageFrom": ["./src/**"],
    "coverageThreshold": {
        "global": {
            "lines": 25 // TODO: move it to 90%
        }
    }
};
