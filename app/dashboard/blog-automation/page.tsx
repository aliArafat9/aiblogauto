"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

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
      "Innovative Ideas Innovative Ideas Innovative Ideas Innovative Ideas Innovative Ideas Innovative Ideas Innovative Ideas",
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
