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

let selectedIndex = 0;
let lastKeyTime = 0;
const doublePressThreshold = 300;

const renderOption = (option: AIOption, index: number) => {
  const optionContainer = document.createElement("div");
  optionContainer.className = "optionContainer";
  optionContainer.dataset.index = index.toString();

  const img = document.createElement("img");
  img.src = option.icon;
  img.className = "companyIcon";
  optionContainer.appendChild(img);

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "detailsContainer";

  const title = document.createElement("p");
  title.textContent = option.company;
  detailsContainer.appendChild(title);

  optionContainer.appendChild(detailsContainer);

  optionContainer.addEventListener("click", () => {
    window.open(option.website, "_blank");
  });

  document.getElementById("options")?.appendChild(optionContainer);
};

const updateSelection = (newIndex: number) => {
  const optionElements = document.querySelectorAll(".optionContainer");

  if (selectedIndex !== -1) {
    optionElements[selectedIndex]?.classList.remove("selected");
  }

  selectedIndex = newIndex;

  if (selectedIndex !== -1) {
    optionElements[selectedIndex]?.classList.add("selected");
    optionElements[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    updateSelection((selectedIndex + 1) % ai_agg.length);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    updateSelection((selectedIndex - 1 + ai_agg.length) % ai_agg.length);
  } else if (event.key === "Enter" && selectedIndex !== -1) {
    window.open(ai_agg[selectedIndex].website, "_blank");
  } else if ((event.ctrlKey || event.metaKey) && event.key === "c") {
    event.preventDefault();
    copyToClipboard();
  } else if (event.key === "d") {
    const currentTime = new Date().getTime();
    if (currentTime - lastKeyTime < doublePressThreshold) {
      event.preventDefault();
      clearContent();
    }
    lastKeyTime = currentTime;
  }
});

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

const addEventListenerToRandomButton = () => {
  document.getElementById("randomButton")?.addEventListener("click", () => {
    const randomIdx = Math.floor(Math.random() * ai_agg.length);
    window.open(ai_agg[randomIdx].website, "_blank");
  });
};

function main() {
  ai_agg.forEach((a, index) => renderOption(a, index));
  updateSelection(0);
  setupPromptTextBox();
  addEventListenerToRandomButton();
}
main();
