package com.gapsi.ecommerce.exception;

public class SupplierNotFoundException extends RuntimeException {

    public SupplierNotFoundException(Long id) {
        super("Proveedor no encontrado: " + id);
    }
}
