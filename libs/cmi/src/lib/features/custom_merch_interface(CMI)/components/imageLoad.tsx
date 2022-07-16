import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export const ProgressiveImg = ({ src, alt, style, skeletonDimension }: { src: string, alt: string, style: any,skeletonDimension?:{width:number,height:number} }) => {
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
                    <Skeleton  variant="rectangular" width={skeletonDimension?.width??250} height={skeletonDimension?.height??250} />
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