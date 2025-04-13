FROM golang:1.24.2-alpine3.21

COPY . /server/

WORKDIR /server

RUN go build -o server

ENTRYPOINT [ "./server" ]