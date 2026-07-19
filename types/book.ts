export type Book = {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  publishedDate?: string;
  categories: string[];
  previewLink?: string;
};
