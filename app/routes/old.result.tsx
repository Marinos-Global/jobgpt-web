import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { Suspense } from "react";
import { getGeneratedCoverLetter } from "~/api-service";
import CardSection from "~/components/CardSection";
import { Example } from "~/components/layout/example-nav";
import Title from "~/components/Title";
import { ClientOnly } from "remix-utils/client-only";
import { useHydrated } from "remix-utils/use-hydrated";
import LoggedInContainer from "~/components/layout/LoggedInContainer";

export const loader = async ({ params }: ClientLoaderFunctionArgs) => {
  const coverLetters = await getGeneratedCoverLetter();

  if (!coverLetters) {
    throw new Response("Not Found", { status: 404 });
  }
  const coverLetter = coverLetters.slice(-1)[0]
    ? coverLetters.slice(-1)[0]
    : {};
  return json({ coverLetter });
};

export default function GeneratedCoverLetter() {
  const { coverLetter } = useLoaderData<typeof loader>();
  return (
    <>
      <LoggedInContainer>
        <div className="w-full grid grid-cols-4 gap-4 content-start items-center justify-center">
          <Title
            title="JobGPT"
            subtitle="Your next job application - now supercharged with AI"
          ></Title>
          <CardSection
            cardClasses="col-span-4"
            childrenClasses="whitespace-pre-line"
            title="Your Cover Letter"
            subtitle="Generated with love by JobGPT"
          >
            {coverLetter.text}
          </CardSection>
        </div>
      </LoggedInContainer>
    </>
  );
}
