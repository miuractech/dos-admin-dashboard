


export interface InnerGrid {
    aspectX: number,
    aspectY: number
    gridRow?: string;
    gridColumn?: string
    gridRowMobile?: string;
    gridColumnMobile?: string
    backgroundColor: string
    borderRadius: string
    mobileWidth: number
    mobileHeight: number
    id: number
    img?: string
}

const innerStyles = {
    backgroundColor: "#E9F7FF",
    borderRadius: " 5px",
    display: "grid",
    justifyContent: "center",
    alignContent: "center",

    // maxWidth: '100%'
}


export const grids = [
    [
        {
            ...innerStyles,
            gridRow: "1/2",
            gridColumn: '2/3',
            gridRowMobile: "3/4",
            gridColumnMobile: '1/2',
            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,
            gridRow: "1/3",
            gridColumn: '1/2',
            gridRowMobile: "1/3",
            gridColumnMobile: '1/2',
            width: 353,
            height: 360 * 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 1.41421,
            aspectY: 2

        },
        {
            ...innerStyles,
            gridRow: "2/3",
            gridColumn: '2/3',
            gridRowMobile: "4/5",
            gridColumnMobile: '1/2',
            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
    ],
    [
        {
            ...innerStyles,
            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,
            gridRow: "1/-1",
            gridColumn: "2/3",
            width: 353,
            height: 360 * 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 1.41421,
            aspectY: 2

        },

        {
            ...innerStyles,

            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
    ],
    [
        {
            ...innerStyles,
            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,

            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,
            gridRow: "2/3",
            gridColumn: "1/-1",
            width: 363 * 2,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 2,
            aspectY: 1

        },
    ],
    [
        {
            ...innerStyles,
            gridRow: "1/2",
            gridColumn: "1/-1",
            width: 363 * 2,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 2,
            aspectY: 1

        },
        {
            ...innerStyles,
            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,

            width: 353,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        }
    ],
    [
        {
            ...innerStyles,
            gridRow: "1/2",
            gridColumn: "1/-1",
            width: 355 * 2,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 2,
            aspectY: 1

        },
        {
            ...innerStyles,
            gridRow: "2/3",
            gridColumn: "1/-1",
            width: 355 * 2,
            height: 353 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 2,
            aspectY: 1

        }
    ],
    [
        {
            ...innerStyles,
            gridRow: "1/-1",
            gridColumn: "1/2",
            width: 353,
            height: 360 * 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 1.41421,
            aspectY: 2

        },
        {
            ...innerStyles,
            gridRow: "1/-1",
            gridColumn: "2/3",
            width: 353,
            height: 360 * 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectX: 1.41421,
            aspectY: 2

        }
    ],
    [
        {
            ...innerStyles,

            width: 350,
            height: 350 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,

            width: 350,
            height: 350 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,

            width: 350,
            height: 350 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
        {
            ...innerStyles,

            width: 350,
            height: 350 / 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 / 1.41421,
            aspectX: 1.41421,
            aspectY: 1
        },
    ],
]