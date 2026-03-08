import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  switch (action.type) {
    case "DELETE-POST":
      return currentPostList.filter((post) => post.id !== action.payload.postId);

    case "ADD-POST":
      return [action.payload.newPost, ...currentPostList];

    default:
      return currentPostList;
  }
};


const PostListProvider = ({ children }) => {
  const [postList, dispatchPosts] = useReducer(postListReducer, DEFAULT_POST_LIST);

const addPost = (post) => {
  const newPost = {
    id: Date.now().toString(), // unique ID
    userId: post.userId,
    body: post.body,
    title: post.title,
    tags: post.tags,
    reactions: 0,
  };

  dispatchPosts({
    type: "ADD-POST",
    payload: { newPost },
  });
};


 const deletePost = (postId) => {
  dispatchPosts({
    type: "DELETE-POST", // Fix the case here
    payload: {
      postId,
    },
  });
};


  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    title: "A Slow Morning",
    id: "1",
    body: "Waking up without an alarm, sipping tea near the window, journaling thoughts—slow mornings remind us that peace is a luxury we can create.",
    reactions: 10,
    userId: "user123",
    tags: ["#healing", "#mentalhealth", "#growth"],
  },
  {
    title: "Things That Spark Joy in My Daily Routine",
    id: "2",
    body:
      "Fresh stationery, lo-fi playlists, clean sheets, long walks, and laughing with my sibling. The little things add up to happiness.!",
    reactions: 50,
    userId: "user123",
    tags: ["#travel", "#bali", "#vacations", "#trip", "#fun"],
  },
];

export default PostListProvider;
