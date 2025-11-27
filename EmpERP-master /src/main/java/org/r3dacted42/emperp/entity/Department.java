package org.r3dacted42.emperp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "department")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "department_id")
    private Long departmentId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long capacity;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    List<Employee> employees;
}
