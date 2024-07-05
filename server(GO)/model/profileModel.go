package model

type Profile struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	ImageSrc string `json:"imageSrc"`
	Email string `json:"email"`
	Collage  string `json:"collage"`
	Social   string `json:"social"`
}
