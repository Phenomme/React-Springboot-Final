package com.general.task_manager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply this to all endpoints
                .allowedOrigins("http://localhost:5173") // React app URL (for dev, use `*` for testing)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Methods allowed
                .allowedHeaders("*") // Allow all headers (e.g., Content-Type, Authorization)
                .allowCredentials(true); // Allow cookies or credentials (if needed)
    }
}
