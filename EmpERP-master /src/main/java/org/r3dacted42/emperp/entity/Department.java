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
    @Column(name = "department_id")
    private Long departmentId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long capacity;

    @OneToMany(mappedBy = "department")
    List<Employee> employees;
}
