import { Button } from "@heroui/react";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CustomButton = ({
  children,
  className,
  isDisabled,
  type = "submit",
}: CustomButtonProps) => {
  return (
    <Button
      isDisabled={isDisabled}
      type={type}
      className={`w-full ${className || ""}`}
    >
      {children}
    </Button>
  );
};
