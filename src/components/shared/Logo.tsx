import { Title, TitleOrder } from "@mantine/core";

export const Logo: React.FC<{ order?: TitleOrder }> = ({ order }) => {
  return (
    <Title order={order || 3} style={{ userSelect: "none" }}>
      Doder
    </Title>
  );
};
