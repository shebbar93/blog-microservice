# Getting Started with blog-microservice

This is a very simple blog application using microservice architecture.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisite

[Node](https://nodejs.org/en/download/)
[Docker](https://docs.docker.com/engine/install/)

Before running the command at your terminal, make sure Kubernetes is enabled at Docker settings
[NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

[Skaffold](https://skaffold.dev/docs/install/)

After installing all the Prerequisite, make sure the change the host.

### `127.0.0.1 posts.com`

In Windows the path is [C:\Windows\System32\drivers\etc\hosts].
In Mac I guess it's `vi /etc/hosts` [Please search online].
Failing to do so, will not start the application [Please check the infra\k8s\ingress-srv.yaml if needs any modification in the host name]

Then,

### `git clone https://github.com/shebbar93/blog-microservice.git`

Change to the project directory, you can run:

### `cd blog-microservice`

### `skaffold dev`
And open the Browser with posts.com

Once completed make sure to run

### `skaffold delete`
