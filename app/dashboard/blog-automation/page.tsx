"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
import { generateContentAi } from "@/actions/googleAi";
import { Loader2Icon, Bot } from "lucide-react";
import toast from "react-hot-toast";
import { generateImageUnsplash } from "@/actions/unsplash";


export default function BlogAutomation() {
  //state
  const [category, setCategory] = useState("");
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState({ name: "", status: false });

  //functions
  const generateCategories = async () => {
    // setSuggestedCategories(["Tech", "Health", "Business", "Science"]);
    setLoading({ name: "categories", status: true });

    try {
      const { categories } = await generateContentAi(`
        Suggest 20 of the most popular and relevant categories for a blogging application.
        Please return the response  in JSON format like this:
        {
          "categories": ["Tech", "Health", "Business", "Science"]
        }  
      `);
      setSuggestedCategories(categories);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ name: "categories", status: false });
    }
  };

  const generateTitles = async () => {
    // setSuggestedTitles([
    //   "AI-Powered Blog Post AI-Powered Blog Post AI-Powered Blog Post AI-Powered Blog Post",
    //   "Sustainable Lifestyle Sustainable Lifestyle Sustainable Lifestyle ",
    //   "Innovative Ideas ",
    //   "Evolution of Technology Evolution of Technology  ",
    // ]);

    if (!category) {
      toast.error("Please write or select a category first");
      return;
    }
    setLoading({ name: "titles", status: true });

    try {
      const { titles } = await generateContentAi(`
        Suggets 3 SEO=optimized blog post titles for the category "${category}".
        The titles should be catchy, relevant and   designed to attract traffic.
        Please return the response  in JSON format like this:
        {
          "titles": ["Future of Tech", "How to Stay Healthy in 2025", "Starting Business in 2025"]
        } 
      `);
      setSuggestedTitles(titles);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ name: "titles", status: false });
    }
  };

  const generateContent = async () => {
    // setContent(
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum"
    // );
    if (!title) {
      toast.error("Please write or select a title first");
      return;
    }
    setLoading({ name: "content", status: true });

    try {
      const { content } =  await generateContentAi(`
        Write an SEO-optimized blog post on the topic: "${title}".
        The content must:
        - Use semantic HTML for structuring, including headings (<h2>, <h3>), paragraphs (<p>), bullet points (<ul>, <li>), 
          and <code> blocks only where relevant.
        - Exclude <DOCTYPE>, <html>, <body>, <head>, <header>, <nav>, <footer>, <article>, <section>, <main>, and <h1> tags.
        - Include a summary section at the end but no "keywords" section.
        Return the response in JSON format like this: { "content": "Your blog post content here." }.
        Do not add any navigation menus, copyright footers, or unnecessary elements.
      `);
      setContent(content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ name: "content", status: false });
    }
  };

  const generateImage = async () => {
    // setImage("https://via.placeholder.com/600");
    if (!category || !title || !content) {
      toast.error(
        "Please fill in the category, title and content fields first"
      );
      return;
    }

    setLoading({ name: "image", status: true });

    try {
      const url = await generateImageUnsplash(title);
      setImage(url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading({ name: "image", status: false });
    }
  };

  const handleSubmit = () => {
    // TODO: Save the blog post to the database
    console.log("Blog post saved:", { category, title, content, image });
  };

  return (
    <div>
      <Card className="w-full max-w-6xl mx-auto my-5">
        <CardHeader>
          <CardTitle>Create a New Blog Post</CardTitle>
        </CardHeader>

        {/* <pre>{JSON.stringify(suggestedCategories, null, 2)}</pre> */}

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
                className="flex-1 "
              />
              <Button
                onClick={generateCategories}
                variant={"outline"}
                className="flex-1"
                disabled={loading.name === "categories" && loading.status}
              >
                {loading.name === "categories" && loading.status ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Bot />
                )}
                Get Categories Suggestions form AI
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedCategories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 ">
            <Label htmlFor="title">Title</Label>

            <div className="flex gap-2">
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog post title"
                className="flex-1 "
              />
              <Button
                onClick={generateTitles}
                variant={"outline"}
                className="flex-1"
                disabled={loading.name === "titles" && loading.status}
              >
                {loading.name === "titles" && loading.status ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Bot />
                )}
                Get Titles Suggestions form AI
              </Button>
            </div>
            {suggestedTitles.length > 0 && (
              <div className="mt-2">
                <Label>Suggested Titles:</Label>
                <div className="grid gap-2 mt-2 grid-cols-1 md:grid-cols2 lg:grid-cols-3">
                  {suggestedTitles.map((t) => (
                    <div
                      key={t}
                      className={`justify-start p-2 cursor-pointer ${
                        title === t
                          ? "border rounded-md bg-black text-white dark:bg-white dark:text-black"
                          : ""
                      }`}
                      onClick={() => setTitle(t)}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cotent">Content</Label>

            <div className="flex gap-2">
            <Button
                onClick={generateContent}
                variant={"outline"}
                className="w-full"
                disabled={loading.name === "content" && loading.status}
              >
                {loading.name === "content" && loading.status ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Bot />
                )}
                Get Content Suggestions form AI
              </Button>
            </div>

            {/* {markdown editor} */}
            <div className="pt-5">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>

            <div className="flex gap-2 items-center">
              <Button
                className="flex-1"
                onClick={generateImage}
                variant="outline"
                disabled={loading.name === "image" && loading.status}
              >
                {loading.name === "image" && loading.status ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <Bot />
                )}
                Generate Image
              </Button>

              {image && (
                <div className="flex-1">
                  <img
                    src={image}
                    alt="Featured Image"
                    className="mt-2 max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={handleSubmit} className="flex-1">
              Submit Blog Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
