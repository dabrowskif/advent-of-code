import * as day1 from "./day1";

const day = process.argv[3];

if (!day || isNaN(Number(day))) {
  console.log("Usage: npm run start <day_number>");
}

switch (day) {
  case "1":
    console.log(await day1.calculateTotalDistance());
    console.log(await day1.calculateSimilarityScore());

  case "2":
  //...
}
