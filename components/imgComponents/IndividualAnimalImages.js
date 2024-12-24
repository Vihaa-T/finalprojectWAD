import React from 'react';
import Image from 'next/image';

const IndividualAnimalImages = ({ result }) => {
  // Ensure result and result.photos exist before proceeding
  const photos = result?.photos || []; // Use optional chaining to check for null or undefined

  if (!result) {
    return <p>Loading...</p>; // Return loading state if result is not available
  }

  return (
    <>
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <Image
            key={index}
            src={photo.full} // Assuming each photo object has a 'full' URL property
            alt={`Image of ${result.name} - Photo ${index + 1}`} // Use a descriptive alt text
            width={500}
            height={500}
            layout="intrinsic" // Ensures the image scales correctly
          />
        ))
      ) : (
        <p>No photos available</p> // Fallback message if there are no photos
      )}
    </>
  );
};

export default IndividualAnimalImages;
