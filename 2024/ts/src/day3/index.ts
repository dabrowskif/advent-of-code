import * as fs from "fs";
import * as rl from "readline";

export async function sumMultiplications() {
  const memory = await loadMemoryFromFile("./src/day3/memory.txt"); // relative to main project module

  return memory
    .matchAll(/mul\(\d{1,3},\d{1,3}\)/g)
    .reduce((sum, multiplicationMatch) => {
      return (
        sum +
        multiplicationMatch[0]
          .matchAll(/\d{1,3}/g)
          .reduce((res, numberMatch) => Number(numberMatch[0]) * res, 1)
      );
    }, 0);
}

export async function sumToggledMultiplications() {
  const memory = await loadMemoryFromFile("./src/day3/memory.txt"); // relative to main project module

  const instructions = memory.matchAll(
    /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g,
  );

  return instructions.reduce(
    (obj, instruction) => {
      if (instruction[0] === "do()") {
        obj.shouldDo = true;
      } else if (instruction[0] === "don't()") {
        obj.shouldDo = false;
      } else {
        if (obj.shouldDo) {
          obj.sum += instruction[0]
            .matchAll(/\d{1,3}/g)
            .reduce((res, numberMatch) => Number(numberMatch[0]) * res, 1);
        }
      }

      return obj;
    },
    {
      sum: 0,
      shouldDo: true,
    },
  ).sum;
}

async function loadMemoryFromFile(path: string): Promise<string> {
  const fileStream = fs.createReadStream(path);

  const lines = rl.createInterface({
    input: fileStream,
  });

  const memory: string[] = [];

  for await (const line of lines) {
    memory.push(line);
  }

  return memory.join("");
}
