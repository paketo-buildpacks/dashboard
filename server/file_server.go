package server

import (
	"bufio"
	"io"
	"io/fs"
	"mime"
	"net/http"
	"path/filepath"
	"strings"
)

type FileServer struct {
	assets fs.FS
}

func NewFileServer(assets fs.FS) FileServer {
	return FileServer{assets: assets}
}

func (s FileServer) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	name := strings.TrimPrefix(req.URL.Path, "/")
	switch name {
	case "", "issues", "pull-requests":
		name = "index.html"
	}

	file, err := s.assets.Open(name)
	if err != nil {
		http.NotFound(w, req)
		return
	}
	defer file.Close()

	reader := bufio.NewReader(file)

	contentType := mime.TypeByExtension(filepath.Ext(name))
	if contentType == "" {
		buf, err := reader.Peek(512)
		if err != nil && err != io.EOF {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		contentType = http.DetectContentType(buf)
	}
	w.Header().Set("Content-Type", contentType)

	_, err = io.Copy(w, reader)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
