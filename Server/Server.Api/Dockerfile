# שלב בנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# העתק את כל הקבצים קודם כדי שכל התלויות יכללו לפני ה-restore
COPY . .

# שחזור תלויות מהפרויקט הראשי
RUN dotnet restore Server.Api/Server.Api.csproj

# קומפילציה ופרסום
RUN dotnet publish Server.Api/Server.Api.csproj -c Release -o /app

# שלב הרצה
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Server.Api.dll"]
