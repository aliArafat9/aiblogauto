import { getBlogBySlugFromDb } from "@/actions/blog";
import { BlogType } from "@/utils/types";
import BlogView from "@/components/blog/blog-view";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

function stripHtmlAndTruncate(text: string, maxLength: number): string {
  // remove html tags
  const strippedText = text.replace(/(<([^>]+)>)/gi, "");
  // remove line breaks and extra white spaces
  const cleanedText = strippedText.replace(/\s+/g, " ").trim();
  // truncate the text if necessary
  return cleanedText.length > maxLength
    ? cleanedText.substring(0, maxLength) + "..."
    : cleanedText;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlugFromDb(slug);
  const imageUrl = blog?.imageUrl || "/images/logo.png";
  const shortDescription = stripHtmlAndTruncate(blog?.content || "", 160);

  // define image dimensions for better SEO
  const imageWidth = 1200;
  const imageHeight = 630;

  return {
    title: `${blog?.title} - ${blog.category}`,
    description: shortDescription,
    openGraph: {
      title: `${blog?.title} - ${blog.category}`,
      description: shortDescription,
      type: "article",
      url: `${process.env.DOMAIN}/blogs/${slug}`,
      site_name: process.env.DOMAIN,
      images: [
        {
          url: imageUrl,
          alt: blog.title,
          type: "image/jpg",
          width: imageWidth,
          height: imageHeight,
        },
      ],
    },
    canonical: `${process.env.DOMAIN}/blogs/${slug}`,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlugFromDb(slug);

  return (
    <div className="container mx-auto px-4 py-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* main blog content */}
        <div className="w-full">
          <BlogView blog={blog} />
        </div>
      </div>
    </div>
  );
}
