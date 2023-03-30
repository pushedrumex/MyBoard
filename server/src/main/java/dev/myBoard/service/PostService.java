package dev.myBoard.service;

import dev.myBoard.domain.Post;
import dev.myBoard.repository.PostRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Post findPostById(Long id) {
        return postRepository.findById(id);
    }

    public void deletePost(Post post) {
        postRepository.delete(post);
    }
}
