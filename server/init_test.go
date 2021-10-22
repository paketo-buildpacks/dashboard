package server_test

import (
	"testing"

	"github.com/sclevine/spec"
	"github.com/sclevine/spec/report"
)

func TestServer(t *testing.T) {
	suite := spec.New("server", spec.Report(report.Terminal{}), spec.Parallel())
	suite("FileServer", testFileServer)
	suite("OAuth", testOAuth)
	suite("StateGenerator", testStateGenerator)
	suite.Run(t)
}
