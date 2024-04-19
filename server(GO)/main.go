package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

func main(){
	db, err := sql.Open("postgres", os.Getenv("DB_URL"))
	if err != nil{
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTED profiles (id SERIAL PRIMARY KEY, name TEXT, imageSrc TEXT, collage TEXT, social TEXT)")
	if err != nil{
		log.Fatal(err)
	}

	r := mux.NewRouter()
	r.HandleFunc("/apiV1/profiles", getProfiles(db)).Methods("GET")
	r.HandleFunc("/apiV1/profile", createProfile(db)).Methods("POST")
	r.HandleFunc("/apiV1/profiles/{id}", getProfile(db)).Methods("GET")
	

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	http.Handle("/", cors(r))

	fmt.Println("Listening at port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))
}