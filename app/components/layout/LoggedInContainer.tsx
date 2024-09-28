import { ModeToggle } from "../mode-toggle";
import { LoggedInNavbar } from "./LoggedInNavbar";
import { UserNav } from "./user-nav";

export function clientLoader() {}

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="hidden flex-col md:flex dark:bg-slate-800">
        <div className="border-b">
          <div className="flex h-12 items-center px-4">
            <LoggedInNavbar className="mx-6"></LoggedInNavbar>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <main className="h-auto max-w-screen-xl flex-col items-start py-8 m-auto container">
        {children}
      </main>
    </>
  );
}
