package org.r3dacted42.emperp.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final org.r3dacted42.emperp.repository.UserAccountRepository userAccountRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    @Value("${cors.frontend.url}")
    private String frontendUrl;

    private static final String ADMIN_EMAIL_REGEX = "^amantiwari8005@gmail\\.com$";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email != null && Pattern.matches(ADMIN_EMAIL_REGEX, email)) {
            // Check if user exists
            org.r3dacted42.emperp.entity.UserAccount user = userAccountRepository.findByUsername(email).orElse(null);

            if (user == null) {
                // Create new pending user
                user = org.r3dacted42.emperp.entity.UserAccount.builder()
                        .username(email)
                        .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                        .active(false)
                        .build();
                userAccountRepository.save(user);

                // Redirect to error/pending page
                String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/login")
                        .queryParam("error", "Account created but pending approval")
                        .build().toUriString();
                getRedirectStrategy().sendRedirect(request, response, targetUrl);
                return;
            }

            if (!user.isActive()) {
                // User exists but is not active
                String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/login")
                        .queryParam("error", "Account is pending approval")
                        .build().toUriString();
                getRedirectStrategy().sendRedirect(request, response, targetUrl);
                return;
            }

            // Valid and Active Admin
            String token = jwtService.generateToken(email);
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/auth/callback")
                    .queryParam("token", token)
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // Invalid User
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/unauthorized")
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
}
