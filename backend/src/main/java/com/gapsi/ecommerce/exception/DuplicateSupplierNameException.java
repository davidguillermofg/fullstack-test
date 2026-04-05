package com.gapsi.ecommerce.exception;

public class DuplicateSupplierNameException extends RuntimeException {

    public DuplicateSupplierNameException(String nombre) {
        super("Ya existe un proveedor con el nombre: " + nombre);
    }
}
