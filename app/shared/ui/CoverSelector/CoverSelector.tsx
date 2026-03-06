import React from "react";
import { Form } from "antd";
import { colors } from "~/root";
import { PictureOutlined } from "@ant-design/icons";
import { Title } from "../Order/Title";

export const CoverSelector = ({ links }: { links: string[] }) => {
  const form = Form.useFormInstance();
  const selectedCover = Form.useWatch("cover", form) || links[0];

  const handleSelect = (link: string) => {
    form.setFieldValue("cover", link);
  };
  return (
    <div
      className="rounded-2xl bg-(--color-bg-soft) p-4 mb-5"
      style={{
        border: `1px solid ${colors.primary}20`,
        boxShadow: `0 4px 12px ${colors.primary}10`,
      }}
    >
      <Title icon={<PictureOutlined />} title="Выберите обложку" />
      <Form.Item name="cover">
        <div className="flex flex-wrap gap-3">
          {links.map((link, index) => (
            <CoverItem
              key={index}
              link={link}
              index={index}
              isSelected={selectedCover === link}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </Form.Item>
    </div>
  );
};

type CoverItemProps = {
  link: string;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const CoverItem: React.FC<CoverItemProps> = ({
  link,
  index,
  isSelected,
  onSelect,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(link);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        w-[calc(50%-6px)]
        relative cursor-pointer transition-transform duration-200
        ${isSelected ? "scale-102" : "hover:scale-102"}
      `}
    >
      <div
        className={`
          rounded-xl overflow-hidden transition-all duration-200 bg-(--color-bg-soft) p-2
          ${
            isSelected
              ? "border-2 border-(--color-primary) shadow-lg"
              : "border border-(--color-primary)/20 shadow-sm hover:shadow-md"
          }
        `}
      >
        <div className="w-full aspect-square bg-(--color-bg) rounded-lg overflow-hidden relative">
          <img
            src={link}
            className="w-full h-full object-cover transition-opacity duration-200"
            style={{ opacity: isSelected ? 1 : 0.9 }}
            alt={`Обложка ${index + 1}`}
          />

          {isSelected && (
            <div className="absolute inset-0 bg-(--color-primary)/10 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};
