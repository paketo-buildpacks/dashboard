package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

const (
	TokenCookieName = "oauth_token"
	StateCookieName = "oauth_state"
)

type StateGenerator func() string

type OAuth struct {
	generateState StateGenerator
	githubURL     string
	redirectURL   string
	clientID      string
	clientSecret  string
}

func NewOAuth(stateGenerator StateGenerator, githubURL, redirectURL, clientID, clientSecret string) OAuth {
	return OAuth{
		generateState: stateGenerator,
		githubURL:     githubURL,
		redirectURL:   redirectURL,
		clientID:      clientID,
		clientSecret:  clientSecret,
	}
}

func (o OAuth) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	switch req.URL.Path {
	case "/login":
		o.login(w, req)
	case "/callback":
		o.callback(w, req)
	default:
		http.NotFound(w, req)
	}
}

func (o OAuth) login(w http.ResponseWriter, req *http.Request) {
	state := o.generateState()

	uri, err := url.Parse(fmt.Sprintf("%s/login/oauth/authorize", o.githubURL))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	query := url.Values{}
	query.Add("client_id", o.clientID)
	query.Add("redirect_uri", o.redirectURL)
	query.Add("state", state)

	uri.RawQuery = query.Encode()

	http.SetCookie(w, &http.Cookie{Name: StateCookieName, Value: state})
	http.Redirect(w, req, uri.String(), http.StatusFound)
}

func (o OAuth) callback(w http.ResponseWriter, req *http.Request) {
	state, err := req.Cookie(StateCookieName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if state.Value != req.URL.Query().Get("state") {
		http.Error(w, "states do not match", http.StatusUnauthorized)
		return
	}

	data := url.Values{}
	data.Add("client_id", o.clientID)
	data.Add("client_secret", o.clientSecret)
	data.Add("code", req.URL.Query().Get("code"))
	data.Add("redirect_uri", o.redirectURL)

	request, err := http.NewRequest("POST", fmt.Sprintf("%s/login/oauth/access_token", o.githubURL), strings.NewReader(data.Encode()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))
	request.Header.Add("Accept", "application/json")

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		http.Error(w, "failed to exchange token", http.StatusUnauthorized)
		return
	}

	var body struct {
		AccessToken string `json:"access_token"`
		Scope       string `json:"scope"`
		TokenType   string `json:"token_type"`
	}
	err = json.NewDecoder(response.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{Name: TokenCookieName, Value: body.AccessToken, Path: "/"})
	http.Redirect(w, req, "/", http.StatusFound)
}
