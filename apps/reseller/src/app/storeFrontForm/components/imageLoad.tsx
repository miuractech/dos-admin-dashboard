import { useState } from "react";

export const ProgressiveImg = ({ src, alt, ...props }: { src: string, alt: string }) => {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            {
                loading ? (
                    <div>loading...</div>
                ) : (
                    <img
                        src={src}
                        onLoadStart={() => setLoading(true)}
                        onLoad={() => setLoading(false)}
                        alt={alt}
                        className="image"
                    />
                )
            }
        </div>
    );
};
export default ProgressiveImg;