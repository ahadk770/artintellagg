import {
  clearContent,
  copyToClipboard,
  debounce,
  fillFromLocalStorage,
  saveToLocalStorage,
} from "./storageHelper.js";

interface AIOption {
  company: string;
  website: string;
  icon: string;
}

const ai_agg: AIOption[] = [
  { company: "xAI", website: "https://grok.com/", icon: "./public/grok.svg" },
  {
    company: "Open AI",
    website: "https://chatgpt.com/",
    icon: "./public/openai.svg",
  },
  {
    company: "Anthropic",
    website: "https://claude.ai/new",
    icon: "./public/claude.svg",
  },
  {
    company: "Google Gemini",
    website: "https://gemini.google.com/",
    icon: "./public/gemini.svg",
  },
];

const renderOption = (option: AIOption) => {
  const optionContainer = document.createElement("div");
  optionContainer.className = "optionContainer";

  const img = document.createElement("img");
  img.src = option.icon;
  img.className = "companyIcon";
  optionContainer.appendChild(img);

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "detailsContainer";

  const title = document.createElement("p");
  title.textContent = option.company;
  detailsContainer.appendChild(title);

  //   const url = document.createElement("p");
  //   url.textContent = option.website;
  //   detailsContainer.appendChild(url);

  optionContainer.appendChild(detailsContainer);

  optionContainer.addEventListener("click", () => {
    window.open(option.website, "_blank");
  });

  document.getElementById("options")?.appendChild(optionContainer);
};

const addEventListenerToRandomButton = () => {
  document.getElementById("randomButton")?.addEventListener("click", () => {
    const randomIdx = Math.floor(Math.random() * ai_agg.length);
    window.open(ai_agg[randomIdx].website, "_blank");
  });
};

ai_agg.forEach((a) => renderOption(a));
addEventListenerToRandomButton();

const setupPromptTextBox = () => {
  document
    .getElementById("savedPrompt")
    ?.addEventListener("input", debounce(saveToLocalStorage, 500));

  window.addEventListener("load", fillFromLocalStorage);

  document
    .getElementById("savedPromptToClipboard")
    ?.addEventListener("click", copyToClipboard);
  document
    .getElementById("clearSavedPrompt")
    ?.addEventListener("click", clearContent);
};
setupPromptTextBox();
