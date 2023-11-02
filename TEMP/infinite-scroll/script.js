// Load posts 20 at a time
const QUANTITY = 20;

// Start with first post
let counter = 1;

const fakeRequest = (data, time) => new Promise((res) => setTimeout(() => res(data), time));

const fetchPosts = async (start, end) => {
    // Generate list of posts
    const data = [];
    for (let i = start; i <= end; i++) {
        data.push(`Post #${i}`);
    }

    return fakeRequest(data, 1000);
};

/**
 * Load next set of posts.
 */
const load = async () => {
  // Set start and end post numbers, and update counter
  const start = counter;
  const end = start + QUANTITY - 1;
  counter = end + 1;

  // Get new posts and add posts
  const posts = await fetchPosts(start, end);
  posts.forEach(addPost);
};

/**
 * Add a new post with given contents to DOM.
 */
const addPost = (contents) => {
  // Create new post
  const post = document.createElement('div');
  post.className = 'post';
  post.innerHTML = `${contents} <button class="hide">Hide</button>`;

  // Add post to DOM
  document.querySelector('#posts').append(post);
};

const onHideButtonClick = (evt) => {
    // Find what was clicked on
    const element = evt.target;

    // Check if the user clicked on a hide button
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', () => {
            element.parentElement.remove();
        });
    }
};

const onScroll = async (evt) => {
  if (evt.currentTarget.innerHeight + evt.currentTarget.scrollY >= document.body.offsetHeight) {
    load();
  }
};

// If hide button is clicked, delete the post
document.addEventListener('click', onHideButtonClick);

// If scrolled to bottom, load the next 20 posts
window.addEventListener('scroll', onScroll)

// Load first posts
load();
