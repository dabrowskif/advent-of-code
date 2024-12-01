import * as fs from "fs";
import * as rl from "readline";

export async function calculateTotalDistance() {
  const { list1, list2 } = await createListsFromFile("./src/day1/list.txt"); // relative to main project module

  list1.sort();
  list2.sort();

  return list1.reduce((totalDistance, num, index) => {
    return totalDistance + Math.abs(num - list2[index]);
  }, 0);
}

export async function calculateSimilarityScore() {
  const { list1, list2 } = await createListsFromFile("./src/day1/list.txt"); // relative to main project module

  const numberAppearancesMap = list2.reduce((map, number) => {
    map[number] ??= 0;
    map[number]++;

    return map;
  }, {});

  return list1.reduce((score, number) => {
    const numberOfAppearances = numberAppearancesMap[number];

    if (numberOfAppearances) {
      score = score + number * numberOfAppearances;
    }

    return score;
  }, 0);
}

async function createListsFromFile(path: string): Promise<{
  list1: number[];
  list2: number[];
}> {
  const fileStream = fs.createReadStream(path);

  const lines = rl.createInterface({
    input: fileStream,
  });

  const list1: number[] = [];
  const list2: number[] = [];

  for await (const line of lines) {
    const [n1, , , n2] = line.split(" ");

    list1.push(Number(n1));
    list2.push(Number(n2));
  }

  return {
    list1,
    list2,
  };
}
