import React from "react";

function PostTry() {
  return (
    <div className="post">
      <header className="flex between container">
        <div className="flex">
          <img
            src="./assets/users/user-1.jpeg"
            alt="User"
            className="photo is-status"
          />
          <div className="column">
            <h2 className="username">Oliver Sykes</h2>
            <small className="post-info">
              5h &bullet; <i className="bi bi-people-fill"></i>
            </small>
          </div>
        </div>
        <i className="bi bi-three-dots menu"></i>
      </header>
      <div className="contents">
        <div className="container">
          <p className="text">Then and now photos of Bring Me The Horizon</p>
        </div>
        <div className="images">
          <img
            src="./assets/images/image-1.jpeg"
            alt="Image 1"
            className="image"
          />
          <img
            src="./assets/images/image-2.jpeg"
            alt="Image 2"
            className="image"
          />
          <img
            src="./assets/images/image-3.jpeg"
            alt="Image 3"
            className="image"
          />
          <img
            src="./assets/images/image-4.jpeg"
            alt="Image 4"
            className="image"
          />
        </div>
      </div>
      <div className="flex between center gray bortom-1 pb-13 container">
        <div className="flex center reacts">
          <img src="./assets/reacts/like.svg" className="react" alt="Like" />
          <img src="./assets/reacts/love.svg" className="react" alt="Love" />
          <p>230</p>
        </div>
        <p>60 Comments &bullet; 33 Shares</p>
      </div>
      <ul className="actions gray">
        <li>
          <i className="bi bi-hand-thumbs-up"></i> Like
        </li>
        <li>
          <i className="bi bi-chat"></i> Comment
        </li>
        <li>
          <i className="bi bi-share"></i> Share
        </li>
      </ul>
    </div>
  );
}

export default PostTry;
