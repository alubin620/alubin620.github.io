// Name of the cache
const CACHE_NAME = 'my-cache';
// Files to cache
const urlsToCache = [
  '/ct-v01.html',
  '/manifest.json'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Load the user input data from local storage on page load
self.addEventListener('load', () => {
  const savedTitle = localStorage.getItem('countdownTitle');
  const savedDate = localStorage.getItem('countdownDate');

  if (savedTitle) {
      document.getElementById('newTitle').value = savedTitle;
  }

  if (savedDate) {
      document.getElementById('newDate').value = savedDate;
  }

  // Trigger countdown update with the loaded data
  updateCountdownWithUserInput();
});

// Function to update countdown with user input
function updateCountdownWithUserInput() {
  const newTitle = document.getElementById('newTitle').value;
  const newDate = new Date(document.getElementById('newDate').value).getTime();

  // Save user input data to local storage
  localStorage.setItem('countdownTitle', newTitle);
  localStorage.setItem('countdownDate', newDate);

  // Update title if provided
  if (newTitle) {
      document.querySelector('.countdown-title').textContent = newTitle;
  }

  // Update target date if provided
  if (newDate) {
      targetDate = newDate;
  }

  // Manually trigger countdown update
  updateCountdown();
}
