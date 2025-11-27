package org.r3dacted42.emperp.configuration;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.security.CustomOAuth2UserService;
import org.r3dacted42.emperp.security.OAuth2LoginFailureHandler;
import org.r3dacted42.emperp.security.OAuth2LoginSuccessHandler;
import org.r3dacted42.emperp.security.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {
        private final RequestInterceptor requestInterceptor;
        private final CustomOAuth2UserService customOAuth2UserService;
        private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
        private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(auth -> auth
                                                // Permit all requests so that the existing RequestInterceptor can
                                                // handle API
                                                // security
                                                // and public endpoints remain accessible.
                                                .anyRequest().permitAll())
                                .oauth2Login(oauth2 -> oauth2
                                                .userInfoEndpoint(userInfo -> userInfo
                                                                .userService(customOAuth2UserService))
                                                .successHandler(oAuth2LoginSuccessHandler)
                                                .failureHandler(oAuth2LoginFailureHandler));

                return http.build();
        }

        @Override
        public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(requestInterceptor)
                                .addPathPatterns("/**")
                                .excludePathPatterns("/api/v1/auth/**", "/api/v1/employees/**/photo", "/swagger-ui/**", // allow
                                                                                                                        // swagger
                                                                                                                        // UI
                                                "/v3/api-docs/**", // allow swagger json
                                                "/swagger-resources/**", // allow swagger resources
                                                "/webjars/**", // allow web assets
                                                "/error",
                                                "/login/**", "/oauth2/**" // Allow OAuth2 endpoints
                                );
        }
}
