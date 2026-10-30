# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node:26.12.1-bookworm-slim AS node

# Base image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["DocuSign.MyHR/*.sln", "DocuSign.MyHR/"]
COPY ["DocuSign.MyHR/DocuSign.MyHR/DocuSign.MyHR.csproj", "DocuSign.MyHR/DocuSign.MyHR/"]
COPY ["DocuSign.MyHR/DocuSign.MyHR.UnitTests/DocuSign.MyHR.UnitTests.csproj", "DocuSign.MyHR.UnitTests/"]
COPY ["DocuSign.MyHR/DocuSign.MyHR.UnitTests/DocuSign.MyHR.UnitTests.csproj", "DocuSign.MyHR/DocuSign.MyHR.UnitTests/"]

WORKDIR /src/DocuSign.MyHR
RUN dotnet restore

# Install Node.js and Angular CLI in the build stage
COPY --from=node /usr/local/ /usr/local/
RUN node --version && \
    npm install -g @angular/cli && \
    npm update

# Verify Angular CLI version
RUN ng version

COPY . .
RUN dotnet build "DocuSign.MyHR/DocuSign.MyHR/DocuSign.MyHR.csproj" -c Release -o /app/build

# Publish application
FROM build AS publish
RUN dotnet publish "DocuSign.MyHR/DocuSign.MyHR/DocuSign.MyHR.csproj" -c Release -o /app/publish

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DocuSign.MyHR.dll"]

