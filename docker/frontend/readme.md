1. Build docker image
   docker build \
   -t rupesh1997/course-management-system-frontend:1.0.0 \
   --build-arg CONFIGURATION=docker \
   -f ../docker/frontend/Dockerfile .

---
docker build \
-t rupesh1997/course-management-system-frontend:1.0.0 \
-f ../docker/frontend/Dockerfile .

2. Run image
   docker run -d \
   --name course-management-system-frontend \
   --network cms-network \
   -p 8080:8080 \
   rupesh1997/course-management-system-frontend:1.0.0
