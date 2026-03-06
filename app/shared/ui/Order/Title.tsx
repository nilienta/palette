import { colors } from "~/root";

export type TitleProps = {
  icon: React.ReactNode;
  title: string;
};

export const Title = ({ icon, title }: TitleProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: `${colors.primary}20` }}
      >
        <div style={{ color: colors.primary, fontSize: 18 }}>{icon}</div>
      </div>
      <h3 className="text-lg font-semibold m-0 text-primary">{title}</h3>
    </div>
  );
};
