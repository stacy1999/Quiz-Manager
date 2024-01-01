package com.synopticProject.quizManager.controller;
import com.synopticProject.quizManager.model.Answer;
import com.synopticProject.quizManager.service.AnswerService;
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
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService service;

    public AnswerController(AnswerService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE, value ="/{questionId}")
    public ResponseEntity<List<Answer>> getAllAnswers(@PathVariable("questionId") Long questionId){
        final List<Answer> answers = service.getAnswers(questionId);
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Long> create(final @RequestBody Answer answer){
        final Long newAnswerId = service.createAnswer(answer.getAnswer(), answer.getQuestionId());
        return ResponseEntity.status(HttpStatus.CREATED).body(newAnswerId);
    }

    @PutMapping(produces = APPLICATION_JSON_VALUE, value = "/{id}")
    public ResponseEntity<Answer> updateAnswer(@PathVariable("id") Long id, final @RequestBody Answer answer){
        final Answer newAnswer = service.updateAnswer(id, answer.getAnswer(), answer.getQuestionId());
        return new ResponseEntity<>(newAnswer, HttpStatus.OK);
    }

    @DeleteMapping(produces = APPLICATION_JSON_VALUE, value ="/{id}")
    public ResponseEntity<HttpStatus> deleteAnswer(@PathVariable("id") Long id){
        service.deleteAnswer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
