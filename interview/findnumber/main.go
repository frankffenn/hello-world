package main

import (
	"context"
	"fmt"
	"sort"
	"time"
)

func main() {
	target := 666
	src := []int{1, 2, 4, 4, 56, 7, 8, 2, 4, 5, 666, 7}

	snips := splitSlice(src, 2)
	done := make(chan struct{})

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		for _, s := range snips {
			sort.Slice(src, func(i, j int) bool { return src[i] > src[j] })
			go findNumber(ctx, s, target)
		}
	}()

	for {
		select {
		case <-time.After(time.Second * 5):
			cancel()
			fmt.Println("timeout")
			return
		case <-done:
			return
		}
	}
}

func splitSlice(src []int, num int) [][]int {
	var out [][]int
	count := len(src) / num
	for i := 0; i < num; i++ {
		start, end := i*count, (i+1)*count
		out = append(out, src[start:end])
	}
	sort.Slice(src, func(i, j int) bool { return src[i] > src[j] })
	return out
}

func findNumber(ctx context.Context, src []int, target int) {
	select {
	case <-ctx.Done():
		return
	default:
		bs, ok := binarySearch(src, target)
		if ok {
			return
		}
		findNumber(ctx, bs, target)
	}
}

func binarySearch(src []int, target int) ([]int, bool) {
	if len(src) <= 1 {
		return nil, false
	}
	mid := len(src) >> 1
	if src[mid] == target {
		fmt.Println("found it")
		return nil, true
	} else if src[mid] < target {
		return src[mid+1:], false
	} else {
		return src[:mid-1], false
	}
}
