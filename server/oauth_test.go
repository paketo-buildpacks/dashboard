package server_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/paketo-buildpacks/dashboard/server"
	"github.com/sclevine/spec"

	. "github.com/onsi/gomega"
)

func testOAuth(t *testing.T, context spec.G, it spec.S) {
	var (
		Expect = NewWithT(t).Expect

		handler http.Handler
		github  *httptest.Server
	)

	it.Before(func() {
		github = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			Expect(req.ParseForm()).To(Succeed())

			Expect(req.Form.Get("client_id")).To(Equal("some-client-id"))
			Expect(req.Form.Get("client_secret")).To(Equal("some-client-secret"))
			Expect(req.Form.Get("code")).To(Equal("some-code"))
			Expect(req.Form.Get("redirect_uri")).To(Equal("some-redirect-uri"))

			fmt.Fprint(w, `{
				"access_token": "some-token",
				"scope": "some-scope",
				"token_type": "some-token-type"
			}`)
		}))

		stateGenerator := func() string { return "some-random-value" }
		handler = server.NewOAuth(stateGenerator, github.URL, "some-redirect-uri", "some-client-id", "some-client-secret")
	})

	it.After(func() {
		github.Close()
	})

	context("/login", func() {
		it("redirects to the GitHub authorize endpoint", func() {
			w := httptest.NewRecorder()
			handler.ServeHTTP(w, httptest.NewRequest("GET", "/login", nil))
			response := w.Result()
			defer response.Body.Close()

			Expect(response.StatusCode).To(Equal(http.StatusFound))

			uri, err := url.Parse(response.Header.Get("Location"))
			Expect(err).NotTo(HaveOccurred())

			Expect(response.Header.Get("Location")).To(HavePrefix(github.URL))
			Expect(uri.Path).To(Equal("/login/oauth/authorize"))
			Expect(uri.Query().Get("client_id")).To(Equal("some-client-id"))
			Expect(uri.Query().Get("redirect_uri")).To(Equal("some-redirect-uri"))
			Expect(uri.Query().Get("state")).To(Equal("some-random-value"))

			Expect(response.Cookies()).To(HaveLen(1))
			Expect(response.Cookies()[0].Name).To(Equal("oauth_state"))
			Expect(response.Cookies()[0].Value).To(Equal("some-random-value"))
		})

		context("failure cases", func() {
			context("when the GitHub URL cannot be parsed", func() {
				it.Before(func() {
					stateGenerator := func() string { return "some-random-value" }
					handler = server.NewOAuth(stateGenerator, "%%%", "some-redirect-uri", "some-client-id", "some-client-secret")
				})

				it("responds with an error status code", func() {
					w := httptest.NewRecorder()
					handler.ServeHTTP(w, httptest.NewRequest("GET", "/login", nil))
					response := w.Result()
					defer response.Body.Close()

					Expect(response.StatusCode).To(Equal(http.StatusInternalServerError))
				})
			})
		})
	})

	context("/callback", func() {
		it("fetches the access token and redirects back to the index", func() {
			w := httptest.NewRecorder()
			request := httptest.NewRequest("GET", "/callback?code=some-code&state=some-random-value", nil)
			request.AddCookie(&http.Cookie{
				Name:  "oauth_state",
				Value: "some-random-value",
			})

			handler.ServeHTTP(w, request)
			response := w.Result()
			defer response.Body.Close()

			Expect(response.StatusCode).To(Equal(http.StatusFound))
			Expect(response.Header.Get("Location")).To(Equal("/"))

			Expect(response.Cookies()).To(HaveLen(1))
			Expect(response.Cookies()[0].Name).To(Equal("oauth_token"))
			Expect(response.Cookies()[0].Value).To(Equal("some-token"))
		})

		context("when the state values don't match", func() {
			it("returns an unauthorized response code", func() {
				w := httptest.NewRecorder()
				request := httptest.NewRequest("GET", "/callback?code=some-code&state=some-random-value", nil)
				request.AddCookie(&http.Cookie{
					Name:  "oauth_state",
					Value: "other-random-value",
				})

				handler.ServeHTTP(w, request)
				response := w.Result()
				defer response.Body.Close()

				Expect(response.StatusCode).To(Equal(http.StatusUnauthorized))
			})
		})

		context("failure cases", func() {
			context("when there is no state cookie", func() {
				it("responds with an error status code", func() {
					w := httptest.NewRecorder()
					handler.ServeHTTP(w, httptest.NewRequest("GET", "/callback?code=some-code&state=some-random-value", nil))
					response := w.Result()
					defer response.Body.Close()

					Expect(response.StatusCode).To(Equal(http.StatusInternalServerError))
				})
			})

			context("when the GitHub URL is invalid", func() {
				it.Before(func() {
					stateGenerator := func() string { return "some-random-value" }
					handler = server.NewOAuth(stateGenerator, "%%%", "some-redirect-uri", "some-client-id", "some-client-secret")
				})

				it("responds with an error status code", func() {
					w := httptest.NewRecorder()
					request := httptest.NewRequest("GET", "/callback?code=some-code&state=some-random-value", nil)
					request.AddCookie(&http.Cookie{
						Name:  "oauth_state",
						Value: "some-random-value",
					})

					handler.ServeHTTP(w, request)
					response := w.Result()
					defer response.Body.Close()

					Expect(response.StatusCode).To(Equal(http.StatusInternalServerError))
				})
			})

			context("when the GitHub response cannot be parsed", func() {
				it.Before(func() {
					github.Close()

					github = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
						fmt.Fprint(w, "%%%")
					}))

					stateGenerator := func() string { return "some-random-value" }
					handler = server.NewOAuth(stateGenerator, github.URL, "some-redirect-uri", "some-client-id", "some-client-secret")
				})

				it("responds with an error status code", func() {
					w := httptest.NewRecorder()
					request := httptest.NewRequest("GET", "/callback?code=some-code&state=some-random-value", nil)
					request.AddCookie(&http.Cookie{
						Name:  "oauth_state",
						Value: "some-random-value",
					})

					handler.ServeHTTP(w, request)
					response := w.Result()
					defer response.Body.Close()

					Expect(response.StatusCode).To(Equal(http.StatusInternalServerError))
				})
			})
		})
	})

	context("when given an unknown path", func() {
		it("responds with a not found status code", func() {
			w := httptest.NewRecorder()
			handler.ServeHTTP(w, httptest.NewRequest("GET", "/unknown-path", nil))
			response := w.Result()
			defer response.Body.Close()

			Expect(response.StatusCode).To(Equal(http.StatusNotFound))
		})
	})
}
