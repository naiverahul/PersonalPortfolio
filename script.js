/**
 * Portfolio Website JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  feather.replace(); // Initialize Feather icons

  // Page-specific logic
  if (document.querySelector('.skill-list')) {
    animateSkillBars();
  }
  if (document.getElementById('blog-container')) {
    handleBlogLogic();
  }

  revealOnScroll(); // General reveal effect for all sections
});

function animateSkillBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.fill').forEach(bar => observer.observe(bar));
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    observer.observe(section);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-section { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
    .revealed { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);
}

function handleBlogLogic() {
  const listContainer = document.getElementById('post-list-container');
  const listingSection = document.getElementById('blog-listing');
  const detailContainer = document.getElementById('post-detail-container');
  
  if (typeof blogPosts === 'undefined' || blogPosts.length === 0) {
    listContainer.innerHTML = "<p>No blog posts found.</p>";
    return;
  }
  
  function displayPostList() {
    listingSection.style.display = 'block';
    detailContainer.style.display = 'none';
    
    listContainer.innerHTML = blogPosts.map(post => `
      <article class="post">
        <div class="post-date"><span>${post.date}</span></div>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <div class="post-tags">${post.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a href="#" class="read-more" data-url="${post.url}">Read more <i data-feather="arrow-right"></i></a>
      </article>
    `).join('');
    
    feather.replace();
    
    document.querySelectorAll('.read-more').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        displayPostDetail(e.currentTarget.getAttribute('data-url'));
      });
    });
  }
  
  async function displayPostDetail(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Post not found');
      const postContent = await response.text();
      
      detailContainer.innerHTML = `
        <a class="back-to-posts"><i data-feather="arrow-left"></i> Back to all posts</a>
        ${postContent}
      `;
      
      listingSection.style.display = 'none';
      detailContainer.style.display = 'block';
      
      feather.replace();
      window.scrollTo(0, 0);
      
      detailContainer.querySelector('.back-to-posts').addEventListener('click', e => {
        e.preventDefault();
        displayPostList();
      });
      
    } catch (error) {
      console.error('Error fetching blog post:', error);
      detailContainer.innerHTML = "<p>Sorry, this post could not be loaded.</p>";
    }
  }

  displayPostList(); 
}