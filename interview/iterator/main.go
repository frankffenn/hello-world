package main

import "fmt"

func main() {

	var test = &Set{
		elem: []int{66, 77, 88, 99, 00, 1, 2, 3, 4, 5},
	}

	for i := range test.Iter() {
		fmt.Println(i)
	}
}

type Set struct {
	elem []int
}

func (s *Set) Iter() <-chan interface{} {
	ch := make(chan interface{}, 1)

	go func() {
		for _, e := range s.elem {
			ch <- e
		}
		close(ch)
	}()

	return ch
}
