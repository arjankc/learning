# Cloud Deployment

## Azure App Service (typical flow)
- Publish from CLI: `dotnet publish -c Release` then deploy via Azure CLI or VS.
- Configure app settings/environment variables in App Service (Key Vault for secrets).
- Enable logging and Application Insights.

## Docker containers
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /out
FROM base AS final
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "WebApi.dll"]
```

## Configuration & secrets
- Use appsettings.{Environment}.json + environment variables; never commit secrets.
- For cloud, prefer managed secret stores (Azure Key Vault, AWS Secrets Manager).

## Scaling & health
- Health checks endpoint; autoscaling rules; rolling deployments/slots.
