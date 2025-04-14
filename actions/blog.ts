"use server";
import db from "@/utils/db";
import slugify from "slugify";
import { authCheckAction } from "@/actions/auth";
import { BlogType } from "@/utils/types";
import Blog from "@/models/blog";

const generateExcerpt = (content: string) => {
  const maxLength = 160;

  return content.length > maxLength
    ? content.slice(0, maxLength) + "..."
    : content;
};

export const createBlogDb = async (data: BlogType) => {
  try {
    const { user } = await authCheckAction();

    if (!user) {
      throw new Error("You need to be logged in to create a blog");
    }

    const slug = slugify(data.title, { lower: true, strict: true });
    await db();

    // check if the slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      throw new Error("Blog with this title already exists");
    }

    const excerpt = generateExcerpt(data.content);

    const blog = await Blog.create({
      ...data,
      slug,
      excerpt,
      user: user._id,
    });

    return JSON.parse(JSON.stringify(blog));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const getBlogByIdDb = async (id: string) => {
  try {
    await db();
    const blog = await Blog.findById(id).populate("user", "name email");
    if (!blog) {
      throw new Error("Blog not found");
    }
    return JSON.parse(JSON.stringify(blog));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const updateBlogDb = async (id: string, data: BlogType) => {
  try {
    await db();

    const { user } = await authCheckAction();
    if (!user) {
      throw new Error("You need to be logged in to update a blog");
    }

    // generate excerpt
    const excerpt = generateExcerpt(data.content);

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
          excerpt,
          slug: slugify(data.title, { lower: true, strict: true }),
        },
      },
      { new: true }
    ).lean();

    return JSON.parse(JSON.stringify(blog));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const getUserBlogsDb = async (page: number, limit: number) => {
  try {
    await db();

    const { user } = await authCheckAction();

    if (!user) {
      throw new Error("You need to be logged in to get your blogs");
    }

    const [blogs, totalCount] = await Promise.all([
      Blog.find({ user: user._id })
        // .select("-content")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "name username"),
      Blog.countDocuments({ user: user._id }),
    ]);

    return { blogs: JSON.parse(JSON.stringify(blogs)), totalCount };
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const getAllBlogsDb = async (page: number, limit: number) => {
  try {
    await db();

    const [blogs, totalCount] = await Promise.all([
      Blog.find({ published: true })
        .select("-content")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "name username"),
      Blog.countDocuments({ published: true }),
    ]);

    return { blogs: JSON.parse(JSON.stringify(blogs)), totalCount };
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const getBlogBySlugFromDb = async (slug: string) => {
  try {
    await db();

    const blog = await Blog.findOne({ slug })
      .populate("user", "name username createdAt")
      .lean();

    if (!blog) {
      throw new Error("Blog not found");
    }

    return JSON.parse(JSON.stringify(blog));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};

export const searchBlogsDb = async (query: string) => {
  try {
    await db();

    const blogs = await Blog.find({
      $text: { $search: query },
      published: true,
    })
      .select("-content")
      .sort({ score: { $meta: "textScore" } }) // sort by relevance
      .limit(100)
      .exec();

    return JSON.parse(JSON.stringify(blogs));

    return JSON.parse(JSON.stringify(blogs));
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Internal server error");
  }
};
