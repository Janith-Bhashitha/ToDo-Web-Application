package com.todo.service;

import com.todo.dto.TaskRequest;
import com.todo.model.Task;
import com.todo.model.User;
import com.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasksByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public List<Task> getTasksByUserId(UUID userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getTasksByStatus(User user, String status) {
        return taskRepository.findByUserAndStatus(user, status);
    }

    public Task createTask(TaskRequest request, User user) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDefinition(request.getDefinition());
        task.setDueDate(request.getDueDate());
        task.setStatus(request.getStatus() != null ? request.getStatus() : "pending");
        task.setReminder(request.getReminder() != null ? request.getReminder() : false);
        task.setUser(user);

        return taskRepository.save(task);
    }

    public Optional<Task> getTaskById(UUID id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(UUID id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDefinition(request.getDefinition());
        task.setDueDate(request.getDueDate());
        task.setStatus(request.getStatus());
        task.setReminder(request.getReminder());

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(UUID id, String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(UUID id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.deleteById(id);
    }
}
