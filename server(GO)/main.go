package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/yash-raj10/Anon/controller"
)

func main() {
	// err := godotenv.Load(".env.local")
	// if err != nil {
	  // log.Fatalf("Error loading .env file")
	// }
	
	DB_URL := os.Getenv("DB_URL")
	// fmt.Println(DB_URL)

	db, err := sql.Open("postgres", DB_URL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS profiles (id SERIAL PRIMARY KEY, name TEXT, imageSrc TEXT, email TEXT, collage TEXT, social TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS cmts (id SERIAL PRIMARY KEY, pfpId INT, cmt TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()
	r.HandleFunc("/apiV1/profiles", controller.GetProfiles(db)).Methods("GET")
	r.HandleFunc("/apiV1/profile", controller.CreateProfile(db)).Methods("POST")
	r.HandleFunc("/apiV1/profiles/{id}", controller.GetProfile(db)).Methods("GET")
	r.HandleFunc("/apiV1/profile/{email}", controller.GetProfileByMAil(db)).Methods("GET")

	r.HandleFunc("/apiV1/cmts/{pfpId}", controller.GetCmts(db)).Methods("GET")
	r.HandleFunc("/apiV1/cmt", controller.CreateCmt(db)).Methods("POST")

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowCredentials(),
	)

	http.Handle("/", cors(r))

	fmt.Println("Listening at port 4000")
	log.Fatal(http.ListenAndServe(":4000", nil))
}
