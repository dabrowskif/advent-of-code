import * as fs from "fs";
import * as rl from "readline";

export async function countSimpleXMAS() {
  const words = await loadMemoryFromFile("./src/day4/words.txt"); // relative to main project module
  enlargeWordsArray(words);

  const xStart = 3;
  const xEnd = words[3].length - 3;
  const yStart = 3;
  const yEnd = words.length - 3;

  let count = 0;

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      count += countSimpleXMASFromPoint(x, y, words);
    }
  }

  return count;
}

export async function countCrossXMAS() {
  const words = await loadMemoryFromFile("./src/day4/words.txt"); // relative to main project module
  enlargeWordsArray(words);

  const xStart = 3;
  const xEnd = words[3].length - 3;
  const yStart = 3;
  const yEnd = words.length - 3;

  let count = 0;

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      count += countCrossXMASFromGivenPoint(x, y, words);
    }
  }

  return count;
}

function enlargeWordsArray(words: string[][]) {
  const length = words[0].length;
  const filler = Array.from({ length }).fill("") as string[];

  words.unshift(filler);
  words.unshift(filler);
  words.unshift(filler);
  words.push(filler);
  words.push(filler);
  words.push(filler);
  words.map((word) => {
    word.unshift("");
    word.unshift("");
    word.unshift("");
    word.push("");
    word.push("");
    word.push("");
  });
}

function countSimpleXMASFromPoint(x: number, y: number, words: string[][]) {
  let count = 0;

  if (
    words[x][y] === "X" &&
    words[x + 1][y] === "M" &&
    words[x + 2][y] === "A" &&
    words[x + 3][y] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x - 1][y] === "M" &&
    words[x - 2][y] === "A" &&
    words[x - 3][y] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x][y + 1] === "M" &&
    words[x][y + 2] === "A" &&
    words[x][y + 3] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x][y - 1] === "M" &&
    words[x][y - 2] === "A" &&
    words[x][y - 3] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x + 1][y + 1] === "M" &&
    words[x + 2][y + 2] === "A" &&
    words[x + 3][y + 3] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x - 1][y + 1] === "M" &&
    words[x - 2][y + 2] === "A" &&
    words[x - 3][y + 3] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x + 1][y - 1] === "M" &&
    words[x + 2][y - 2] === "A" &&
    words[x + 3][y - 3] === "S"
  ) {
    count++;
  }
  if (
    words[x][y] === "X" &&
    words[x - 1][y - 1] === "M" &&
    words[x - 2][y - 2] === "A" &&
    words[x - 3][y - 3] === "S"
  ) {
    count++;
  }

  return count;
}

function countCrossXMASFromGivenPoint(x: number, y: number, words: string[][]) {
  const isBotRightXMAS =
    words[x][y] === "A" &&
    words[x + 1][y + 1] === "M" &&
    words[x - 1][y - 1] === "S";

  const isBotLeftXMAS =
    words[x][y] === "A" &&
    words[x - 1][y + 1] === "M" &&
    words[x + 1][y - 1] === "S";

  const isTopRightXMAS =
    words[x][y] === "A" &&
    words[x + 1][y - 1] === "M" &&
    words[x - 1][y + 1] === "S";

  const isTopLeftXMAS =
    words[x][y] === "A" &&
    words[x - 1][y - 1] === "M" &&
    words[x + 1][y + 1] === "S";

  if (
    (isBotLeftXMAS && isBotRightXMAS) ||
    (isBotLeftXMAS && isTopLeftXMAS) ||
    (isTopLeftXMAS && isTopRightXMAS) ||
    (isTopRightXMAS && isBotRightXMAS)
  ) {
    return 1;
  }

  return 0;
}

async function loadMemoryFromFile(path: string): Promise<string[][]> {
  const fileStream = fs.createReadStream(path);

  const lines = rl.createInterface({
    input: fileStream,
  });

  const words: string[][] = [];

  for await (const line of lines) {
    words.push(line.split(""));
  }

  return words;
}
