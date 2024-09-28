import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardSectionType = React.PropsWithChildren & {
  title?: string;
  subtitle?: string;
  cardClasses?: string;
  childrenClasses?: string;
};

const renderTitle = (title?: string, subtitle?: string) => {
  let result;
  if (title) {
    result = <CardTitle>{title}</CardTitle>;
    if (subtitle) {
      result = (
        <>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </>
      );
    }
  }
  return result;
};

export default function CardSection({
  title,
  subtitle,
  cardClasses,
  childrenClasses,
  children,
}: CardSectionType) {
  console.log(cardClasses);
  return (
    <Card className={cardClasses ? cn("h-auto", cardClasses) : ""}>
      <CardHeader>{renderTitle(title, subtitle)}</CardHeader>
      <CardContent className="space-y-2">
        <div className={childrenClasses ? cn(childrenClasses) : ""}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
