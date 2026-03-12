import { Stethoscope } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoctorsCardProps {
  doctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

function getInitials(name: string) {
  const parts = name.replace("Dr. ", "").split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0][0].toUpperCase();
}

const TopDoctorsCard = ({ doctors }: DoctorsCardProps) => {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Stethoscope className="text-muted-foreground" />
          <CardTitle className="text-base">Médicos</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                  {getInitials(doctor.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm">{doctor.name}</span>
                <span className="text-sm text-muted-foreground">
                  {doctor.specialty}
                </span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {doctor.appointments} agend.
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopDoctorsCard;
