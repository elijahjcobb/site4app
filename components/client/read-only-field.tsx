import { Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export function ReadOnlyField({
	value,
	copyValue,
	mono
}: {
	value: string;
	copyValue?: string;
	mono?: boolean;
}): JSX.Element {

	const { toast } = useToast();

	const onClick = useCallback(() => {
		navigator.clipboard.writeText(copyValue ?? value).then(() => {
			toast({
				description: 'Copied to clipboard'
			})
		}).catch(() => {
			toast({
				variant: 'destructive',
				description: 'Failed to copy to clipboard'
			})
		})
	}, [copyValue, toast, value]);

	return <Card>
		<button onClick={onClick} className={clsx("flex cursor-copy w-full items-center justify-between gap-2 p-2 text-gray-500 hover:text-gray-700", mono ? "font-mono" : "font-sans")}>
			<span>{value}</span>
			<Copy className="h-4 w-4" />
		</button>
	</Card>
}
