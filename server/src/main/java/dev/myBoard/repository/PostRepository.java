package dev.myBoard.repository;

import dev.myBoard.domain.Post;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

public class PostRepository {

    private final EntityManager em;

    public PostRepository(EntityManager em) {
        this.em = em;
    }

    public Post save(Post post) {
        if (post.getId() == null) {
            em.persist(post);
            return post;
        }
        return em.merge(post);
    }

    public List<Post> findAll() {
        List<Post> result = em.createQuery("select p from Post p", Post.class)
                .getResultList();
        return result;
    }

    public Post findById(Long id) {
        return em.find(Post.class, id);
    }

    public void delete(Post post) {
        em.remove(post);
    }

}
