import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const ProgressiveImg = ({ src, alt, style, loadingComponent }: { src: string | undefined, alt: string, style?: any, loadingComponent?: any }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (src) {
            const Timage = document.createElement('img');
            Timage.onload = () => {
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
                loading ? (loadingComponent ? loadingComponent : <CircularProgress />
                ) : (
                    <img
                        style={style}
                        src={src}
                        alt={alt}
                        className="image"
                    />
                )
            }
        </div>
    );
};
export default ProgressiveImg;