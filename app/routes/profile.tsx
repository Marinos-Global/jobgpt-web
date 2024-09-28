import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CardSection from "~/components/CardSection";
import { ModeToggle } from "~/components/mode-toggle";
import Title from "~/components/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LoggedInUser } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const user = await new Promise<LoggedInUser>((res) => {
    res({ id: "1234" });
  });
  if (!user) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ user });
};

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>Profile {user.id}</>
  );
}
