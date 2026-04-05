package com.gapsi.ecommerce.config;

import com.gapsi.ecommerce.entity.Supplier;
import com.gapsi.ecommerce.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Carga datos de demostración solo si la tabla está vacía (evita duplicados al reiniciar).
 */
@Component
@Profile("!test")
@RequiredArgsConstructor
public class SampleDataLoader implements CommandLineRunner {

    private final SupplierRepository supplierRepository;

    @Override
    public void run(String... args) {
        if (supplierRepository.count() > 0) {
            return;
        }
        List<Supplier> samples = List.of(
                supplier("Alpha Distribuciones", "Alpha S.A. de C.V.", "Av. Reforma 100, CDMX"),
                supplier("Beta Supply", "Beta Comercial SA", "Insurgentes Sur 250, CDMX"),
                supplier("Gamma Logistics", "Gamma Logística SRL", "Eje Central 45, Guadalajara"),
                supplier("Delta Foods", "Delta Alimentos", "Blvd. Kukulcán, Cancún"),
                supplier("Epsilon Tech", "Epsilon Tecnología", "Santa Fe 300, CDMX"),
                supplier("Zeta Retail", "Zeta Retail Group", "Madero 88, Monterrey"),
                supplier("Eta Imports", "Eta Importaciones", "Puerto 12, Veracruz"),
                supplier("Theta Wholesale", "Theta Mayoreo", "López Mateos 400, GDL"),
                supplier("Iota Fresh", "Iota Frescos", "Mercado Central, Puebla"),
                supplier("Kappa Tools", "Kappa Herramientas", "Zona Industrial, Querétaro"),
                supplier("Lambda Pharma", "Lambda Farmacéutica", "Circuito Médicos 10, CDMX"),
                supplier("Mu Packaging", "Mu Empaques", "Toluca Industrial"),
                supplier("Nu Organic", "Nu Orgánicos", "Chiapas 22, San Cristóbal"),
                supplier("Xi Electronics", "Xi Electrónica", "Polanco, CDMX"),
                supplier("Omicron Textiles", "Omicron Textil", "Puebla Textil"),
                supplier("Pi Beverages", "Pi Bebidas", "Cuautitlán"),
                supplier("Rho Furniture", "Rho Muebles", "León, GTO"),
                supplier("Sigma Auto", "Sigma Autopartes", "Saltillo"),
                supplier("Tau Chemicals", "Tau Químicos", "Coatzacoalcos"),
                supplier("Upsilon Paper", "Upsilon Papel", "Monterrey Sur")
        );
        supplierRepository.saveAll(samples);
    }

    private static Supplier supplier(String nombre, String razon, String dir) {
        Supplier s = new Supplier();
        s.setNombre(nombre);
        s.setRazonSocial(razon);
        s.setDireccion(dir);
        return s;
    }
}
