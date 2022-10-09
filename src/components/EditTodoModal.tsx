import {
  Button,
  Container,
  Group,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Priority, Todo } from "@prisma/client";
import React, { forwardRef, useEffect, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { IconFlag } from "@tabler/icons";
import { trpc } from "../utils/trpc";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

export const EditTodoModal: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [isEdit, setIsEdit] = useState(false);

  const trpcCtx = trpc.useContext();
  const updateMutation = trpc.useMutation(["todo.update"], {
    onSuccess() {
      trpcCtx.invalidateQueries(["todo.getAll"]);
    },
  });

  const reset = () => {
    if (isEdit) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
      setPriority(todo.priority);
      setIsEdit(false);
    }
  };

  const update = async () => {
    const output = await updateMutation.mutateAsync({
      id: todo.id,
      description,
      title,
      priority,
      dueDate,
    });
    if (output)
      showNotification({
        title: "Todo Item Updated Successfully",
        color: "blue",
        message:
          "Todo Item was updated successfully, changes will be reflected shortly.",
      });
    closeAllModals();
  };

  useEffect(() => {
    if (
      title !== todo.title ||
      description !== todo.description ||
      dueDate !== todo.dueDate ||
      priority !== todo.priority
    )
      setIsEdit(true);
    else setIsEdit(false);
  }, [
    todo.title,
    title,
    description,
    todo.description,
    dueDate,
    todo.dueDate,
    priority,
    todo.priority,
  ]);

  return (
    <Container>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb="sm"
        required={true}
      />
      <Textarea
        label="Description"
        minRows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb="sm"
        required={false}
      />
      <Group mb="md" noWrap position="apart">
        <DatePicker
          label="Due Date"
          placeholder="Due Date"
          defaultValue={todo.dueDate}
          required={false}
          value={dueDate}
          onChange={(value) => value && setDueDate(value)}
        />
        <Select
          label="Priority"
          itemComponent={SelectItem}
          data={[
            { value: Priority.P1, label: "High", color: "red" },
            { value: Priority.P2, label: "Medium", color: "orange" },
            { value: Priority.P3, label: "Low", color: "blue" },
          ]}
          value={priority}
          onChange={(value) => value && setPriority(value as Priority)}
        />
      </Group>
      <Group position="right" noWrap>
        <Button
          disabled={!isEdit}
          onClick={reset}
          variant="outline"
          color="gray"
        >
          Reset
        </Button>
        <Button onClick={update} disabled={!isEdit}>
          Edit
        </Button>
      </Group>
    </Container>
  );
};

interface SelectItemProps extends React.ComponentPropsWithoutRef<"div"> {
  color: "red" | "orange" | "blue";
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ color, label, ...others }: SelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <IconFlag size={18} color={color} />
        <Text color={color}>{label}</Text>
      </Group>
    </div>
  )
);
