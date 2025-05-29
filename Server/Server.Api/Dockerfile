# שלב בנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY Server.Api.csproj ./
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

# שלב הרצה
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Server.Api.dll"]
