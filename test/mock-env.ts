export const mockEnvironment = (overrides: NodeJS.ProcessEnv) => {
    process.env = { ...process.env, ...overrides };
};
