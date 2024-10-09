// jest.config.ts
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],  // Localiza os arquivos de teste
    moduleFileExtensions: ['ts', 'js'],  // Extensões de arquivos permitidos
    transform: {
        '^.+\\.ts$': 'ts-jest',  // Transforma arquivos TypeScript usando ts-jest
    },
    coverageDirectory: 'coverage',  // Gera relatório de cobertura
    collectCoverageFrom: [
        "src/**/*.ts", // Inclui todos os arquivos TypeScript da pasta src
        "!src/**/*.d.ts" // Exclui os arquivos de definição de tipo
    ],
};
