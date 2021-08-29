async function commentFormHandler(event) {
  event.preventDefault();

  //assign variables to what is currently in the named fields
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  // ID is set so that it is whatever post is being viewed
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  //If variable is valid, A fetch post request is then sent to the API posts route with the  data

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //If response is valid, the page is reloaded so the user can see their comment posted to the post
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);




