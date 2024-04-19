package controller

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/Anon/model"
)

func getProfiles(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request){
		rows, err := db.Query("SELECT *From profiles")
		if err != nil{
			log.Fatal(err)
		}
		defer rows.Close()

	var profiles []model.Profile
	// profiles = []Profile{}

	for rows.Next(){
		var p model.Profile
		if err :=  rows.Scan(&p.Id, &p.Name, &p.ImageSrc, &p.Collage, & p.Social); err  != nil {
			log.Fatal(err)
		}
		profiles = append(profiles, p)
	}
	if err := rows.Err(); err != nil{
       log.Fatal(err)
	}

	json.NewEncoder(w).Encode(profiles)
	}
}

func getProfile(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request){
		vars := mux.Vars(r)
		id := vars["id"]

		var p model.Profile

		err := db.QueryRow("SELECT *From profiles WHERE id = $1", id).Scan(&p.Id, &p.Name, &p.ImageSrc, &p.Collage, & p.Social)
		if err != nil{
		w.WriteHeader(http.StatusNotFound)
		return
		}

	json.NewEncoder(w).Encode(p)
	}
}

func createProfile(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request){
		var p model.Profile
		json.NewDecoder(r.Body).Decode(&p)

		err := db.QueryRow("INSERT INTO profiles (name, imageSrc, collage, social) VALUES ($1, $2, $3, $4) RETURNING id", p.Name, p.ImageSrc, p.Collage, p.Social).Scan(&p.Id)
		if err != nil{
		    log.Fatal(err)
		}

	json.NewEncoder(w).Encode(p)
	}
}