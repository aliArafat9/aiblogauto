"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";

export default function BlogAutomation() {
  //state
  const [category, setCategory] = useState("");
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  //functions
  const generateCategories = () => {
    setSuggestedCategories(["Tech", "Health", "Business", "Science"]);
  };
  const generateTitles = () => {
    setSuggestedTitles([
      "AI-Powered Blog Post AI-Powered Blog Post AI-Powered Blog Post AI-Powered Blog Post",
      "Sustainable Lifestyle Sustainable Lifestyle Sustainable Lifestyle ",
      "Innovative Ideas ",
      "Evolution of Technology Evolution of Technology  ",
    ]);
  };
  const generateContent = () => {
    setContent(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum"
    );
  };
  const generateImage = () => {
    setImage("https://via.placeholder.com/600");
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
              >
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
              >
                Get Title Suggestions form AI
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
              >
                Get Content with AI
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
                variant={"outline"}
              >
                Generate Image
              </Button>

              <div className="flex-1">
                {image && (
                  <img
                    src={image}
                    alt="Featured Image"
                    className="mt-2 max-w-full h-auto rounded-lg "
                  />
                )}
              </div>
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
