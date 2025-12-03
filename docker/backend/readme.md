1. Build image
   docker build -t rupesh1997/course-management-system:1.0.0 -f ../docker/backend/Dockerfile .

2. Create network
    docker network create cms-network
3. Run mysql docker image
   docker run -d \
   --name mysql \
   -e MYSQL_ROOT_PASSWORD=root \
   -e MYSQL_DATABASE=courses \
   -p 3306:3306 \
   --network cms-network \
   --health-cmd="mysqladmin ping -h localhost -uroot -proot" \
   --health-interval=10s \
   --health-retries=5 \
   --health-start-period=60s \
   mysql:8.0

4. Run backend docker image
   docker run -d \
   --name course-management-system \
   --network cms-network \
   -e SPRING_APPLICATION_NAME="course-management-system" \
   -e SPRING_DATASOURCE_URL="jdbc:mysql://mysql:3306/courses?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC" \
   -e SPRING_DATASOURCE_USERNAME="root" \
   -e SPRING_DATASOURCE_PASSWORD="root" \
   -e SPRING_JPA_DATABASE_PLATFORM="org.hibernate.dialect.MySQL8Dialect" \
   -p 8181:8181 \
   rupesh1997/course-management-system:1.0.0

