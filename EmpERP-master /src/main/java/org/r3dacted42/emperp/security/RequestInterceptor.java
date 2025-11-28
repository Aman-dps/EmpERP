package org.r3dacted42.emperp.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RequestInterceptor implements HandlerInterceptor {
    private final JWTService jwtService;

    @Value("${cors.frontend.url}")
    private String frontendUrl;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // handle pre-flight requests
        if (request.getMethod().equals("OPTIONS")) {
            response.setHeader("Access-Control-Allow-Origin", frontendUrl);
            response.setHeader("Access-Control-Allow-Methods", "*");
            response.setHeader("Access-Control-Allow-Headers", "*");
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Interceptor: Processing " + request.getMethod() + " " + request.getRequestURI());

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            System.out.println("Interceptor: Missing/Invalid Auth Header");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        String token = authorizationHeader.substring(7); // Extract token from "Bearer {token}"
        String username = jwtService.extractUsername(token);
        System.out.println("Interceptor: User " + username);

        if (username == null || !jwtService.isTokenValid(token, username)) {
            System.out.println("Interceptor: Invalid Token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        return true;
    }
}
