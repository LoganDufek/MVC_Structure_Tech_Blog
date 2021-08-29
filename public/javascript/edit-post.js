async function editPost(event) {
  event.preventDefault();

  //assign variables to what is currently in the fields, which are then updated by the user
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('.post-content').value.trim();
  
  // ID is set so that it is whatever post is being edited
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  //A fetch put request is then sent to the API posts route with the updated data
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //If response is valid, reroute the user to the Dashboard to see their updated post
  if (response.ok) {
      console.log("ok")
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}


document.querySelector('.save-post-btn').addEventListener('click', editPost);