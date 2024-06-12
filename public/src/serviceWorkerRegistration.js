// src/serviceWorkerRegistration.js

// This optional code is used to register a service worker.
// It provides offline capabilities for your app.

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      // Register the service worker
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );

          // Update the service worker immediately
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // New or updated content is available, show a prompt or update logic
                  console.log("New content is available; please refresh.");
                } else {
                  // Content is now available offline!
                  console.log("Content is available offline!");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
