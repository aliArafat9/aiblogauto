"use server";

export const generateImageUnsplash = async (prompt: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${prompt}&client_id=${process.env.UNSPLASH_API_KEY}`
    );
    const data = await response.json();
    console.log("data from unsplash ===> ", data);
    return data.urls.regular;
  } catch (err: any) {
    console.log("unsplash error", err);
    throw new Error(err);
  }
};
