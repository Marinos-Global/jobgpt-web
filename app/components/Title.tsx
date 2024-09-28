export type TitleWithSubtitleProps = {
  title: string;
  subtitle?: string;
};

const renderSubtitle = (subtitle?: string) => {
  if (subtitle) {
    return <div className="text-lg text-muted-foreground">{subtitle}</div>;
  }
};

export default function Title({ title, subtitle }: TitleWithSubtitleProps) {
  return (
    <div className="col-span-2">
      <div className="w-fit grid grid-cols-2 gap-4">
        <div className="text-4xl font-bold">{title}</div>
      </div>
      {renderSubtitle(subtitle)}
    </div>
  );
}
