package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/paketo-buildpacks/dashboard/server"
)

//go:embed web/build
var content embed.FS

func main() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		port = "8080"
	}

	clientID, ok := os.LookupEnv("GITHUB_CLIENT_ID")
	if !ok {
		log.Fatal("GITHUB_CLIENT_ID is a required environment variable")
	}

	clientSecret, ok := os.LookupEnv("GITHUB_CLIENT_SECRET")
	if !ok {
		log.Fatal("GITHUB_CLIENT_SECRET is a required environment variable")
	}

	redirectURI, ok := os.LookupEnv("REDIRECT_URI")
	if !ok {
		log.Fatal("REDIRECT_URI is a required environment variable")
	}

	assets, err := fs.Sub(content, "web/build")
	if err != nil {
		log.Fatal(err)
	}

	fileServer := server.NewFileServer(assets)
	oauth := http.StripPrefix("/oauth", server.NewOAuth(server.GenerateState, "https://github.com", redirectURI, clientID, clientSecret))

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		switch {
		case strings.HasPrefix(req.URL.Path, "/oauth"):
			oauth.ServeHTTP(w, req)
		default:
			fileServer.ServeHTTP(w, req)
		}
	})))
}
