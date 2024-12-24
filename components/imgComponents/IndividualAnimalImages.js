import React from 'react';
import Image from 'next/image';

const IndividualAnimalImages = ({ result }) => {
  // Assuming `result.photos` is an array of image objects and each object has a 'full' URL and a 'alt' text
  const photos = result.photos || []; // Make sure photos exists, otherwise it defaults to an empty array

  return (
    <>
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <Image
            key={index}
            layout="intrinsic"
            src={photo.full}
            alt={`Image of ${result.name} - Photo ${index + 1}`}
            width={500}
            height={500}
          />
        ))
      ) : (
        <p>No photos available</p>
      )}
    </>
  );
};

export default IndividualAnimalImages;
