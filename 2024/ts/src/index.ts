import * as day1 from "./day1";
import * as day2 from "./day2";

const day = process.argv[3];

if (!day || isNaN(Number(day))) {
  console.log("Usage: npm run start <day_number>");
}

switch (day) {
  case "1":
    console.log(await day1.calculateTotalDistance());
    console.log(await day1.calculateSimilarityScore());
    break;

  case "2":
    console.log(await day2.countSafeReports());
    console.log(await day2.countSafeReportsWithToleration());
    break;
}
