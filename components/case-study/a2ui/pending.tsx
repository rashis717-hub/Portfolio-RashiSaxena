// Labelled stand-ins for the A2UI diagrams. Prompt A2UI-3 replaces each one with the real
// component; the names here are the contract /content/work/a2ui.mdx relies on.

function Pending({ name, description }: { name: string; description: string }) {
  return (
    <div
      role="note"
      aria-label={`${name}: diagram coming`}
      className="my-10 flex min-h-48 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border px-6 py-10 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Diagram coming · {name}
      </span>
      <span className="max-w-[48ch] text-[15px] text-muted-foreground">{description}</span>
    </div>
  );
}

export { A2UIFlow } from "./flow-sequence-diagram";

export function CatalogueMap() {
  return <Pending name="CatalogueMap" description="The six families of conversation components and their designed states." />;
}

export function AdaptationMatrix() {
  return <Pending name="AdaptationMatrix" description="How each component renders inside CAMS and from outside." />;
}

export function StateLifecycle() {
  return <Pending name="StateLifecycle" description="Question and Permission states, from active or pending to answered, allowed, denied or superseded." />;
}
