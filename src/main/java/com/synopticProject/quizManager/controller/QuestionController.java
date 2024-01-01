package com.synopticProject.quizManager.controller;
import com.synopticProject.quizManager.model.Question;
import com.synopticProject.quizManager.service.QuestionService;
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
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService service;

    public QuestionController(QuestionService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value ="question/{questionId}")
    public ResponseEntity<Optional<Question>> getQuestionById(@PathVariable("questionId") Long questionId){
        final Optional<Question> question = service.getQuestionById(questionId);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Question>> getAllQuestions(){
        final List<Question> questions = service.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value ="/{quizId}")
    public ResponseEntity<List<Question>> getQuestionsByQuiz(@PathVariable("quizId") Long quizId){
        final List<Question> question = service.getQuestionByQuizId(quizId);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> create(final @RequestBody Question question){
        final Long newQuestionId = service.createQuestion(question.getQuestionTitle(), question.getQuizId());
        return ResponseEntity.status(HttpStatus.CREATED).body(newQuestionId);
    }

    @PutMapping(produces = APPLICATION_JSON_VALUE, value = "/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable("id") Long id, final @RequestBody Question question){
        final Question newQuestion = service.updateQuestion(id, question.getQuestionTitle(), question.getQuizId());
        return new ResponseEntity<>(newQuestion, HttpStatus.OK);
    }

    @DeleteMapping(produces = APPLICATION_JSON_VALUE, value ="/{id}")
    public ResponseEntity<HttpStatus> deleteQuestion(@PathVariable("id") Long id){
        service.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
