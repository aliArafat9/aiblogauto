import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    content: String,
    category: String,
    excerpt: String,
    imageUrl: String,
    published: { type: Boolean, default: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

BlogSchema.index({
  title: "text",
  content: "text",
  category: "text",
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
