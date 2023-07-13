import { Button } from "@/components/ui/button";
import { AccordionDemo } from "@/components/AccordionDemo";
import { MenubarDemo } from "@/components/MenubarDemo";

export default function Home() {
  return (
    <main className="flex items-center justify-between p-24">
      <div>
        Text
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started.
        </p>
      </div>

      <AccordionDemo />
      <MenubarDemo />
    </main>
  )
}
