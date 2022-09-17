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

export const TodoCard: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const trpcCtx = trpc.useContext();
  const completeMutation = trpc.useMutation(["todo.toggleComplete"], {
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

  return (
    <Card
      withBorder
      shadow="lg"
      radius="lg"
      style={{ width: "50%", minWidth: "380px" }}
    >
      <Card.Section p="md" pb={0} className={classes.main}>
        <Group>
          <Checkbox size="md" />
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
          <ActionIcon variant="subtle">
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
