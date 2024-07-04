package controller

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/yash-raj10/Anon/model"
)

func CreateCmt(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c model.Cmt
		json.NewDecoder(r.Body).Decode(&c)

		err := db.QueryRow("INSERT INTO cmts (pfpId, cmt) VALUES ($1, $2) RETURNING id", c.PfpId, c.Cmt).Scan(&c.Id)
		if err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(c)
	}
}


func GetCmts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		pfpId := vars["pfpId"]

		rows, err := db.Query("SELECT * From cmts WHERE pfpId = $1", pfpId)
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		var cmts []model.Cmt

		for rows.Next() {
			var c model.Cmt
			if err := rows.Scan(&c.Id, &c.PfpId, &c.Cmt); err != nil {
				log.Fatal(err)
			}
			cmts= append(cmts, c)
		}
		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}


		json.NewEncoder(w).Encode(cmts)
	}
}
