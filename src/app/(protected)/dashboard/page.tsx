import dayjs from "dayjs";

import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/data/get-dashboard";
import { auth } from "@/lib/auth";
import { appointmentsTableColumns } from "../appointments/_components/table-columns";
import AppointmentsChart from "./components/appointments-chat";
import DatePicker from "./components/date-picker";
import StatsCard from "./components/stats-card";
import TopDoctorsCard from "./components/top-doctors";
import TopSpecialtiesCard from "./components/top-specialties";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  const { from, to } = await searchParams;

  if (!from || !to) {
    return redirect(
      `/dashboard?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs()
        .add(1, "month")
        .format("YYYY-MM-DD")}`,
    );
  }

  const {
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialties,
    todayAppointments,
    dailyAppointmentsData,
  } = await getDashboard({
    from,
    to,
    session: { user: { clinic: session.user.clinic } },
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Dashboard</PageTitle>
          <PageDescription>Bem-vindo ao seu dashboard</PageDescription>
        </PageHeaderContent>

        <PageActions>
          <DatePicker />
        </PageActions>
      </PageHeader>

      <PageContent>
        <StatsCard
          totalRevenue={totalRevenue.total ? Number(totalRevenue.total) : null}
          totalAppointments={totalAppointments.total}
          totalPatients={totalPatients.total}
          totalDoctors={totalDoctors.total}
        />

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <AppointmentsChart dailyAppointmentsData={dailyAppointmentsData} />
          <TopDoctorsCard doctors={topDoctors} />
        </div>
        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground" />
                  <CardTitle className="text-base">
                    Agendamentos de hoje
                  </CardTitle>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={appointmentsTableColumns}
                data={todayAppointments}
              />
            </CardContent>
          </Card>
          <TopSpecialtiesCard topSpecialties={topSpecialties} />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DashboardPage;
