import { generateCandidates, type RecoveryInput } from "./candidateGenerator";

export function runCandidateBenchmark(
  input: RecoveryInput,
  target: string
) {
  const generator = generateCandidates(input);

  let attempts = 0;
  let result = generator.next();

  while (!result.done) {
    attempts++;

    if (result.value === target) {
      return {
        found: true,
        attempts,
        candidate: result.value,
      };
    }

    result = generator.next();
  }

  return {
    found: false,
    attempts,
    candidate: null,
  };
}