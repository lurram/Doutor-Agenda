"use client";

import { Calendar, CircleDollarSign, User, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyInCents } from "@/helpers/currency";

interface StatsCardProps {
  totalRevenue: number | null;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

const StatsCard = ({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: StatsCardProps) => {
  const stats = [
    {
      label: "Faturamento",
      value: totalRevenue ? formatCurrencyInCents(totalRevenue) : "R$ 0,00",
      icon: CircleDollarSign,
    },
    {
      label: "Agendamentos",
      value: totalAppointments.toString(),
      icon: Calendar,
    },
    {
      label: "Pacientes",
      value: totalPatients.toString(),
      icon: Users2,
    },
    {
      label: "Médicos",
      value: totalDoctors.toString(),
      icon: User,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2 ">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}

      {stats.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">
            Nenhuma estatística encontrada
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
