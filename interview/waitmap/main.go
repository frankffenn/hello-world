package main

import (
	"sync"
	"time"
)

func main() {}

type WaitMap struct {
	data map[string]interface{}

	lk  sync.RWMutex
	out chan struct{}
}

func (w *WaitMap) Out(key string, val interface{}) {
	w.lk.Lock()
	defer w.lk.Unlock()

	w.data[key] = val
	w.out <- struct{}{}
}

func (w *WaitMap) Rd(key string, timeout time.Duration) interface{} {
	w.lk.RLock()
	defer w.lk.RUnlock()

	for {
		select {
		case <-w.out:
			get, ok := w.data[key]
			if !ok {
				continue
			}
			return get
		case <-time.After(timeout):
			return nil
		}
	}
}
