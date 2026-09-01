export interface RecoveryInput {
  name: string;
  dob: string;
  number: string;
}

function generateParts(value: string): string[] {
  const result = new Set<string>();

  for (let i = 1; i <= value.length; i++) {
    result.add(value.slice(0, i));
    result.add(value.slice(value.length - i));
  }

  return [...result];
}

function generateCaseVariations(value: string): string[] {
  return [
    value,
    value.toLowerCase(),
    value.toUpperCase(),
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  ];
}

function generateNameWords(name: string): string[] {
  const result = new Set<string>();

  const words = name.trim().split(/\s+/);

  for (const word of words) {
    const parts = generateParts(word);

    for (const part of parts) {
      for (const variation of generateCaseVariations(part)) {
        result.add(variation);
      }
    }
  }

  const joinedName = words.join("");

  for (const part of generateParts(joinedName)) {
    for (const variation of generateCaseVariations(part)) {
      result.add(variation);
    }
  }

  return [...result];
}

function generateDobWords(dob: string): string[] {
  const result = new Set<string>();

  const date = new Date(dob);

  if (Number.isNaN(date.getTime())) {
    return [];
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const shortYear = year.slice(-2);

  const formats = [
    day,
    month,
    year,
    shortYear,

    day + month,
    month + day,

    day + month + year,
    month + day + year,

    day + month + shortYear,
    month + day + shortYear,

    `${day}-${month}-${year}`,
    `${day}/${month}/${year}`,

    `${day}-${month}-${shortYear}`,
    `${day}/${month}/${shortYear}`,
  ];

  for (const value of formats) {
    result.add(value);
  }

  return [...result];
}

function generateNumberWords(number: string): string[] {
  const cleanNumber = number.replace(/\D/g, "");

  if (!cleanNumber) {
    return [];
  }

  return generateParts(cleanNumber);
}

function* permutations(values: string[]): Generator<string> {
  function* permute(
    arr: string[],
    start: number
  ): Generator<string> {
    if (start === arr.length) {
      yield arr.join("");
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];

      yield* permute(arr, start + 1);

      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  yield* permute([...values], 0);
}

export function* generateCandidates(
  input: RecoveryInput
): Generator<string> {
  const nameWords = generateNameWords(input.name);
  const dobWords = generateDobWords(input.dob);
  const numberWords = generateNumberWords(input.number);

  for (const name of [undefined, ...nameWords]) {
    for (const dob of [undefined, ...dobWords]) {
      for (const number of [undefined, ...numberWords]) {
        const selected = [name, dob, number].filter(
          (value): value is string => value !== undefined
        );

        if (selected.length === 0) {
          continue;
        }

        yield* permutations(selected);
      }
    }
  }
}
