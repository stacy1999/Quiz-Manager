package com.synopticProject.quizManager.controller;
import com.synopticProject.quizManager.model.Quiz;
import com.synopticProject.quizManager.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService service;

    public QuizController(QuizService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Quiz>> getAllQuizzes(){
        final List<Quiz> quizzes = service.getAllQuizzes();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value ="/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable("id") Long id){
        final Quiz quiz = service.getQuiz(id);
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Long> create(final @RequestBody Quiz quiz){
        final Long newQuizId = service.createQuiz(quiz.getTitle());
        return ResponseEntity.status(HttpStatus.CREATED).body(newQuizId);
    }

    @PutMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE, value = "/{id}")
    public ResponseEntity<Quiz> updateQuiz(final @PathVariable Long id, final @RequestBody Quiz quiz){
        final Quiz quizToBeUpdated = service.updateQuiz(id, quiz.getTitle());
        return new ResponseEntity<>(quizToBeUpdated, HttpStatus.OK);
    }

    @DeleteMapping(produces = APPLICATION_JSON_VALUE, value ="/{id}")
    public ResponseEntity<HttpStatus> deleteQuiz(@PathVariable("id") long id){
        service.deleteQuiz(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
