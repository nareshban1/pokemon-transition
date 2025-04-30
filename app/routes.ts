import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pokemon/:name", "routes/pokemon.$name.tsx"),
] satisfies RouteConfig;
