/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	runtime: 'edge',
};

// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/grotesk.ttf', import.meta.url)).then(
	(res) => res.arrayBuffer(),
);

export default async function OG(req: NextRequest) {

	const fontData = await font;

	const { searchParams } = req.nextUrl;
	const app = searchParams.get('app');
	const icon = searchParams.get('icon');

	if (!app || !icon) {
		return NextResponse.json({ err: "Missing params." })
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 128,
					background: 'white',
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
				<span style={{
					textAlign: "left",
					fontSize: 128
				}}>{app}</span>
			</div>
		),
		{
			width: 1200,
			height: 600,
			fonts: [
				{
					name: 'Typewriter',
					data: fontData,
					style: 'normal',
				},
			],
		},
	);
}
