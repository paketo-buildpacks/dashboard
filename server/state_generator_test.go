package server_test

import (
	"testing"

	"github.com/paketo-buildpacks/dashboard/server"
	"github.com/sclevine/spec"

	. "github.com/onsi/gomega"
)

func testStateGenerator(t *testing.T, context spec.G, it spec.S) {
	var Expect = NewWithT(t).Expect

	it("generates a random string", func() {
		state := server.GenerateState()
		Expect(state).To(MatchRegexp(`[a-zA-Z]{20}`))

		state2 := server.GenerateState()
		Expect(state2).NotTo(Equal(state))
	})
}
