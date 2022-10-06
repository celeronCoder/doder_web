import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  const isDark = theme.colorScheme === "dark";
  return {
    title: {
      color: isDark ? theme.colors.indigo![4] : theme.colors.indigo![7],
      userSelect: "none",
      cursor: "pointer",
    },
    completedTodo: {
      textDecoration: "line-through",
      color: theme.colors.gray[5],
    },
    main: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    description: {
      color: isDark ? theme.colors.gray![6] : theme.colors.gray![5],
    },
  };
});
