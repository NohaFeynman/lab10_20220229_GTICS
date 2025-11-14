package com.example.laboratorio10.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "becario")
public class Becario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_completo", nullable = false, length = 200)
    private String nombreCompleto;

    @Column(name = "carrera", nullable = false, length = 200)
    private String carrera;

    @Column(name = "universidad", nullable = false, length = 200)
    private String universidad;

    @Column(name = "email", nullable = false, length = 150, unique = true)
    private String email;

    @Column(name = "pais", nullable = false, length = 100)
    private String pais;

    @Column(name = "estado", nullable = false, length = 50)
    private String estado; // Activo / Egresado

    // ===== Constructores =====

    public Becario() {
    }

    public Becario(Integer id, String nombreCompleto, String carrera, String universidad,
                   String email, String pais, String estado) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.carrera = carrera;
        this.universidad = universidad;
        this.email = email;
        this.pais = pais;
        this.estado = estado;
    }

    // ===== Getters y Setters =====

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getUniversidad() {
        return universidad;
    }

    public void setUniversidad(String universidad) {
        this.universidad = universidad;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
