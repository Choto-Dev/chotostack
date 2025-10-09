"use client";

import { useTheme } from "@choto/ui/components/theme";
import Icons from "@choto/ui/icons";
import { Button } from "@choto/ui/ui/button";

export default function SwitchThemeButton() {
  const { theme, systemTheme, setTheme } = useTheme();

  function changeTheme() {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    const newThemeMatchesSystem = newTheme === systemTheme;
    setTheme(newThemeMatchesSystem ? "system" : newTheme);
  }

  return (
    <Button className="w-fit cursor-pointer" onClick={() => changeTheme()}>
      <Icons.LucideIcon.Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Icons.LucideIcon.Moon className="dark:-rotate-90 absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
