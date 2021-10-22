package server

import (
	"math/rand"
	"strings"
	"time"
)

func GenerateState() string {
	rand.Seed(time.Now().UnixNano())

	charset := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	var state strings.Builder
	for i := 0; i < 20; i++ {
		state.WriteRune(charset[rand.Intn(len(charset))])
	}

	return state.String()
}
