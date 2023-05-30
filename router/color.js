window.addEventListener('load', function() {
  const storedColor = localStorage.getItem('themeColor');
  if (storedColor) {
    changeThemeColor(storedColor);
    const activeButton = document.getElementById(storedColor.slice(1));
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
});

function changeThemeColor(color) {
  const root = document.documentElement;
  root.style.setProperty('--color-blue', color);
  root.style.setProperty('--color-green', color);
  root.style.setProperty('--color-red', color);

  localStorage.setItem('themeColor', color);

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.classList.remove('active'));
  const activeButton = document.getElementById(color.slice(1));
  if (activeButton) {
    activeButton.classList.add('active');
  }
}