import {
  ActionIcon,
  Card,
  Checkbox,
  Collapse,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { Todo } from "@prisma/client";
import { IconEdit, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useStyles } from "./styles";
import { motion } from "framer-motion";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

export const TodoCard: React.FC<{ todo: Todo; idx: number }> = ({
  todo,
  idx,
}) => {
  const [completed, setCompleted] = useState(todo.completed);
  const trpcCtx = trpc.useContext();
  const completeMutation = trpc.useMutation(["todo.toggleComplete"], {
    onSuccess() {
      trpcCtx.invalidateQueries("todo.getAll");
    },
  });

  const deleteMutation = trpc.useMutation(["todo.delete"], {
    onSuccess() {
      trpcCtx.invalidateQueries("todo.getAll");
    },
  });
  const { classes } = useStyles();
  const [showDescription, setShowDescription] = useState(false);

  // setState functions don't take effect immediately and are asynchronous, they usually dispatch a trigger or action.
  // more info [here](https://reactjs.org/docs/hooks-reference.html#usestate:~:text=The%20setState%20function%20is%20used%20to%20update%20the%20state.%20It%20accepts%20a%20new%20state%20value%20and%20enqueues%20a%20re%2Drender%20of%20the%20component.).
  const complete = async () => {
    setCompleted(!completed);
    await completeMutation.mutateAsync({
      id: todo.id,
      completed: !completed,
    });
  };

  const openDeleteConfirmationModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is irreversible. Are your sure you want to delete?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Keep it!" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await deleteMutation.mutateAsync({ id: todo.id });
        showNotification({
          title: "To-Do item deleted.",
          message:
            "To-Do item was deleted successfully, this action is irreversible.",
          color: "yellow",
          autoClose: 5000,
          icon: <IconTrash />,
          radius: "lg",
        });
      },
    });

  return (
    <Card
      withBorder
      shadow="lg"
      radius="lg"
      style={{ width: "50%", minWidth: "380px" }}
      component={motion.div}
      initial={{ translateY: 100, opacity: 0, scale: 0.5 }}
      animate={{ translateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
    >
      <Card.Section p="md" pb={0} className={classes.main}>
        <Group>
          <Checkbox
            size="md"
            checked={todo.completed}
            onChange={() => complete()}
          />
          <Title
            className={classes.title}
            style={{ userSelect: "none", cursor: "pointer" }}
            order={4}
            onClick={() => setShowDescription(!showDescription)}
          >
            {todo.title}
          </Title>
        </Group>
        <Group>
          <ActionIcon variant="subtle" onClick={openDeleteConfirmationModal}>
            <IconTrash size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconEdit size={18} />
          </ActionIcon>
        </Group>
      </Card.Section>
      <Card.Section
        p="md"
        pb={0}
        component={Collapse}
        in={showDescription}
        transitionDuration={500}
        transitionTimingFunction="ease-out"
      >
        <Text pl="xl" ml="sm" mb="sm" className={classes.description}>
          {todo.description}
        </Text>
      </Card.Section>
    </Card>
  );
};
