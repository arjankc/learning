# Docker Containers for .NET Apps

This guide shows how to containerize your .NET applications and run them locally. It pairs with the `examples/WebApi` project.

## Why containers
- Consistent runtime across machines
- Fast deploys and easy rollbacks
- Great fit for CI/CD and cloud platforms

## Minimal Dockerfile (ASP.NET Core)
We include a ready-to-use Dockerfile in `examples/WebApi` targeting .NET 8.

Key points:
- Multi-stage build (restore/build/publish runtime image)
- Non-root user for runtime (where supported)
- Expose port 8080 inside the container

## Build and run
1) Build image
 - Image name: `learning-webapi:dev`
2) Run container
 - Map host port 8080 to container 8080
 - Hit http://localhost:8080/swagger

Troubleshooting:
- If the port is in use, change host mapping `-p 8081:8080` and browse 8081.
- Ensure HTTPS is disabled or dev certs are handled inside container; our sample uses HTTP for simplicity.

## Next steps
- Push to a registry (Docker Hub, GHCR, ACR)
- Deploy to Azure Web App for Containers or Kubernetes
