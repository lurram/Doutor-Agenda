"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { patientsTable } from "@/db/schema";
import PatientsTableActions from "./table-actions";

type Patients = typeof patientsTable.$inferSelect;

export const patientsTableColumns: ColumnDef<Patients>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (patientsParams) => {
      const patient = patientsParams.row.original;
      const phoneNumber = patient.phoneNumber;

      if (!phoneNumber) return "";

      const formattedPhoneNumber = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      );
      return formattedPhoneNumber;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (patientsParams) => {
      const patient = patientsParams.row.original;

      return patient.sex === "male" ? "Masculino" : "Feminino";
    },
  },
  {
    id: "actions",
    cell: (patientParams) => {
      const patient = patientParams.row.original;
      return <PatientsTableActions patient={patient} />;
    },
  },
];
