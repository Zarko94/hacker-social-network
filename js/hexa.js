let session = new Session();
session_id = session.getSession();
if (session_id !== "") {
  async function populateUserData() {
    let user = new User();
    user = await user.get(session_id);

    document.querySelector("#username").innerText = user["username"];
    document.querySelector("#email").innerText = user["email"];

    document.querySelector("#korisnicko_ime").value = user["username"];
    document.getElementById("edit_email").value = user["email"];
  }

  populateUserData();
} else {
  window.location.href = "/";
}

document.querySelector(".logout").addEventListener("click", (e) => {
  e.preventDefault();

  session.destroySession();
  window.location.href = "/";
});
document.querySelector(".editAccount").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", () => {
  document.querySelector(".custom-modal").style.display = "none";
});
document.querySelector("#editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let user = new User();
  user.username = document.querySelector("#korisnicko_ime").value;
  user.email = document.querySelector("#edit_email").value;
  user.edit();
});
document.querySelector("#deleteProfile").addEventListener("click", (e) => {
  e.preventDefault();

  let text = "da li ste sigurni ?";

  if (confirm(text) === true) {
    let user = new User(session_id);
    user.delete();
  }
});

document.querySelector("#postForm").addEventListener("submit", (e) => {
  e.preventDefault();

  async function createPost() {
    let content = document.querySelector("#postContent").value;

    let post = new Post();
    post.post_content = content;
    post = await post.create();

    document.querySelector("#postContent").value = "";

    let current_user = new User();
    current_user = await current_user.get(session_id);

    let delete_post_html = "";
    if (session_id === post.user_id) {
      delete_post_html = `<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>`;
    }

    document.querySelector("#allPostsWrapper").innerHTML = `
    <div class="single-post" data-post_id="${post.id}">
<div class="post-content">${post.content}</div>
<div class="post-actions">
<p><b>Author:</b> ${current_user.username}</p>
<div>
<button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes} </span>Likes</button>
<button class="comment-btn" onclick="commentPost(this)">Comments</button>
${delete_post_html}
</div>


<div class="post-comments">
<form>
<input placeholder="napisi komentar.." type="text">
<button onclick="commentPostSubmit(event)">Comment</button>
</form>
</div> 
</div>   `;
  }
  createPost();
});

const commentPostSubmit = (event) => {};

const removeMyPost = (el) => {};
