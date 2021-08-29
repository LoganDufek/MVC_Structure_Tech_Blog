async function deletePost(event) {
  event.preventDefault();

  //id is set to grab the id that's in the search bar, and it will match the ID of the post to be deleted
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  //fetch request set to access Delete route
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });
  //If response is valid, reroute the user to the Dashboard to see their updated list of posts
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

//Calls asyncrinous function on delete button click
document.querySelector('.delete-post-btn').addEventListener('click', deletePost);
