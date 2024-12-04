import * as day1 from "./day1";
import * as day2 from "./day2";
import * as day3 from "./day3";
import * as day4 from "./day4";

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

  case "3":
    console.log(await day3.sumMultiplications());
    console.log(await day3.sumToggledMultiplications());
    break;

  case "4":
    console.log(await day4.countSimpleXMAS());
    console.log(await day4.countCrossXMAS());
    break;
}
