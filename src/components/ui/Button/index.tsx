import { Button, Spinner } from "@heroui/react";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CustomButton = ({
  children,
  className,
  isLoading,
  isDisabled,
  type = "submit",
}: CustomButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled || isLoading}
      type={type}
      className={`w-full ${className || ""}`}
    >
      {isLoading ? <Spinner className="text-foreground" /> : <>{children}</>}
    </Button>
  );
};
