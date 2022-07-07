import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const ProgressiveImg = ({ src, alt, style }: { src: string, alt: string, style: any }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (src) {
            const Timage = document.createElement('img');
            Timage.onload = (e: any) => {
                setLoading(false)
            }
            Timage.src = src;
        }

        return () => {
            setLoading(true)
        }
    }, [src])
    return (
        <div>
            {
                loading ? (
                    <CircularProgress />
                ) : (
                    <img
                        style={style}
                        src={src}
                        // onLoadStart={() => setLoading(true)}
                        // onLoad={() => setLoading(false)}
                        alt={alt}
                        className="image"
                    />
                )
            }
        </div>
    );
};
export default ProgressiveImg;