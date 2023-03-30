package dev.myBoard.controller;

import dev.myBoard.domain.Post;
import dev.myBoard.service.PostService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @CrossOrigin
    @GetMapping("board")
    @ResponseBody
    public List<Post> getlList() {
        return postService.findAllPosts();
    }
    @CrossOrigin
    @PostMapping("posts")
    @ResponseBody
    public Post createPost(@RequestBody Post post) {
        return postService.savePost(post);
    }

    @CrossOrigin
    @GetMapping("posts/{id}")
    @ResponseBody
    public Post getOne(@PathVariable("id") Long id) {
        return postService.findPostById(id);
    }

    @CrossOrigin
    @PutMapping("update")
    @ResponseBody
    public Post update(@RequestBody Post post){
        return postService.savePost(post);
    }

    @CrossOrigin
    @DeleteMapping("posts/{id}")
    public void deletePost(@PathVariable("id") Long id) {
        postService.deletePost(postService.findPostById(id));
    }

    @CrossOrigin
    @PostMapping("posts/{id}/auth")
    @ResponseBody
    public boolean isAuth(@PathVariable("id") Long id, @RequestBody PostAuthRequestDto requestDto) {
        Post post = postService.findPostById(id);
        if (post.getPassword().equals(requestDto.getPassword())) {
            return true;
        }
        return false;
    }


}
class PostAuthRequestDto {
    String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

