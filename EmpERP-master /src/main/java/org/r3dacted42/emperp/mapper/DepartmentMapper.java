package org.r3dacted42.emperp.mapper;

import org.r3dacted42.emperp.dto.DepartmentRequest;
import org.r3dacted42.emperp.dto.DepartmentResponse;
import org.r3dacted42.emperp.entity.Department;
import org.springframework.stereotype.Service;

@Service
public class DepartmentMapper {
    public Department toEntity(DepartmentRequest request) {
        return Department.builder()
                .name(request.name())
                .capacity(request.capacity())
                .build();
    }
    public DepartmentResponse toResponse(Department entity, Long strength) {
        return new DepartmentResponse(
                entity.getDepartmentId(),
                entity.getName(),
                entity.getCapacity(),
                strength
        );
    }
}
