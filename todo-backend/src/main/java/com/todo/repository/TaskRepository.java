package com.todo.repository;

import com.todo.model.Task;
import com.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByUser(User user);

    List<Task> findByUserAndStatus(User user, String status);

    List<Task> findByUserId(UUID userId);
}
