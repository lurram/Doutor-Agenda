import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { patientsTable } from "@/db/schema";
import UpsertPatientForm from "./upsert-patient-form";

interface PatientsTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
  onSuccess?: () => void;
}

const PatientsTableActions = ({
  patient,
  onSuccess,
}: PatientsTableActionsProps) => {
  const [upsertPatientsDialogIsOpen, setUpsertPatientsDialogIsOpen] =
    useState(false);

  const deletePatientAction = useAction(deletePatient, {
    onSuccess: () => {
      toast.success("Paciente deletado com sucesso.");
      onSuccess?.();
    },
    onError: () => "Erro ao deletar paciente.",
  });

  const handleDeletePatientActionClick = () => {
    if (!patient) return;
    deletePatientAction.execute({ id: patient.id });
  };

  return (
    <Dialog
      open={upsertPatientsDialogIsOpen}
      onOpenChange={setUpsertPatientsDialogIsOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => setUpsertPatientsDialogIsOpen(true)}>
            <Edit />
            Editar
          </DropdownMenuItem>
          {patient && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir este paciente?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser revertida. Isso irá excluir o
                    paciente e todas as suas informações.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeletePatientActionClick}>
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <UpsertPatientForm
        isOpen={upsertPatientsDialogIsOpen}
        patient={patient}
        onSuccess={() => setUpsertPatientsDialogIsOpen(false)}
      />
    </Dialog>
  );
};

export default PatientsTableActions;
