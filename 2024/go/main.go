package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/dabrowskif/advent-of-code/2024/go/day1"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go <day_number>")
		return
	}

	day, err := strconv.Atoi(os.Args[1])

	if err != nil {
		fmt.Println("Usage: go run main.go <day_number>")
		return
	}

	switch day {
	case 1:
		fmt.Println(day1.CalculateTotalDistance())
		fmt.Println(day1.CalculateSimilarityScore())
	}
}
