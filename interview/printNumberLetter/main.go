package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup
var numberCh = make(chan struct{})
var letterCh = make(chan struct{})

func main() {

	wg.Add(1)

	go printNumber()

	go printLetter()

	numberCh <- struct{}{}

	wg.Wait()
}

func printNumber() {
	num := 0
	for {
		select {
		case <-numberCh:
			for i := 0; i < 2; i++ {
				num++
				fmt.Print(num)
			}
			letterCh <- struct{}{}
		}
	}
}

func printLetter() {
	num := 0
	for {
		select {
		case <-letterCh:
			for i := 0; i < 2; i++ {
				if num >= 28 {
					wg.Done()
					return
				}
				fmt.Print(string('A' + num))
				num++
			}
			numberCh <- struct{}{}
		}
	}

}
