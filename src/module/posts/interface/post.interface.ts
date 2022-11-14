export interface PostKey {
  id: string;
}

export interface Posts extends PostKey {
  title: string;
  content: string;
  user_id: string,
  categories_ids: string[],
}
