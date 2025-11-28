package com.alfarays;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@OpenAPIDefinition(
		info = @Info(
				title = "Course Management System API",
				version = "1.0.0",
				summary = "Provides APIs for managing courses.",
				description = "REST API Documentation for the course management system, part of the Alfarays course service architecture.",
				termsOfService = "https://www.alfarays.tech/terms",
				contact = @Contact(
						name = "Rupesh Dulal",
						email = "rupeshdulal672@gmail.com",
						url = "https://www.alfarays.tech"
				),
				license = @License(
						name = "Apache 2.0",
						url = "https://www.apache.org/licenses/LICENSE-2.0"
				)
		),

		servers = {
				@Server(
						description = "Local Development Server",
						url = "http://localhost:8181/api/v1.0.0/cms"
				),
				@Server(
						description = "Staging Server",
						url = "https://api.alfarays.tech/staging/api/v1.0.0/cms"
				),
				@Server(
						description = "Production Server",
						url = "https://api.alfarays.tech//api/v1.0.0/cms"
				)
		},

		tags = {
				@Tag(name = "courses", description = "Courses CRUD operations and course metadata management")
		},

		externalDocs = @ExternalDocumentation(
				description = "Alfarays Technical Documentation",
				url = "https://docs.alfarays.tech"
		)
)
@SecurityScheme(
		name = "bearerAuth",
		description = "JWT authentication using Bearer tokens",
		scheme = "bearer",
		type = SecuritySchemeType.HTTP,
		bearerFormat = "JWT"
)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
