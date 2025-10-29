async function loadNewsFeed(jsonPath = './json/news.json', containerSelector = '.news-feed') {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to fetch ${jsonPath}: ${response.statusText}`);

        const posts = await response.json();
        const feed = document.querySelector(containerSelector);
        if (!feed) throw new Error(`Container not found: ${containerSelector}`);



        feed.innerHTML = '';
        posts.forEach((post, index) => {
            const box = document.createElement('div');
            box.classList.add('content-box');
            const formattedText = post.text.replace(/\n/g, '<br>');
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const postNumber = posts.length - index;
            box.innerHTML = `
          <div class="content-title">${post.title}</div>
          <hr>
          <div class="content-subtitle">
          <div class="post-number">Letter #${postNumber}</div> <div class="content-date">${formattedDate}</div> 
          </div>
        </div>
          <hr>
          <div class="content-details">
            <div class="content-text"><p>${formattedText}</p></div>
            <div class="content-media">
              <img class="content-img" src="${post.image}" alt="${post.title}">
            </div>
          </div>`;
            feed.appendChild(box);
        });
    } catch (error) {
        console.error('Error-NF', error);
    }
}

function initNewsFeed() {
  loadNewsFeed();
}

window.addEventListener('DOMContentLoaded', initNewsFeed);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    initNewsFeed();
  }
});

