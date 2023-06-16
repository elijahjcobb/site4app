/* eslint-disable @next/next/no-img-element */
import { useMemo } from "react";
import styles from "./index.module.css";
import { cx } from "@/lib/front/cx";

export function IPhone({
	width = 500,
	screenshot,
	className
}: {
	width?: number,
	screenshot: string;
	className?: string;
}) {

	const height = useMemo(() => width * 2.0283793876, [width]);

	return <div style={{ width, height }} className={cx(styles.container, className)}>
		<svg className={styles.iphone} width={width} height={height} viewBox="0 0 1786 3622" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M361.333 30.8C311.067 32.1333 278.933 36 245.6 44.6666C167.6 65.2 105.067 114 68.8 182.8C50.5333 217.467 39.2 256.8 34 304C30.6666 333.6 29.7333 389.2 29.8666 558.933L30 714.667H25.6C23.2 714.667 20 715.333 18.5333 716C16.1333 717.333 16 719.467 16 782.4C16 831.2 16.4 847.867 17.6 849.067C18.5333 850 21.6 850.667 24.5333 850.667H30L29.6 911.2L29.3333 971.867L24.9333 972.267L20.6666 972.667V1107.33V1242L25.0666 1242.4L29.3333 1242.8V1278.67V1314.53L25.0666 1314.93L20.6666 1315.33V1450V1584.67L25.0666 1585.07L29.3333 1585.47V2377.07C29.4666 3132.27 29.6 3238 31.3333 3280.67C33.8666 3344.27 46 3395.47 68.8 3438.53C105.333 3507.47 167.733 3556.27 245.6 3576.53C278.267 3585.07 306.133 3588.53 357.333 3590.53C402.533 3592.4 1368.27 3592.4 1421.47 3590.67C1477.2 3588.93 1505.6 3585.47 1539.73 3576.53C1617.6 3556.27 1680 3507.47 1716.53 3438.53C1734.8 3404.13 1746.27 3364.13 1751.33 3317.6C1753.47 3297.47 1756 3233.87 1755.6 3208C1755.47 3199.6 1755.47 2831.07 1755.73 2388.93L1756 1585.33H1759.07C1760.67 1585.33 1762.8 1584.8 1763.73 1584.27C1765.07 1583.33 1765.33 1539.87 1765.07 1371.2L1764.67 1159.33L1760.4 1158.93L1756 1158.53V804.267C1755.87 458.933 1755.47 372.8 1754 338.667C1751.2 276 1739.07 225.467 1716.53 182.8C1680.27 114 1617.6 65.0666 1539.73 44.8C1502.67 35.0666 1474.8 32 1412.67 30.6666C1352.13 29.4666 407.2 29.4666 361.333 30.8ZM1434.27 34.6666C1480.13 36.5333 1507.33 40.1333 1538.13 48C1637.87 73.7333 1711.6 147.467 1737.33 247.2C1745.2 277.867 1748.67 304.8 1750.67 350.933C1752.4 392.533 1752.4 3195.47 1750.67 3256C1749.07 3310.27 1745.87 3339.6 1738 3370.8C1717.33 3452.8 1665.73 3517.33 1592.67 3552.8C1553.87 3571.6 1515.07 3580.93 1456.67 3585.6C1425.47 3588.13 359.867 3588.13 328.667 3585.6C270.4 3580.93 231.467 3571.6 192.667 3552.8C138.133 3526.4 94.9333 3483.2 68.5333 3428.67C45.6 3381.07 37.2 3338.67 34.6666 3258C32.9333 3199.47 32.9333 390.533 34.6666 350C36.2666 314.267 38.8 289.867 43.6 266.667C62.9333 170.667 120.133 98.5333 205.867 62.1333C238 48.4 272.133 40.6666 322 35.7333C333.733 34.6666 474 34 853.333 33.3333C1136.8 32.8 1376.53 32.6666 1386 32.9333C1395.6 33.2 1417.2 34 1434.27 34.6666ZM29.8666 720.8C31.4666 724.8 29.4666 727.867 24.9333 728.267C21.3333 728.667 20.5333 729.333 20.2666 732.533C20 734.667 20.4 736.933 21.2 737.733C22.2666 738.8 22.6666 738.8 22.6666 737.6C22.6666 734.667 27.8666 735.867 28.6666 738.933C29.0666 740.667 29.2 762.133 29.0666 786.667L28.6666 831.333H24.6666C21.3333 831.467 20.6666 832 20.6666 834.667C20.6666 837.467 21.4666 838.133 24.9333 838.4C29.3333 838.8 31.2 841.467 29.8666 845.6C29.2 847.6 28 848 23.6 847.733L18 847.333L17.6 784.667C17.4666 750.133 17.6 721.2 18 720.267C18.9333 717.733 28.9333 718.133 29.8666 720.8ZM30 985.333C30 991.867 29.7333 992.667 27.0666 993.067C24.5333 993.467 24 994.4 24 998C24 1001.33 24.5333 1002.27 26.4 1002.13C28.5333 1002 28.6666 1007.87 28.6666 1107.33C28.6666 1206.8 28.5333 1212.67 26.4 1212.53C24.5333 1212.4 24 1213.33 24 1217.33C24 1221.6 24.5333 1222.53 27.0666 1222.93C29.7333 1223.33 30 1224.13 30 1230.67C30 1236.67 29.6 1238 27.6 1238.4C21.0666 1239.73 21.3333 1244.67 21.3333 1107.33C21.3333 1036.8 21.7333 978.667 22.2666 978.133C22.8 977.6 24.8 977.333 26.6666 977.6C29.7333 978 30 978.533 30 985.333ZM1762.93 1168.67C1764.13 1175.6 1764.13 1568.4 1762.93 1575.33C1762.13 1579.87 1761.47 1580.67 1758.67 1580.67C1755.6 1580.67 1755.33 1580.13 1754.93 1573.07C1754.53 1566.13 1754.8 1565.47 1757.6 1565.07C1760.13 1564.8 1760.8 1563.73 1761.07 1559.2C1761.47 1554.53 1761.07 1553.6 1759.07 1553.87C1757.2 1554 1756.53 1552.67 1755.73 1547.33C1754.67 1538.67 1754.67 1197.87 1755.87 1192.67C1756.53 1189.87 1757.47 1188.8 1759.07 1189.07C1761.07 1189.47 1761.47 1188.67 1761.07 1184.4C1760.8 1180.27 1760.13 1179.2 1757.73 1178.93C1754.93 1178.53 1754.67 1177.73 1754.67 1171.47C1754.67 1163.6 1755.33 1162.4 1759.2 1162.93C1761.2 1163.2 1762.27 1164.67 1762.93 1168.67ZM30 1328C30 1334.53 29.7333 1335.33 27.0666 1335.73C24.5333 1336.13 24 1337.07 24 1340.67C24 1344 24.5333 1344.93 26.4 1344.8C28.5333 1344.67 28.6666 1350.53 28.6666 1450C28.6666 1549.47 28.5333 1555.33 26.4 1555.2C24.5333 1555.07 24 1556 24 1560C24 1564.27 24.5333 1565.2 27.0666 1565.6C29.7333 1566 30 1566.8 30 1573.33C30 1579.33 29.6 1580.67 27.6 1581.07C21.0666 1582.4 21.3333 1587.33 21.3333 1450C21.3333 1379.47 21.7333 1321.33 22.2666 1320.8C22.8 1320.27 24.8 1320 26.6666 1320.27C29.7333 1320.67 30 1321.2 30 1328Z" fill="white" />
			<path d="M1367.33 49.5997L1368 53.333H864.4C547.6 53.333 352.533 53.8664 338.667 54.6664C280.667 58.133 240.267 67.333 202.667 85.4664C174.133 99.1997 155.467 112.4 133.867 133.866C112.4 155.466 99.2 174.133 85.4666 202.666C62.2666 250.666 53.3333 304 53.3333 394.933V427.866L50.4 428.4L47.3333 428.933L50.4 429.2L53.3333 429.333V1810.27C53.3333 2569.73 53.0666 3190.8 52.6666 3190.53C52.4 3190.13 51.8666 2577.87 51.7333 1829.87C51.6 1082 51.0666 462.133 50.6666 452.666C50.2666 443.066 49.7333 570.266 49.6 735.333C49.4666 900.266 49.0666 1091.73 48.6666 1160.67C48.4 1229.6 47.7333 1561.33 47.3333 1898C46.9333 2234.53 46.2666 2663.33 45.8666 2850.8C45.0666 3182 45.0666 3191.73 47.4666 3193.2C48.9333 3194 49.3333 3194.67 48.5333 3194.67C47.4666 3194.67 47.0666 3197.87 47.2 3204.13C47.2 3209.33 46.8 3213.87 46.2666 3214.27C45.7333 3214.67 45.7333 3215.6 46.5333 3216.53C47.3333 3217.47 47.3333 3218.8 46.6666 3220C44 3224.13 46.2666 3287.47 50.1333 3319.33C56.9333 3375.87 71.7333 3418 98.9333 3458.4C110 3474.8 132.533 3499.2 148.667 3512.13C179.333 3536.8 223.6 3556.93 266.267 3565.87C294.667 3571.87 345.467 3576.4 376.8 3575.87C384.267 3575.73 391.067 3576 391.733 3576.53C392.533 3576.93 393.467 3576.8 394 3576C394.8 3574.67 414.933 3574 416.267 3575.33C417.6 3576.67 1425.6 3576 1448 3574.67C1460.13 3573.87 1477.47 3572.4 1486.67 3571.2C1552.4 3563.07 1606.13 3540 1647.47 3502.4C1702.13 3452.53 1729.87 3389.6 1737.2 3298.67C1739.6 3270.13 1740.53 3223.47 1738.93 3220.4C1737.87 3218.53 1737.87 3217.33 1738.93 3216.27C1739.87 3215.33 1740 3214.67 1739.2 3214.67C1738.4 3214.67 1738 3210.93 1738.27 3205.07C1738.53 3198.4 1738.13 3195.2 1736.93 3194.4C1735.87 3193.73 1736.13 3193.33 1737.87 3193.33C1740.27 3193.33 1740.27 3184.4 1739.47 2856.93C1739.07 2672 1738.4 2249.47 1738 1918C1737.6 1586.53 1736.93 1249.87 1736.67 1170C1736.27 1090 1735.87 891.733 1735.73 729.333C1735.6 566.933 1735.07 440 1734.67 447.333C1734.27 454.666 1733.73 1075.07 1733.6 1825.87C1733.47 2576.8 1733.07 3191.47 1732.67 3191.73C1732.27 3192.13 1732 2570.8 1732 1810.93V429.466L1735.07 428.933L1738 428.4L1735.07 428.133L1732 428V395.6C1731.87 303.866 1723.07 250.8 1699.87 202.666C1686.53 175.066 1672.13 154.533 1651.47 133.866C1629.87 112.4 1611.07 99.1997 1582.67 85.4664C1535.87 62.7997 1481.2 53.333 1397.2 53.333H1369.87L1368.27 49.5997L1366.67 45.9997L1367.33 49.5997ZM1474.67 109.733C1537.07 118 1579.33 136.666 1614 171.333C1653.33 210.666 1672.4 260 1677.33 335.333C1679.2 365.066 1679.2 3256.27 1677.33 3286C1672.4 3360.27 1653.6 3410 1615.6 3448.53C1575.07 3489.6 1526.4 3508.53 1448.4 3513.33C1433.07 3514.4 1251.73 3514.67 877.333 3514.4C360 3514 327.6 3513.87 310.667 3511.6C249.333 3503.47 206.533 3484.8 172.933 3451.6C135.867 3414.93 117.867 3373.6 109.067 3305.33C106.933 3288 105.733 374.533 108 338C111.733 275.866 123.067 236.8 148.267 199.066C164.933 174.266 193.733 148.666 220.267 135.2C249.333 120.4 287.867 111.066 331.733 108.133C340.267 107.466 596.933 107.066 902 107.2C1425.87 107.333 1457.6 107.466 1474.67 109.733ZM52.9333 3246.27C52.8 3252 52.5333 3247.33 52.5333 3236C52.5333 3224.67 52.8 3220 52.9333 3225.6C53.2 3231.33 53.2 3240.67 52.9333 3246.27ZM1732.93 3246.27C1732.8 3252 1732.53 3247.33 1732.53 3236C1732.53 3224.67 1732.8 3220 1732.93 3225.6C1733.2 3231.33 1733.2 3240.67 1732.93 3246.27ZM1731.6 3283.6C1731.33 3285.73 1731.07 3284 1731.07 3280C1731.07 3276 1731.33 3274.27 1731.6 3276.27C1731.87 3278.4 1731.87 3281.6 1731.6 3283.6ZM54.2666 3283.6C54 3285.73 53.7333 3284.27 53.7333 3280.67C53.7333 3276.93 54 3275.33 54.2666 3276.93C54.5333 3278.67 54.5333 3281.6 54.2666 3283.6ZM55.6 3302.27C55.2 3303.6 54.9333 3302.8 54.9333 3300.67C54.9333 3298.4 55.2 3297.47 55.6 3298.27C55.8666 3299.2 55.8666 3301.07 55.6 3302.27ZM1730.27 3302.27C1729.87 3303.6 1729.6 3302.8 1729.6 3300.67C1729.6 3298.4 1729.87 3297.47 1730.27 3298.27C1730.53 3299.2 1730.53 3301.07 1730.27 3302.27ZM56.9333 3316.93C56.5333 3318.27 56.2666 3317.47 56.2666 3315.33C56.2666 3313.07 56.5333 3312.13 56.9333 3312.93C57.2 3313.87 57.2 3315.73 56.9333 3316.93ZM1728.93 3316.93C1728.53 3318.27 1728.27 3317.47 1728.27 3315.33C1728.27 3313.07 1728.53 3312.13 1728.93 3312.93C1729.2 3313.87 1729.2 3315.73 1728.93 3316.93ZM1727.6 3326.93C1727.2 3327.87 1726.93 3327.2 1726.93 3325.33C1726.93 3323.47 1727.2 3322.8 1727.6 3323.6C1727.87 3324.53 1727.87 3326.13 1727.6 3326.93ZM58.2666 3326.93C57.8666 3328 57.4666 3327.6 57.4666 3326.13C57.3333 3324.67 57.7333 3323.87 58.1333 3324.4C58.5333 3324.8 58.6666 3326 58.2666 3326.93ZM59.6 3336.27C59.2 3337.33 58.8 3336.93 58.8 3335.47C58.6666 3334 59.0666 3333.2 59.4666 3333.73C59.8666 3334.13 60 3335.33 59.6 3336.27ZM1726.27 3336.27C1725.87 3337.33 1725.47 3336.93 1725.47 3335.47C1725.33 3334 1725.73 3333.2 1726.13 3333.73C1726.53 3334.13 1726.67 3335.33 1726.27 3336.27ZM119.333 3472C120.667 3473.47 121.467 3474.67 121.067 3474.67C120.667 3474.67 119.333 3473.47 118 3472C116.667 3470.53 115.867 3469.33 116.267 3469.33C116.667 3469.33 118 3470.53 119.333 3472ZM1669.33 3469.73C1669.33 3470 1668 3471.33 1666.4 3472.8L1663.33 3475.33L1665.87 3472.27C1668.27 3469.47 1669.33 3468.67 1669.33 3469.73ZM134 3488C138.4 3492.4 141.6 3496 141.2 3496C140.933 3496 137.067 3492.4 132.667 3488C128.267 3483.6 125.067 3480 125.467 3480C125.733 3480 129.6 3483.6 134 3488ZM1660 3480.4C1660 3480.53 1656.27 3484.27 1651.73 3488.67L1643.33 3496.67L1651.33 3488.27C1658.67 3480.53 1660 3479.33 1660 3480.4ZM150 3502.67C151.333 3504.13 152.133 3505.33 151.733 3505.33C151.333 3505.33 150 3504.13 148.667 3502.67C147.333 3501.2 146.533 3500 146.933 3500C147.333 3500 148.667 3501.2 150 3502.67ZM1638.67 3500.4C1638.67 3500.67 1637.33 3502 1635.73 3503.47L1632.67 3506L1635.2 3502.93C1637.6 3500.13 1638.67 3499.33 1638.67 3500.4ZM287.6 3562.13C287.2 3562.53 286 3562.67 285.067 3562.27C284 3561.87 284.4 3561.47 285.867 3561.47C287.333 3561.33 288.133 3561.73 287.6 3562.13ZM1500.93 3562.13C1500.53 3562.53 1499.33 3562.67 1498.4 3562.27C1497.33 3561.87 1497.73 3561.47 1499.2 3561.47C1500.67 3561.33 1501.47 3561.73 1500.93 3562.13ZM308.4 3564.93C307.467 3565.2 305.867 3565.2 305.067 3564.93C304.133 3564.53 304.8 3564.27 306.667 3564.27C308.533 3564.27 309.2 3564.53 308.4 3564.93ZM1480.4 3564.93C1479.47 3565.2 1477.87 3565.2 1477.07 3564.93C1476.13 3564.53 1476.8 3564.27 1478.67 3564.27C1480.53 3564.27 1481.2 3564.53 1480.4 3564.93ZM321.733 3566.27C320.8 3566.53 318.933 3566.53 317.733 3566.27C316.4 3565.87 317.2 3565.6 319.333 3565.6C321.6 3565.6 322.533 3565.87 321.733 3566.27ZM1468.4 3566.27C1467.47 3566.53 1465.6 3566.53 1464.4 3566.27C1463.07 3565.87 1463.87 3565.6 1466 3565.6C1468.27 3565.6 1469.2 3565.87 1468.4 3566.27ZM342.4 3567.6C341.067 3567.87 338.667 3567.87 337.067 3567.6C335.333 3567.33 336.4 3567.07 339.333 3567.07C342.267 3566.93 343.6 3567.2 342.4 3567.6ZM1449.07 3567.6C1447.73 3567.87 1445.33 3567.87 1443.73 3567.6C1442 3567.33 1443.07 3567.07 1446 3567.07C1448.93 3566.93 1450.27 3567.2 1449.07 3567.6ZM385.067 3568.93C380.8 3569.2 373.867 3569.2 369.733 3568.93C365.467 3568.67 368.933 3568.53 377.333 3568.53C385.733 3568.53 389.2 3568.67 385.067 3568.93ZM1412.4 3568.93C1406.27 3569.2 1396.4 3569.2 1390.4 3568.93C1384.27 3568.8 1389.2 3568.53 1401.33 3568.53C1413.47 3568.53 1418.4 3568.8 1412.4 3568.93Z" fill="black" />
			<path d="M1391.6 48.5333C1391.07 49.8666 1390.93 51.3333 1391.33 51.7333C1392.53 52.9333 1393.6 50.9333 1393.07 48.4C1392.67 46.1333 1392.53 46.1333 1391.6 48.5333Z" fill="black" />
			<path d="M1398 50.6665C1397.47 51.5998 1402.8 51.9998 1414.27 51.9998C1447.6 51.9998 1486.93 55.7332 1514.8 61.3332C1591.33 76.7998 1652.4 118.666 1690.4 181.6C1719.33 229.466 1733.33 293.066 1733.33 376.8C1733.33 391.2 1733.87 398.667 1734.8 398.667C1737.33 398.667 1734 323.867 1730 295.333C1727.33 276.533 1727.07 274.666 1722.53 256C1714 221.066 1700.13 190.8 1679.47 161.333C1669.2 146.8 1638.67 116.266 1624 105.866C1577.47 72.9332 1527.6 56.9332 1456.67 52.1332C1421.07 49.7332 1398.93 49.0665 1398 50.6665Z" fill="black" />
		</svg>
		<svg className={styles.notch} width={width / 3.592} height={height / 23.519} viewBox="0 0 506 154" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M60.4 6.00002C46.4 9.06669 35.0667 15.3334 24.6667 25.8667C13.7333 36.9334 8.93333 45.2 5.33333 59.4667C1.99999 72.5334 1.99999 82.1334 5.33333 95.2C8.93333 109.467 13.7333 117.733 24.6667 128.8C35.2 139.467 46.4 145.6 61.0667 148.667C74.4 151.6 430.933 151.6 444.267 148.667C458.933 145.6 470.133 139.467 480.667 128.8C491.6 117.733 496.4 109.467 500 95.2C503.333 82.1334 503.333 72.5334 500 59.4667C496.4 45.2 491.6 36.9334 480.667 25.8667C470.133 15.2 458.933 9.06669 444.267 6.00002C431.333 3.20002 73.0667 3.20002 60.4 6.00002Z" fill="black" />
		</svg>
		<img style={{ borderRadius: width / 10 }} className={styles.screenshot} alt='screenshot' src={screenshot} />
	</div>
}