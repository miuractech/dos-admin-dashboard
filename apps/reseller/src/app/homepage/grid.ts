const styles = {
    width: "353px",
    height: "263px",
    borderRadius: " 5px",
    display: "grid",
    gridTemplate: "repeat(2, 1fr) /repeat(2, 1fr)",
    padding: "10px",
    gap: "10px",
    cursor: "pointer"
}

export const style2 = {
    display: "grid",
    gridTemplate: "repeat(4, 1fr)/repeat(2, 1fr)",
    width: "55%",
    margin: "auto",
    gap: "15px",
    justifyContent: "center"
}

const innerGridStyle = {
    backgroundColor: "#E9F7FF",
    borderRadius: " 5px"
}

export const grids = [
    {
        ...styles,
        id: 0,
        innerGrid: [
            {
                gridRow: "1/-1",
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 3
                },
                ...innerGridStyle,
                id: 0
            },
            {
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 2,
                aspectRatio: {
                    aspectX: 3,
                    aspectY: 1
                }
            },
        ]
    },
    {
        ...styles,
        id: 1,
        innerGrid: [
            {
                ...innerGridStyle,
                id: 0,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                gridRow: " 2/-1",
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                gridRow: "1/-1",
                ...innerGridStyle,
                id: 2,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
        ]
    },
    {
        ...styles,
        id: 2,
        innerGrid: [
            {
                ...innerGridStyle,
                id: 0,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                gridColumn: "1/-1",
                id: 2,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
        ]
    },
    {
        ...styles,
        id: 3,
        innerGrid: [
            {
                ...innerGridStyle,
                id: 0,
                gridColumn: "1/-1",
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 2,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
        ]
    },
    {
        ...styles,
        id: 4,
        innerGrid: [
            {
                gridRow: "1 / -1",
                ...innerGridStyle,
                id: 0,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                gridRow: "1 / -1",
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            }
        ]
    },
    {
        ...styles,
        id: 5,
        innerGrid: [
            {
                gridColumn: "1/-1",
                ...innerGridStyle,
                id: 0,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                gridColumn: "1/-1",
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            }
        ]
    },
    {
        ...styles,
        id: 6,
        innerGrid: [
            {
                ...innerGridStyle,
                id: 0,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 1,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 2,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            },
            {
                ...innerGridStyle,
                id: 3,
                aspectRatio: {
                    aspectX: 1,
                    aspectY: 1
                }
            }
        ]
    },
]


export interface InnerGrid {
    aspectRatio: {
        aspectX: number,
        aspectY: number
    }
    gridRow?: string;
    gridColumn?: string
    backgroundColor: string
    borderRadius: string
    id: number
    img?: string
}

export interface RootObject {
    width: string;
    height: string;
    borderRadius: string;
    display: string;
    gridTemplate: string;
    padding: string;
    gap: string;
    cursor: string;
    id: number;
    innerGrid: InnerGrid[];
}



