async function addPost(event) {
  event.preventDefault();

  //assign variables to what is currently in the named fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value;

  //A fetch post request is then sent to the API posts route with the  data
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //If response is valid, reroute the user to the Dashboard to see their new post
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post').addEventListener('submit', addPost);