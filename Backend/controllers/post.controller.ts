import { type Request, type Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../config/Prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const AddPost = async (req: Request, res: Response) => {
  const { description, images, videos } = req.body;

  if (!description) {
    throw new ApiError(400, "Description is required");
  }

  const newPost = await prisma.posts.create({
    data: {
      description,
      images,
      videos,
      userId: Number(req.id),
    },
  });

  throw new ApiResponse(200, "Post Created Successfully", newPost);
};

export const EditPost = async (req: Request, res: Response) => {
  const userId = req.id;
  const postId = req.params.id;
  const { description, images, videos } = req.body;

  const existPost = await prisma.posts.findFirst({
    where: {
      id: Number(postId),
      userId: Number(userId),
    },
  });

  if (!existPost) {
    throw new ApiError(404, "Post Not Found");
  }

  await prisma.posts.update({
    where: {
      id: Number(postId),
      userId: Number(userId),
    },
    data: {
      description,
      images,
      videos,
    },
  });

  throw new ApiResponse(200, "Post Updated Successfully");
};

export const DeletePost = async (req: Request, res: Response) => {
  const userId = req.id;
  const postId = req.params.id;

  const existPost = await prisma.posts.findFirst({
    where: {
      id: Number(postId),
      userId: Number(userId),
    },
  });

  if (!existPost) {
    throw new ApiError(404, "Post Not Found");
  }

  await prisma.posts.delete({
    where: {
      id: Number(postId),
    },
  });

  throw new ApiResponse(200, "Post Deleted Successfully");
};

export const GetPost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const postdata = await prisma.posts.findUnique({
    where: {
      id: Number(postId),
    },
  });

  throw new ApiResponse(200, "Post Fetched Successfully", postdata);
};

export const GetPosts = async (req: Request, res: Response) => {};

export const LikeDislikePost = async (req: Request, res: Response) => {
  const userId = req.id;

  const postId = req.params.id;

  if (!postId) {
    throw new ApiError(404, "Post Not Found");
  }

  let message = null;

  const existPostLike = await prisma.postLikes.findFirst({
    where: {
      postId: Number(postId),
      userId: Number(userId),
    },
  });

  if (existPostLike) {
    await prisma.postLikes.delete({
      where: {
        id: existPostLike.id,
      },
    });

    message = "Post Unliked Successfully";
  } else {
    await prisma.postLikes.create({
      data: {
        postId: Number(postId),
        userId: Number(userId),
      },
    });

    message = "Post Liked Successfully";
  }

  throw new ApiResponse(200, message);
};

export const BookmarkPost = async (req: Request, res: Response) => {
  const userId = req.id;
  const postId = req.params.id;

  if (!postId) {
    throw new ApiError(404, "Post Not Found");
  }

  let message = null;

  const existBookmark = await prisma.postbookmarks.findFirst({
    where: {
      postId: Number(postId),
      userId: Number(userId),
    },
  });

  if (existBookmark) {
    await prisma.postbookmarks.delete({
      where: {
        id: existBookmark.id,
      },
    });

    message = "Post Remove Successfully";
  } else {
    await prisma.postbookmarks.create({
      data: {
        postId: Number(postId),
        userId: Number(userId),
      },
    });

    message = "Post Save Successfully";
  }

  throw new ApiResponse(200, message);
};
