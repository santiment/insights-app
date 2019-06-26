import { writable } from "svelte/store";

let darkModeLS;
let darkModeDefault;

if (process.browser) {
  darkModeLS = localStorage.getItem("darkMode");
}

if (darkModeLS) {
  darkModeDefault = JSON.parse(darkModeLS);

  if (darkModeDefault) {
    document.body.classList.add("night-mode");
  }
}

function createDarkModeToggle() {
  const { subscribe, set } = writable(darkModeDefault);

  return {
    subscribe,
    toggle: () => {
      const res = document.body.classList.toggle("night-mode");
      set(res);
      localStorage.setItem("darkMode", res);
    }
  };
}

export const darkMode = createDarkModeToggle();
