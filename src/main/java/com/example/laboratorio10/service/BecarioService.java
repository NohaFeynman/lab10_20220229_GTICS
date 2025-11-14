package com.example.laboratorio10.service;

import com.example.laboratorio10.entity.Becario;

import java.util.List;
import java.util.Optional;

public interface BecarioService {

    List<Becario> listarTodos();

    Optional<Becario> obtenerPorId(Integer id);

    Becario crear(Becario becario);

    Becario actualizar(Becario becario);

    void eliminarPorId(Integer id);
}
