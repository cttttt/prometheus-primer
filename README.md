# prometheus-primer

## Why?

Just playing around with prometheus.

## What?

- Runs two node instances and Prometheus
- Each instance:
  - Runs an http server 
  - Increments a counter on each incoming connection
  - Generates 100 connections per second of workload

## How to use?

To try it out, clone and run `docker-compose up -d`, then browse to http://localhost:9090 and run the following query:

`rate(num_connections[1m])`

You should notice around 100rpm from two sources.

## Author

Chris Taylor
