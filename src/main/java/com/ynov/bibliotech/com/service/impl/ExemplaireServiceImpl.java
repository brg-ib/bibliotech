package com.ynov.bibliotech.com.service.impl;

import com.ynov.bibliotech.com.service.ExemplaireService;
import com.ynov.bibliotech.com.domain.Exemplaire;
import com.ynov.bibliotech.com.repository.ExemplaireRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Exemplaire}.
 */
@Service
@Transactional
public class ExemplaireServiceImpl implements ExemplaireService {

    private final Logger log = LoggerFactory.getLogger(ExemplaireServiceImpl.class);

    private final ExemplaireRepository exemplaireRepository;

    public ExemplaireServiceImpl(ExemplaireRepository exemplaireRepository) {
        this.exemplaireRepository = exemplaireRepository;
    }

    @Override
    public Exemplaire save(Exemplaire exemplaire) {
        log.debug("Request to save Exemplaire : {}", exemplaire);
        return exemplaireRepository.save(exemplaire);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Exemplaire> findAll() {
        log.debug("Request to get all Exemplaires");
        return exemplaireRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Exemplaire> findOne(Long id) {
        log.debug("Request to get Exemplaire : {}", id);
        return exemplaireRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Exemplaire : {}", id);
        exemplaireRepository.deleteById(id);
    }
}
