package com.synopticProject.quizManager.repository;
import com.synopticProject.quizManager.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Optional<Quiz> findByTitle(final String title);
}
