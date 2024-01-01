package com.synopticProject.quizManager.repository;
import com.synopticProject.quizManager.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByQuestionTitle(final String question);

    Optional<List<Question>> findByQuizId(final Long quizId);
//    Optional<Question> findByTitleAndQuizId(final String title, final Long quizId);
}
