import { Spinner, Type } from "./ui";

export type FullPageLoaderProps = {
  label?: string;
};

export const FullPageLoader = ({ label }: FullPageLoaderProps) => {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center gap-1">
      <Spinner />
      {label && (
        <Type size="xs" textColor="secondary">
          {label}
        </Type>
      )}
    </div>
  );
};
