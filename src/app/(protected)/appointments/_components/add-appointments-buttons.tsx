"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { doctorsTable, patientsTable } from "@/db/schema";
import UpsertAppointmentForm from "./add-appointment-form";

interface AddAppointmentsButtonProps {
  patients: (typeof patientsTable.$inferSelect)[];
  doctors: (typeof doctorsTable.$inferSelect)[];
}

const AddAppointmentsButton = ({
  patients,
  doctors,
}: AddAppointmentsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Novo agendamento
        </Button>
      </DialogTrigger>
      <UpsertAppointmentForm
        patients={patients}
        doctors={doctors}
        onSuccess={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </Dialog>
  );
};

export default AddAppointmentsButton;
