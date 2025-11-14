package com.example.laboratorio10.service;

import com.example.laboratorio10.entity.Becario;
import com.example.laboratorio10.repository.BecarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BecarioServiceImpl implements BecarioService {

    private final BecarioRepository becarioRepository;

    public BecarioServiceImpl(BecarioRepository becarioRepository) {
        this.becarioRepository = becarioRepository;
    }

    @Override
    public List<Becario> listarTodos() {
        return becarioRepository.findAll();
    }

    @Override
    public Optional<Becario> obtenerPorId(Integer id) {
        return becarioRepository.findById(id);
    }

    @Override
    public Becario crear(Becario becario) {
        becario.setId(null); // asegura inserción
        return becarioRepository.save(becario);
    }

    @Override
    public Becario actualizar(Becario becario) {
        if (becario.getId() == null) return null;

        boolean existe = becarioRepository.existsById(becario.getId());
        if (!existe) return null;

        return becarioRepository.save(becario);
    }

    @Override
    public void eliminarPorId(Integer id) {
        becarioRepository.deleteById(id);
    }
}
