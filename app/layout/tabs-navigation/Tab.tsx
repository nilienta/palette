import { NavLink } from "react-router";

export default function Tab({ to, label }: { to: string; label: string }) {
  return (
    <li className="inline-block mr-2 p-4 ">
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
              ? "text-(--color-secondary) border-b-2 border-(--color-secondary) rounded-t-lg active"
              : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
