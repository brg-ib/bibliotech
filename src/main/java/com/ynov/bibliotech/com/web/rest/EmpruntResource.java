package com.ynov.bibliotech.com.web.rest;

import com.ynov.bibliotech.com.domain.Emprunt;
import com.ynov.bibliotech.com.service.EmpruntService;
import com.ynov.bibliotech.com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ynov.bibliotech.com.domain.Emprunt}.
 */
@RestController
@RequestMapping("/api")
public class EmpruntResource {

    private final Logger log = LoggerFactory.getLogger(EmpruntResource.class);

    private static final String ENTITY_NAME = "emprunt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmpruntService empruntService;

    public EmpruntResource(EmpruntService empruntService) {
        this.empruntService = empruntService;
    }

    /**
     * {@code POST  /emprunts} : Create a new emprunt.
     *
     * @param emprunt the emprunt to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new emprunt, or with status {@code 400 (Bad Request)} if the emprunt has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/emprunts")
    public ResponseEntity<Emprunt> createEmprunt(@RequestBody Emprunt emprunt) throws URISyntaxException {
        log.debug("REST request to save Emprunt : {}", emprunt);
        if (emprunt.getId() != null) {
            throw new BadRequestAlertException("A new emprunt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emprunt result = empruntService.save(emprunt);
        return ResponseEntity.created(new URI("/api/emprunts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /emprunts} : Updates an existing emprunt.
     *
     * @param emprunt the emprunt to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated emprunt,
     * or with status {@code 400 (Bad Request)} if the emprunt is not valid,
     * or with status {@code 500 (Internal Server Error)} if the emprunt couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/emprunts")
    public ResponseEntity<Emprunt> updateEmprunt(@RequestBody Emprunt emprunt) throws URISyntaxException {
        log.debug("REST request to update Emprunt : {}", emprunt);
        if (emprunt.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Emprunt result = empruntService.save(emprunt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, emprunt.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /emprunts} : get all the emprunts.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of emprunts in body.
     */
    @GetMapping("/emprunts")
    public ResponseEntity<List<Emprunt>> getAllEmprunts(Pageable pageable) {
        log.debug("REST request to get a page of Emprunts");
        Page<Emprunt> page = empruntService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /emprunts/:id} : get the "id" emprunt.
     *
     * @param id the id of the emprunt to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the emprunt, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/emprunts/{id}")
    public ResponseEntity<Emprunt> getEmprunt(@PathVariable Long id) {
        log.debug("REST request to get Emprunt : {}", id);
        Optional<Emprunt> emprunt = empruntService.findOne(id);
        return ResponseUtil.wrapOrNotFound(emprunt);
    }

    /**
     * {@code DELETE  /emprunts/:id} : delete the "id" emprunt.
     *
     * @param id the id of the emprunt to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/emprunts/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        log.debug("REST request to delete Emprunt : {}", id);
        empruntService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
