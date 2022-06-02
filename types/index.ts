export type UserType = {
  id: string;
  // role: string;
  // email: string;
  name: string; // this property is not added by supabase, we have to add this ourself.
};

export type PostType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  created_at: string;
  profiles: { name: string };
  comments: Comment[];
};

export type Comment = {
  id: string; // TODO: this should be string
  author_id: string;
  profiles: { name: string };
  created_at: string;
  content: string;
};
