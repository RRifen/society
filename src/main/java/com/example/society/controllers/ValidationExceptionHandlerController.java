package com.example.society.controllers;

import com.example.society.exceptions.AppError;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

@RestControllerAdvice
@RequiredArgsConstructor
public class ValidationExceptionHandlerController {
    private final SimpleDateFormat timestampDateFormat;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringJoiner sj = new StringJoiner("; ");
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            sj.add(fieldName + ": " + errorMessage);
        });

        return ResponseEntity.badRequest().body(new AppError(
                HttpStatus.BAD_REQUEST.value(),
                sj.toString(),
                timestampDateFormat.format(new Date())
        ));
    }
}
