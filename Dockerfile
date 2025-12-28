# Stage 1: Build the application
# Use a different base image (e.g., standard maven) to avoid potential layer corruption
FROM --platform=linux/amd64 maven:3.9-amazoncorretto-17-al2023 AS build
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM --platform=linux/amd64 amazoncorretto:17-al2023
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
