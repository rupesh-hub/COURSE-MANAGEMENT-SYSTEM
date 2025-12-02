1. Build docker image
    - docker build -t rupesh1997/course-management-system-frontend:1.0.0 -f ../docker/frontend/Dockerfile .
   
2. Run image
    - docker run -d -p 8080:8080 --name course-management-system-frontend rupesh1997/course-management-system-frontend:1.0.0