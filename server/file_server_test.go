package server_test

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"testing/fstest"

	"github.com/paketo-buildpacks/dashboard/server"
	"github.com/sclevine/spec"

	. "github.com/onsi/gomega"
)

func testFileServer(t *testing.T, context spec.G, it spec.S) {
	var (
		Expect = NewWithT(t).Expect

		handler http.Handler
	)

	it.Before(func() {
		assets := fstest.MapFS{
			"index.html":   &fstest.MapFile{Data: []byte("some-index-file")},
			"unknown-type": &fstest.MapFile{Data: []byte("<!DOCTYPE html><html></html>")},
		}

		handler = server.NewFileServer(assets)
	})

	for _, p := range []string{"/index.html", "/", "/issues", "/pull-requests"} {
		path := p

		context(fmt.Sprintf("when the path is %s", path), func() {
			it("serves the index page", func() {
				w := httptest.NewRecorder()
				handler.ServeHTTP(w, httptest.NewRequest("GET", path, nil))
				response := w.Result()
				defer response.Body.Close()

				Expect(response.StatusCode).To(Equal(http.StatusOK))

				content, err := io.ReadAll(response.Body)
				Expect(err).NotTo(HaveOccurred())
				Expect(string(content)).To(Equal("some-index-file"))

				Expect(response.Header.Get("Content-Type")).To(Equal("text/html; charset=utf-8"))
			})
		})
	}

	context("if the file does not exist", func() {
		it("returns a not-found response", func() {
			w := httptest.NewRecorder()
			handler.ServeHTTP(w, httptest.NewRequest("GET", "/nonexistent-path", nil))
			response := w.Result()
			defer response.Body.Close()

			Expect(response.StatusCode).To(Equal(http.StatusNotFound))
		})
	})

	context("when the content type cannot be inferred from the file extension", func() {
		it("applies the content type from detection", func() {
			w := httptest.NewRecorder()
			handler.ServeHTTP(w, httptest.NewRequest("GET", "/unknown-type", nil))
			response := w.Result()
			defer response.Body.Close()

			Expect(response.StatusCode).To(Equal(http.StatusOK))
			Expect(response.Header.Get("Content-Type")).To(Equal("text/html; charset=utf-8"))
		})
	})
}
