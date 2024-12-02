import * as fs from "fs";
import * as rl from "readline";

export async function countSafeReports() {
  const reports = await loadReportsFromFile("./src/day2/reports.txt"); // relative to main project module

  return reports.reduce((sum, report) => {
    if (isSafeReport(report)) {
      sum++;
    }

    return sum;
  }, 0);
}

function isSafeReport(report: number[]) {
  // we can go off by 1 in JS hence -1, otherwise would require -2 and addigional Math.abs check inside if
  for (let i = 0; i < report.length - 1; i++) {
    const diff1 = report[i] - report[i + 1];
    const diff2 = report[i + 1] - report[i + 2];

    if (diff1 * diff2 <= 0 || Math.abs(diff1) > 3) {
      return false;
    }
  }

  return true;
}

export async function countSafeReportsWithToleration() {
  const reports = await loadReportsFromFile("./src/day2/reports.txt"); // relative to main project module

  return reports.reduce((sum, report) => {
    if (isToleratedSafeReport(report)) {
      sum++;
    }

    return sum;
  }, 0);
}

// TODO: for sure there is some more optimal way with backtracking or whatever
function isToleratedSafeReport(report: number[]) {
  return (
    isSafeReport(report) ||
    report.map((_, i) => isSafeReport(report.toSpliced(i, 1))).some(Boolean)
  );
}

async function loadReportsFromFile(path: string): Promise<number[][]> {
  const fileStream = fs.createReadStream(path);

  const lines = rl.createInterface({
    input: fileStream,
  });

  const reports: number[][] = [];

  for await (const line of lines) {
    const report = line.split(" ").map(Number);

    reports.push(report);
  }

  return reports;
}
