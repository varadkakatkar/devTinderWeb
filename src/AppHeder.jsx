import { useState, useEffect } from "react";
import { THEMES } from "./constants";
import NavBar from "./NavBar.jsx";

function AppHeader() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="flex justify-end items-center px-4 py-2 bg-base-200 border-b border-base-300">
        <select
          className="select select-bordered select-sm"
          value={theme}
          onChange={handleThemeChange}
        >
          {Object.entries(THEMES).map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <NavBar />
    </>
  );
}

export default AppHeader;
