package day2

import (
	"bufio"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

func CountSafeReports() int {
	reports := createListsFromFile("./day2/reports.txt") // relative to main project module

	numberOfSafeReports := 0

	for i := 0; i < len(reports); i++ {
		if isReportSafe(reports[i]) {
			numberOfSafeReports++
		}
	}

	return numberOfSafeReports
}

func isReportSafe(report []int) bool {
	for i := 0; i < len(report)-2; i++ {
		diff1 := float64(report[i] - report[i+1])
		diff2 := float64(report[i+1] - report[i+2])

		if diff1*diff2 <= 0 || math.Abs(diff1) > 3 || math.Abs(diff2) > 3 {
			return false
		}

	}

	return true
}

func CountSafeReportsWithToleration() int {
	reports := createListsFromFile("./day2/reports.txt") // relative to main project module

	safeReportsCount := 0

	for i := 0; i < len(reports); i++ {
		report := reports[i]

		if isReportSafe(report) {
			safeReportsCount++
		} else {
			for j := 0; j < len(report); j++ {
				isToleratedSafeReport := isToleratedSafeReport(report, j)

				if isToleratedSafeReport {
					safeReportsCount++
					break
				}
			}
		}
	}

	return safeReportsCount
}

func isToleratedSafeReport(report []int, j int) bool {
	reportWithoutLevel := make([]int, 0)

	for i := 0; i < len(report); i++ {
		if i != j {
			reportWithoutLevel = append(reportWithoutLevel, report[i])
		}

	}

	return isReportSafe(reportWithoutLevel)
}

func createListsFromFile(path string) [][]int {
	f, err := os.Open(path)

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	scanner := bufio.NewScanner(f)

	reports := make([][]int, 0)

	for scanner.Scan() {
		report := strings.Split(scanner.Text(), " ")

		numbers := make([]int, 0)

		for i := 0; i < len(report); i++ {
			n, _ := strconv.Atoi(report[i])
			numbers = append(numbers, n)
		}

		reports = append(reports, numbers)
	}

	return reports
}
