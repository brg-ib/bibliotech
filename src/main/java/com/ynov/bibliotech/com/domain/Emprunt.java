package com.ynov.bibliotech.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Emprunt.
 */
@Entity
@Table(name = "emprunt")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Emprunt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_emprunt")
    private Instant dateEmprunt;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprunts", allowSetters = true)
    private Utilisateur utilisateur;

    @ManyToOne
    @JsonIgnoreProperties(value = "emprunts", allowSetters = true)
    private Exemplaire exemplaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateEmprunt() {
        return dateEmprunt;
    }

    public Emprunt dateEmprunt(Instant dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
        return this;
    }

    public void setDateEmprunt(Instant dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Emprunt utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Exemplaire getExemplaire() {
        return exemplaire;
    }

    public Emprunt exemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
        return this;
    }

    public void setExemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Emprunt)) {
            return false;
        }
        return id != null && id.equals(((Emprunt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Emprunt{" +
            "id=" + getId() +
            ", dateEmprunt='" + getDateEmprunt() + "'" +
            "}";
    }
}
