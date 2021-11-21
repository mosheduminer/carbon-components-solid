import { useNavigate } from "solid-app-router";

export default function Home() {
  const navigator = useNavigate();
  navigator("Accordion")
}
