import { Label } from "@/components/ui/label";
import { ReadOnlyField } from "./read-only-field";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function ReadOnlyEntity({
	title,
	description,
	value,
	mono
}: {
	title: string;
	description?: string;
	value?: string | null;
	mono?: boolean;
}): JSX.Element {
	return <div className="flex flex-col gap-2">
		<Label>{title}</Label>
		{value ? <ReadOnlyField mono={mono} value={value} /> : <Skeleton className="h-[42px] w-full" />}
		{description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
	</div>
}