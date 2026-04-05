package com.gapsi.ecommerce.repository;

import com.gapsi.ecommerce.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Patrón de diseño: <strong>Repository</strong> — abstrae el acceso a datos y
 * centraliza consultas sobre la entidad {@link Supplier}.
 */
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    boolean existsByNombreIgnoreCase(String nombre);

    Optional<Supplier> findByNombreIgnoreCase(String nombre);
}
