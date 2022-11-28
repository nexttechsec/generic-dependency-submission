export const customMockProperty = <T extends object, K extends keyof T>(
  object: T,
  property: K,
  value: T[K]
) => {
  Object.defineProperty(object, property, { get: () => value });
};
