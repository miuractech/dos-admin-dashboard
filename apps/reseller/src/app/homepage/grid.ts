// const styles = {
//     width: "353px",
//     height: "263px",
//     borderRadius: " 5px",
//     display: "grid",
//     gridTemplate: "repeat(2, 1fr) /repeat(2, 1fr)",
//     padding: "10px",
//     gap: "10px",
//     cursor: "pointer"
// }

// export const style2 = {
//     display: "grid",
//     gridTemplate: "repeat(2, 1fr)/repeat(2, 1fr)",
//     gridTemplateMobile:"repeat(4, 1fr)/repeat(1, 1fr)",
//     width: "55%",
//     margin: "auto",
//     gap: "15px",
//     justifyContent: "center"
// }

// const innerGridStyle = {
//     backgroundColor: "#E9F7FF",
//     borderRadius: " 5px"
// }

// export const grids = [
//     {
//         ...styles,
//         gridId: "0",
//         innerGrid: [
//             {
//                 gridRow: "1/3",
//                 gridColumn:'1/2',
//                 gridRowMobile: "1/3",
//                 gridColumnMobile:'1/2',
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 2
//                 },
//                 ...innerGridStyle,
//                 id: 0
//             },
//             {
//                 ...innerGridStyle,
//                 id: 1,
//                 gridColumn:'2/3',
//                 gridRow: "1/2",
//                 gridRowMobile: "3/4",
//                 gridColumnMobile:'1/2',
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 2,
//                 gridColumn:'2/3',
//                 gridRow: "2/3",
//                 gridRowMobile: "4/5",
//                 gridColumnMobile:'1/2',
//                 aspectRatio: {
//                     aspectX: 2,
//                     aspectY: 1
//                 }
//             },
//         ]
//     },
//     {
//         ...styles,
//         gridId: "1",
//         innerGrid: [
//             {
//                 ...innerGridStyle,
//                 id: 0,
//                 gridRow: "1/3",
//                 gridColumn:'1/2',
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 gridRow: " 2/-1",
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 gridRow: "1/-1",
//                 ...innerGridStyle,
//                 id: 2,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//         ]
//     },
//     {
//         ...styles,
//         gridId: "2",
//         innerGrid: [
//             {
//                 ...innerGridStyle,
//                 id: 0,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 gridColumn: "1/-1",
//                 id: 2,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//         ]
//     },
//     {
//         ...styles,
//         gridId: "3",
//         innerGrid: [
//             {
//                 ...innerGridStyle,
//                 id: 0,
//                 gridColumn: "1/-1",
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 2,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//         ]
//     },
//     {
//         ...styles,
//         gridId: "4",
//         innerGrid: [
//             {
//                 gridRow: "1 / -1",
//                 ...innerGridStyle,
//                 id: 0,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 gridRow: "1 / -1",
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             }
//         ]
//     },
//     {
//         ...styles,
//         gridId: "5",
//         innerGrid: [
//             {
//                 gridColumn: "1/-1",
//                 ...innerGridStyle,
//                 id: 0,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 gridColumn: "1/-1",
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             }
//         ]
//     },
//     {
//         ...styles,
//         gridId: "6",
//         innerGrid: [
//             {
//                 ...innerGridStyle,
//                 id: 0,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 1,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 2,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             },
//             {
//                 ...innerGridStyle,
//                 id: 3,
//                 aspectRatio: {
//                     aspectX: 1,
//                     aspectY: 1
//                 }
//             }
//         ]
//     },
// ]



// export interface RootObject {
//     width: string;
//     height: string;
//     borderRadius: string;
//     display: string;
//     gridTemplate: string;
//     padding: string;
//     gap: string;
//     cursor: string;
//     gridId: string;
//     innerGrid: InnerGrid[];
//     gridTemplateMobile:string;
// }


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
    // maxWidth: '100%'
}


export const grids = [
    [
        {
            ...innerStyles,
            gridRow: "1/3",
            gridColumn: '1/2',
            gridRowMobile: "1/3",
            gridColumnMobile: '1/2',
            width: 353,
            height: 353 * 1.41421,
            mobileWidth: 353,
            mobileHeight: 353 * 1.41421,
            aspectx: 1,
            aspecty: 2

        },
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
            aspectx: 1,
            aspecty: 1
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
            aspectx: 1,
            aspecty: 1
        },
    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
    [

    ],
]