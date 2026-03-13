import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import AddDoctorButton from "./components/add-doctor-button";
import DoctorCard from "./components/doctor-card";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  if (!session.user.plan) {
    redirect("/new-subscription");
  }

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>Gerencie os médicos da sua clínica</PageDescription>
        </PageHeaderContent>

        <PageActions>
          <AddDoctorButton />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="grid grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} />
          ))}

          {doctors.length === 0 && (
            <div className="col-span-3 text-center">
              <p className="text-muted-foreground">Nenhum médico encontrado</p>
            </div>
          )}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
