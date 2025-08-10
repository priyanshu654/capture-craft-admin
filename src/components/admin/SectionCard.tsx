import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface SectionCardProps {
  id?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const SectionCard = ({ id, title, description, actions, children }: SectionCardProps) => (
  <article id={id} className="scroll-mt-20">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-playfair text-2xl">{title}</CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
        {actions}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </article>
);

export default SectionCard;
