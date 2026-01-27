import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageSkeleton = ({ 
    src, 
    alt, 
    className = "", 
    skeletonClassName = "",
    onLoad,
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            {/* Skeleton Loader */}
            {!isLoaded && (
                <div className={`absolute inset-0 ${skeletonClassName}`}>
                    <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            {!hasError ? (
                <motion.img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                    onLoad={handleLoad}
                    onError={handleError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            ) : (
                /* Error Fallback */
                <div className={`${className} bg-gray-800 flex items-center justify-center`}>
                    <div className="text-gray-500 text-center p-4">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs">Image not found</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSkeleton;