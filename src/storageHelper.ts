function debounce(func: () => void, delay: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

function saveToLocalStorage() {
  const savedPrompt = document.getElementById(
    "savedPrompt"
  ) as HTMLTextAreaElement;
  localStorage.setItem("savedPromptContent", savedPrompt.value || "");
}

function fillFromLocalStorage() {
  const savedPrompt = document.getElementById(
    "savedPrompt"
  ) as HTMLTextAreaElement;
  const savedContent = localStorage.getItem("savedPromptContent");
  if (savedContent && savedPrompt) {
    savedPrompt.value = savedContent;
  }
}

function copyToClipboard() {
  const savedPrompt = document.getElementById("savedPrompt");
  if (savedPrompt && savedPrompt instanceof HTMLTextAreaElement) {
    navigator.clipboard.writeText(savedPrompt.value);
  }
}

function clearContent() {
  const savedPrompt = document.getElementById("savedPrompt");
  if (savedPrompt && savedPrompt instanceof HTMLTextAreaElement) {
    savedPrompt.value = "";
    localStorage.removeItem("savedPromptContent");
  }
}

export {
  debounce,
  saveToLocalStorage,
  fillFromLocalStorage,
  copyToClipboard,
  clearContent,
};
