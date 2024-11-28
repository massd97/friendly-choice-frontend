import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SiteDetailsProps {
  site: {
    id: number;
    name: string;
    address: string;
    soilAmount: string;
    soilType: string;
  };
}

export function SiteDetails({ site }: SiteDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{site.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="font-medium">Address: </span>
          <span className="text-muted-foreground">{site.address}</span>
        </div>
        <div>
          <span className="font-medium">Available Soil: </span>
          <span className="text-muted-foreground">{site.soilAmount}</span>
        </div>
        <div>
          <span className="font-medium">Soil Type: </span>
          <span className="text-muted-foreground">{site.soilType}</span>
        </div>
      </CardContent>
    </Card>
  );
}