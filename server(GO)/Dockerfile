FROM golang:1.22.2

WORKDIR /app

COPY . .

ENV DB_URL=$DB_URL

RUN go mod tidy
RUN go build

EXPOSE 4000

CMD ["./main"]