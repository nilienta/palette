import { Card as CardAntd } from "antd";
import { Title, type TitleProps } from "./Title";
import { colors } from "~/root";

export const Card = ({
  children,
  icon,
  title,
}: React.PropsWithChildren<TitleProps>) => {
  return (
    <CardAntd
      style={{
        borderRadius: 16,
        background: colors.bgSoft,
        border: `1px solid ${colors.primary}20`,
        marginBottom: 20,
      }}
    >
      <Title icon={icon} title={title} />
      {children}
    </CardAntd>
  );
};
