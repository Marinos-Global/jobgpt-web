import { LoaderFunctionArgs } from "@remix-run/node";
import { ModeToggle } from "~/components/mode-toggle";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return null;
};
export default function Index() {
  return (
    <p id="index-page">
        <ModeToggle ></ModeToggle>
      This is a demo for Remix.
      <br />
      Check out <a href="https://remix.run">the docs at remix.run</a>.
    </p>
  );
}
