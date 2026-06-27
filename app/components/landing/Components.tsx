import { RadialMenu } from "@/components/radial-menu/RadialMenu";
import { MENU_ITEMS } from "@/components/radial-menu/menu-items";

export default function Mycomponents() {
  return (
    <section>
      {/* Heading */}
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-zinc-200">
        Components
      </h2>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-zinc-800">
        <div className="border-b border-neutral-200 dark:border-zinc-800 py-8">
          {/* Title */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-zinc-100">
              Radial Menu
            </h3>

            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              A modern radial navigation menu with smooth Framer Motion
              animations. Click the center button to reveal the menu items.
            </p>
          </div>

          {/* Preview */}
          <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
            <RadialMenu
              items={MENU_ITEMS}
              radius={96}
              startAngle={135}
              spreadAngle={162}
            />
          </div>
        </div>
      </div>
    </section>
  );
}