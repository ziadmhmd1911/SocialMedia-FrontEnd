import axios from "axios";
const API = axios.create({ baseURL: "https://socialmedia-m94x.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`./posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("./posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const signIn = (fromData) => API.post("/user/signin", fromData);
export const signUp = (fromData) => API.post("/user/signup", fromData);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
