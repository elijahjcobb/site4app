/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	runtime: 'edge',
};

export default async function OG(req: NextRequest) {

	const { searchParams } = req.nextUrl;
	const theme = searchParams.get('theme');
	const icon = searchParams.get('icon');

	if (!icon) {
		return NextResponse.json({ err: "Missing params." })
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 128,
					background: theme ?? "white",
					width: '100%',
					height: '100%',
					display: 'flex',
					fontFamily: '"Space Grotesk"',
					textAlign: 'center',
					alignItems: 'center',
					padding: 64,
					justifyContent: 'center',
					gap: 64,
				}}
			>
				<img src={icon} style={{
					width: 480,
					height: 480,
					borderRadius: "25%"
				}} alt="icon" />
			</div>
		),
		{
			width: 1200,
			height: 600
		},
	);
}
