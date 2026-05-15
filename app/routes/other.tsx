import { Flex, Typography } from "antd";
import { Link } from "react-router";

export default function Other() {
  return (
    <Flex vertical>
      <Link to="/encyclopedia">
        <Typography.Title level={2}>Энциклопедия персонажей</Typography.Title>
      </Link>
      <Link to="/encyclopedia-disney">
        <Typography.Title level={2}>Энциклопедия Disney </Typography.Title>
      </Link>
      <Typography.Title level={2}>Адвент</Typography.Title>
    </Flex>
  );
}
