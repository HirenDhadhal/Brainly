export interface User {
  name: string;
  email: string;
  id: string;
  image: string;
  password?: string;
}

type contentType = "Document" | "Links" | "X" | "Linkedin" | "Youtube" |"Instagram";

export interface ContentItem {
    _id: string,
    link: string,
    type: contentType
    title: string,
    userId: User,
    canDelete?: boolean
}