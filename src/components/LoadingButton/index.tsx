import { Spinner } from "flowbite-react";

type LoadingButtonProps = {
  isLoading: boolean;
  className: string;
  text: string;
};
export const LoadingButton = ({
  isLoading,
  className,
  text,
}: LoadingButtonProps) => {
  return (
    <>
      <button type="submit" className={className} disabled={isLoading}>
        {isLoading && (
          <Spinner aria-label="Spinner button example mr-4" size="sm" />
        )}
        {text}
      </button>
    </>
  );
};
