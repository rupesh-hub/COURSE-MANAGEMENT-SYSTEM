# Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorretto:17

ARG PROFILE=default
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/course-management-system-*.jar /app/

EXPOSE 8181

ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} course-management-system-${JAR_VERSION}.jar

# docker build -t rupesh1997/course-management-system:1.0.0 -f ../docker/backend/Dockerfile .
# docker run -d -p 8181:8181 --name course-management-system rupesh1997/course-management-system:1.0.0