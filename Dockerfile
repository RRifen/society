FROM gradle:jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

FROM openjdk:17
EXPOSE 8080
RUN mkdir /app /app/files /app/users /app/posts
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
COPY /images/users/defaultProfilePic.png /app/users/
ENTRYPOINT ["java", "-jar", "/app/spring-boot-application.jar"]