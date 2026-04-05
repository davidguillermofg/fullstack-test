package com.gapsi.ecommerce.service;

import com.gapsi.ecommerce.dto.PagedResponse;
import com.gapsi.ecommerce.dto.SupplierRequest;
import com.gapsi.ecommerce.dto.SupplierResponse;
import com.gapsi.ecommerce.entity.Supplier;
import com.gapsi.ecommerce.exception.DuplicateSupplierNameException;
import com.gapsi.ecommerce.exception.SupplierNotFoundException;
import com.gapsi.ecommerce.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;

    @Transactional(readOnly = true)
    public PagedResponse<SupplierResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), 100));
        Page<Supplier> result = supplierRepository.findAll(pageable);
        List<SupplierResponse> content = result.getContent().stream()
                .map(SupplierResponse::fromEntity)
                .toList();
        return new PagedResponse<>(
                content,
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
    }

    @Transactional
    public SupplierResponse create(SupplierRequest request) {
        if (supplierRepository.existsByNombreIgnoreCase(request.getNombre().trim())) {
            throw new DuplicateSupplierNameException(request.getNombre());
        }
        Supplier s = new Supplier();
        s.setNombre(request.getNombre().trim());
        s.setRazonSocial(request.getRazonSocial().trim());
        s.setDireccion(request.getDireccion().trim());
        Supplier saved = supplierRepository.save(s);
        return SupplierResponse.fromEntity(saved);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!supplierRepository.existsById(id)) {
            throw new SupplierNotFoundException(id);
        }
        supplierRepository.deleteById(id);
    }
}
