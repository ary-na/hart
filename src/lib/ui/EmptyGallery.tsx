export function EmptyGallery({ ...props }) {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center py-24 text-center"
      {...props}
    >
      <h2 className="text-2xl">No animal portraits here yet.</h2>
      <p className="mt-3 max-w-md text-base leading-relaxed opacity-70">
        New work will hang here when it is ready.
      </p>
    </div>
  );
}
