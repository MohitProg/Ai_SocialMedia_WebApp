import { type Response, type Request } from "express";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../config/Prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const EditProfile = async (req: Request, res: Response) => {
  console.log("EditProfile");

  const { name, backgroundImage, profileImage, Biodescription, location } =
    req.body;

  if (
    !name ||
    !backgroundImage ||
    !profileImage ||
    !Biodescription ||
    !location
  ) {
    throw new ApiError(409, "Please Fill All The Fields");
  }

  await prisma.userAuth.update({
    where: {
      id: Number(req.id),
    },
    data: {
      name,
    },
  });

  await prisma.userDetails.upsert({
    where: {
      userId: Number(req.id),
    },

    create: {
      backgroundImage: "",
      profileImage: "",
      Biodescription,
      location,
      ...req.body,
    },

    update: {
      backgroundImage: "",
      profileImage: "",
      Biodescription,
      location,
      ...req.body,
    },
  });

  throw new ApiResponse(200, "Profile Updated Successfully");
};

export const GetProfile = async (req: Request, res: Response) => {
  const userId = req.id;

  if (!userId) {
    throw new ApiError(404, "User Not Found");
  }

  let user = await prisma.userAuth.findUnique({
    where: {
      id: Number(userId),
    },

    select: {
      name: true,
      userDetails: true,
    },

    // include: {
    //   userDetails: true,
    // },
  });

  throw new ApiResponse(200, "Profile Fetched Successfully", user);
};

export const UserFollowers = async (req: Request, res: Response) => {
  const userId = req.id;

  if (!userId) {
    throw new ApiError(404, "User Not Found");
  }

  const userFollowerdata = await prisma.userAuth.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      followers: {
        select: {
          followerId: true,
        },
      },
    },
  });

  const followerLenght = userFollowerdata?.followers.length;

  throw new ApiResponse(200, "Followers Fetched Successfully", followerLenght);
};

export const UserFollowing = async (req: Request, res: Response) => {
  const userId = req.id;

  if (!userId) {
    throw new ApiError(404, "User Not Found");
  }

  const userFollowingdata = await prisma.userAuth.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });

  const followerLenght = userFollowingdata?.following.length;

  throw new ApiResponse(200, "Followers Fetched Successfully", followerLenght);
};

export const UserPosts = async (req: Request, res: Response) => {
  const userId = req.id;

  if (!userId) {
    throw new ApiError(404, "User Not Found");
  }

  const userPostdata = await prisma.posts.findMany({
    where: {
      userId: Number(userId),
    },
  });

  throw new ApiResponse(200, "Posts Fetched Successfully", userPostdata);
};

// export const UserLikes = async (req: Request, res: Response) => {};

// export const UserBookmarks = async (req: Request, res: Response) => {}

// export const UserSaved = async (req: Request, res: Response) => {};
