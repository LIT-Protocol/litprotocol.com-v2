/* Ghost supplies search, subscription, comments, and card interactions. */
document.querySelectorAll('[data-copy-link]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('[data-copy-status]');
    try {
      await navigator.clipboard.writeText(window.location.href);
      status.textContent = 'Article link copied.';
      button.textContent = 'Link copied';
      window.setTimeout(() => {
        button.textContent = 'Copy link ↗';
      }, 2200);
    } catch {
      status.textContent =
        'Copy the address from your browser to share this article.';
      button.textContent = 'Copy the address above';
    }
  });
});
