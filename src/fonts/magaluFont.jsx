import localFont from 'next/font/local'

export const magaluFont = localFont({
    src: [
        {
        path: './MagaluTextos/MagaluTextos-Regular.ttf',
        weight: '400',
        style: 'normal',
        },
        {
        path: './MagaluTextos/MagaluTextos-Medium.ttf',
        weight: '500',
        style: 'normal',
        },
        {
        path: './MagaluTextos/MagaluTextos-Bold.ttf',
        weight: '700',
        style: 'normal',
        },
    ],
    variable: '--font-magalu',
    display: 'swap',
})
