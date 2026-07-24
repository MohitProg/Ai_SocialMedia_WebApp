import Express from "express";
import {
  AddPost,
  BookmarkPost,
  DeletePost,
  EditPost,
  GetPost,
  GetPosts,
  LikeDislikePost,
} from "../controllers/post.controller.js";

const router = Express();

router.get("/get-post/:id", GetPost);
router.get("/get-posts", GetPosts);
router.post("/add-post", AddPost);
router.put("/edit-post/:id", EditPost);
router.put("/like-dislike-post/:id", LikeDislikePost);
router.put("/bookmark-post/:id", BookmarkPost);
router.delete("/delete-post/:id", DeletePost);

export default router;
