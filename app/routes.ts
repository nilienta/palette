import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/TabsNavigation/TabsNavigation.tsx", [
    index("routes/home.tsx"),
    route("/tracker", "routes/tracker.tsx"),
    route("/color-quest", "routes/color-quest.tsx"),
    route("/advent", "routes/advent.tsx"),
    route("/about", "routes/about.tsx"),
    route("/other", "routes/other.tsx"),
    route("/encyclopedia", "routes/encyclopedia.tsx"),
    route("/encyclopedia-disney", "routes/encyclopedia-disney.tsx"),
    route("/order/:id", "routes/order.tsx"),
    route("/game/:id", "routes/game.tsx"),
  ]),
] satisfies RouteConfig;
