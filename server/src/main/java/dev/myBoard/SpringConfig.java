package dev.myBoard;

import dev.myBoard.repository.PostRepository;
import dev.myBoard.service.PostService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class SpringConfig {
    private final EntityManager em;

    public SpringConfig(EntityManager em) {
        this.em = em;
    }

    @Bean
    public PostService postService() {
        return new PostService(jpaPostRepository());
    }

    @Bean
    public PostRepository jpaPostRepository() {
        return new PostRepository(em);
    }

}
