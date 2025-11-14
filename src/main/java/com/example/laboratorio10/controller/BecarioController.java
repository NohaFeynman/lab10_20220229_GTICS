package com.example.laboratorio10.controller;

import com.example.laboratorio10.entity.Becario;
import com.example.laboratorio10.service.BecarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/becario")
@CrossOrigin(origins = "*")
public class BecarioController {

    private static final String API_KEY_ESPERADA = "MULTIVERSO-KEY";

    private final BecarioService becarioService;

    public BecarioController(BecarioService becarioService) {
        this.becarioService = becarioService;
    }

    private boolean validarApiKey(String apiKey) {
        return apiKey != null && apiKey.equals(API_KEY_ESPERADA);
    }

    private ResponseEntity<Object> apiKeyInvalida() {
        Map<String, Object> rpta = new HashMap<>();
        rpta.put("result", "failure");
        rpta.put("msg", "API KEY inválida");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(rpta);
    }


    @GetMapping
    public ResponseEntity<?> listar(
            @RequestHeader(name = "X-API-KEY", required = false) String apiKey) {

        if (!validarApiKey(apiKey)) return apiKeyInvalida();

        return ResponseEntity.ok(becarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(
            @PathVariable Integer id,
            @RequestHeader(name = "X-API-KEY", required = false) String apiKey) {

        if (!validarApiKey(apiKey)) return apiKeyInvalida();

        Optional<Becario> becario = becarioService.obtenerPorId(id);

        if (becario.isEmpty()) {
            Map<String, Object> rpta = new HashMap<>();
            rpta.put("result", "failure");
            rpta.put("msg", "Becario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rpta);
        }

        return ResponseEntity.ok(becario.get());
    }

    @PostMapping
    public ResponseEntity<?> crear(
            @RequestBody Becario becario,
            @RequestHeader(name = "X-API-KEY", required = false) String apiKey) {

        if (!validarApiKey(apiKey)) return apiKeyInvalida();

        if (becario.getNombreCompleto() == null || becario.getNombreCompleto().isBlank()
                || becario.getEmail() == null || becario.getEmail().isBlank()) {

            Map<String, Object> rpta = new HashMap<>();
            rpta.put("result", "failure");
            rpta.put("msg", "Nombre completo y email son obligatorios");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rpta);
        }

        Becario creado = becarioService.crear(becario);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping
    public ResponseEntity<?> actualizar(
            @RequestBody Becario becario,
            @RequestHeader(name = "X-API-KEY", required = false) String apiKey) {

        if (!validarApiKey(apiKey)) return apiKeyInvalida();

        if (becario.getId() == null) {
            Map<String, Object> rpta = new HashMap<>();
            rpta.put("result", "failure");
            rpta.put("msg", "ID es obligatorio para actualizar");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rpta);
        }

        Becario actualizado = becarioService.actualizar(becario);

        if (actualizado == null) {
            Map<String, Object> rpta = new HashMap<>();
            rpta.put("result", "failure");
            rpta.put("msg", "No existe un becario con ese ID");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rpta);
        }

        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(
            @PathVariable Integer id,
            @RequestHeader(name = "X-API-KEY", required = false) String apiKey) {

        if (!validarApiKey(apiKey)) return apiKeyInvalida();

        Optional<Becario> existe = becarioService.obtenerPorId(id);

        if (existe.isEmpty()) {
            Map<String, Object> rpta = new HashMap<>();
            rpta.put("result", "failure");
            rpta.put("msg", "No existe un becario con ese ID");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rpta);
        }

        becarioService.eliminarPorId(id);

        Map<String, Object> rpta = new HashMap<>();
        rpta.put("result", "success");
        rpta.put("msg", "Becario eliminado");

        return ResponseEntity.ok(rpta);
    }
}
