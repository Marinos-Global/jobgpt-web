import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const clientLoader = async () => {
    const myPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(Math.random().toString());
      }, 2000);
    });
    // return the promise
    return defer({ myPromise });
  };
  
export default function SearchResults() {
    const { myPromise } = useLoaderData<typeof clientLoader>();
  
    return (
      <div>
          Show me straight away
          <div>
              <Suspense fallback={<div>Loading locally</div>}>
                  {/* here is where Remix awaits the promise */}
                  <Await resolve={myPromise}>
                      {/* now you have the resolved value */}
                      {(randomValue) => (
                      <div>
                          <h1>{randomValue}</h1>
                      </div>
                      )}
                  </Await>
              </Suspense>
          </div>
      </div>
    );
  }