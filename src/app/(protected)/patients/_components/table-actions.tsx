import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
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
}

const PatientsTableActions = ({ patient }: PatientsTableActionsProps) => {
  const [upsertPatientsDialogIsOpen, setUpsertPatientsDialogIsOpen] =
    useState(false);
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
          <DropdownMenuItem>
            <Trash />
            Excluir
          </DropdownMenuItem>
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
