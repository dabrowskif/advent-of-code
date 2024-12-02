package day1

import (
	"bufio"
	"log"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

func CalculateTotalDistance() int {
	list1, list2 := createListsFromFile("./day1/lists.txt") // relative to main project module

	slices.SortFunc(list1, func(n1 int, n2 int) int {
		return n1 - n2
	})
	slices.SortFunc(list2, func(n1 int, n2 int) int {
		return n1 - n2
	})

	diff := 0

	for i := 0; i < len(list1); i++ {
		diff += int(math.Abs(float64(list1[i]) - float64(list2[i])))
	}

	return diff
}

func CalculateSimilarityScore() int {
	list1, list2 := createListsFromFile("./day1/lists.txt") // relative to main project module

	numberAppearancesMap := map[int]int{}

	for i := 0; i < len(list2); i++ {
		n := list2[i]
		_, ok := numberAppearancesMap[n]

		if ok {
			numberAppearancesMap[n]++
		} else {
			numberAppearancesMap[n] = 1
		}
	}

	sum := 0

	for i := 0; i < len(list1); i++ {
		n := list1[i]
		numberOfAppearances, ok := numberAppearancesMap[n]

		if ok {
			sum += n * numberOfAppearances
		}
	}

	return sum
}

func createListsFromFile(path string) ([]int, []int) {

	f, err := os.Open(path)

	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	scanner := bufio.NewScanner(f)

	list1 := make([]int, 0)
	list2 := make([]int, 0)

	for scanner.Scan() {
		r := strings.Split(scanner.Text(), " ")
		n1, _ := strconv.Atoi(r[0])
		n2, _ := strconv.Atoi(r[3])

		list1 = append(list1, n1)
		list2 = append(list2, n2)
	}

	return list1, list2
}
