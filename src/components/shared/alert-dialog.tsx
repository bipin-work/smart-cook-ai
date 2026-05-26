import { PropsWithChildren } from "react";
import {
  AlertDialog as PAlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: () => void;
  isPending?: boolean;
  alertTitle?: string;
  variant?: "destructive" | "default";
  alertDescription?: string;
  actionText?: string;
}
const AlertDialog: React.FC<PropsWithChildren<AlertDialogProps>> = ({
  alertTitle = "Are you absolutely sure?",
  alertDescription = "This action cannot be undone. This item will be deleted permanently.",
  actionText = "Continue",
  variant = "default",
  onOpenChange,
  isPending = false,
  action,
  open,
  children,
}) => {
  return (
    <PAlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={variant} onClick={action}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              actionText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </PAlertDialog>
  );
};

export default AlertDialog;
