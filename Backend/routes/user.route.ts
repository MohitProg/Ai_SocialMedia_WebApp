import express from "express";
import {
  EditProfile,
  UserFollowers,
  UserFollowing,
  UserPosts,
} from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express();

// get route
router.get("/get-profile", asyncHandler(EditProfile));
router.get("/user-followers", asyncHandler(UserFollowers));
router.get("/user-following", asyncHandler(UserFollowing));
router.get("/user-posts", asyncHandler(UserPosts));
// router.get("/user-likes", asyncHandler(EditProfile));
// router.get("/user-bookmarks", asyncHandler(EditProfile));
// router.get("/user-saved", asyncHandler(EditProfile));

//  update routes
router.put("/edit-profile", asyncHandler(EditProfile));

export default router;
