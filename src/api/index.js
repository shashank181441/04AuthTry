import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const baseURL = 'http://127.0.0.1:8080/api/v1';

let accessToken = localStorage.getItem('accessToken') || '';

const apiClient = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${accessToken}` },
});

apiClient.interceptors.request.use(async (req) => {

    accessToken = localStorage.getItem('accessToken') || '';
    req.headers.Authorization = `Bearer ${accessToken}`;


  if (!accessToken) {
    console.log("you must log in first");
    return req;
  }

  const user = jwtDecode(accessToken);

  const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 0;


  if (!isExpired) return req;

  const refreshToken = localStorage.getItem('refreshToken');
  console.log(refreshToken);
  let response;

  try {
    response = await axios.post(`/users/refresh-token`, {
      refreshToken,
    })
  } catch (error) {
    console.error("refreshToken error", error );
  }
  console.log(response);
  if (!response) {
    console.log("You must log in");
    localStorage.clear()
  }

  localStorage.setItem('accessToken', response.data.data.accessToken);
  localStorage.setItem('refreshToken', response.data.data.refreshToken);

  req.headers.Authorization = `Bearer ${response.data.accessToken}`;

  return req;
}, error => {
  return Promise.reject(error);
});

// Function to register a new user
const registerUser = async (userData) => {
  // Send a POST request to register the user
  return await apiClient.post("/users/register", userData).catch(err=>{throw err})
};

// Function to log in a user
const loginUser =  async (userData) => {
  // Send a POST request to log in the user
  const res = await apiClient.post("/users/login", userData)
  localStorage.setItem('accessToken', res.data.data.accessToken);
  localStorage.setItem('refreshToken', res.data.data.refreshToken);
  return res
  
};

// Function to log out a user
const logoutUser = async () => {
  // Send a POST request to log out the user
  let res;
try {
  res = await apiClient.post("/users/logout")
  localStorage.clear()
} catch (error) {
  res=error
}
  return res
};

const getCurrentUser = async () => {
  return await apiClient.get("/users/current-user")
}

// Function to get the user's own profile
const getProfile = async () => {
  return await apiClient.get("/social-media/profile");
}

// Function to update the user's profile
const updateProfile = ({ children }) => {
  return apiClient.patch("/social-media/profile", { children })
}

// Function to get the profile of another user by username
const getTheirProfile = async (username) => {
  return await apiClient.get(`/social-media/profile/u/${username}`)
}

// Function to update the cover image
const updateCoverImage = (imageData) => {
  return apiClient.patch("/social-media/profile/cover-image", imageData);
}


// Function to get posts with pagination
const getPosts = async(page=1, limit=20) => {
  return await apiClient.get(`/social-media/posts?page=${page}&limit=${limit}`)
}

// Function to create a new post
const createPost = async ( formData ) => {
  // const formData = new FormData();
  // formData.append("content", content);
  // tags.forEach((tag, ind) => {
  //   formData.append(`tag[${ind}]`, tag);
  // });
  // images.forEach((image, index) => {
  //   formData.append(`images[${index}]`, image); // Use array notation to send multiple images
  // });
  // console.log(formData.content);


  await apiClient
  .post("/social-media/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  console.log("resp", resp);
  return resp
};

// Function to get a post by its ID
const getPostById = (postId) => {
  return apiClient.get(`/social-media/posts/${postId}`)
}

// Function to delete a post by its ID
const deletePostById = (postId) => {
  return apiClient.get(`/social-media/posts/${postId}`)
}

// Function to get the authenticated user's posts
const getMyPosts = () => {
  return apiClient.get("/social-media/posts/get/my")
}


// Get posts by username
const getPostsByUsername = (username) => {
  return apiClient.get(`/social-media/posts/get/u/${username}`);
};

// Get posts by tag
const getPostsByTag = (tag) => {
  return apiClient.get(`/social-media/posts/get/t/${tag}`);
};

// Remove post image
const removePostImage = (postId, imageId) => {
  return apiClient.patch(`/social-media/posts/remove/image/${postId}/${imageId}`);
};

// Like or unlike post
const likeOrUnlikePost = async (postId) => {
  return await apiClient.post(`/social-media/like/post/${postId}`);
};

// Like or unlike comment
const likeOrUnlikeComment = async (commentId) => {
  return await apiClient.post(`/social-media/like/comment/${commentId}`);
};

// Get post comments
const getPostComments = async (postId) => {
  return await apiClient.get(`/social-media/comments/post/${postId}`);
};

// Add comment
const addComment = async (postId, commentData) => {
  return await apiClient.post(`/social-media/comments/post/${postId}`, commentData);
};

// Delete comment
const deleteComment = (commentId) => {
  return apiClient.delete(`/social-media/comments/${commentId}`);
};

// Update comment
const updateComment = (commentId, updatedData) => {
  return apiClient.patch(`/social-media/comments/${commentId}`, updatedData);
};

// Get bookmarked posts
const getBookmarkedPosts = () => {
  return apiClient.get('/social-media/bookmarks');
};

// Add or remove bookmark
const addOrRemoveBookmark = (postId) => {
  return apiClient.post(`/social-media/bookmarks/${postId}`);
};

// Get user's followers list
const getFollowersList = async (username) => {
  return await apiClient.get(`/social-media/follow/list/followers/${username}`);
};

// Get user's following list
const getFollowingList = async (username) => {
  return await apiClient.get(`/social-media/follow/list/following/${username}`);
};

// Follow or unfollow user
const followOrUnfollowUser = (userId) => {
  return apiClient.post(`/social-media/follow/${userId}`);
};

export {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  getTheirProfile,
  updateCoverImage,
  getPosts,
  createPost,
  getPostById,
  deletePostById,
  getMyPosts,
  getPostsByUsername,
  getPostsByTag,
  removePostImage,
  likeOrUnlikePost,
  likeOrUnlikeComment,
  getPostComments,
  addComment,
  deleteComment,
  updateComment,
  getBookmarkedPosts,
  addOrRemoveBookmark,
  getFollowersList,
  getFollowingList,
  followOrUnfollowUser
};




export default apiClient;
