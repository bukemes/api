# Multi-stage docker build.
split up actions, only manage 1 dockerfile, smaller final docker image.
## Steps
1. build backend & test
-> install everything
-> build (for production)
-> test
-> export build as artifact

1. build frontend
-> install everything
-> build
-> test
-> export only build as artifact

1. combine both & test full stack
-> install everything
-> test

1. deploy
-> export
-> smallest image to dockerhub

## 