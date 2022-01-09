import { useNavigate, useLocation } from "solid-app-router";

export default function Home() {
  if (useLocation().pathname === "/") {
    const navigator = useNavigate();
    navigator("Accordion")
  }
}
