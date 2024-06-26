package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/yash-raj10/Anon/controller"
)

func main() {

	DB_URL :="postgres://postgres:postgres@localhost/postgres?sslmode=disable" 


	db, err := sql.Open("postgres", DB_URL )
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS profiles (id SERIAL PRIMARY KEY, name TEXT, imageSrc TEXT, collage TEXT, social TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()
	r.HandleFunc("/apiV1/profiles", controller.GetProfiles(db)).Methods("GET")
	r.HandleFunc("/apiV1/profile", controller.CreateProfile(db)).Methods("POST")
	r.HandleFunc("/apiV1/profiles/{id}", controller.GetProfile(db)).Methods("GET")

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
