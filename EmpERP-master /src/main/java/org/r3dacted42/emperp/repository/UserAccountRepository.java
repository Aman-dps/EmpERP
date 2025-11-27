package org.r3dacted42.emperp.repository;

import org.r3dacted42.emperp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    boolean existsByUsername(String username);

    Optional<UserAccount> findByUsername(String username);

    List<UserAccount> findByActiveFalse();
}
