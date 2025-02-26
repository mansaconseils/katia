import React from 'react';

const PropertyMap = () => {
  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="w-full h-full relative">
        <iframe
          title="Carte des propriétés"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54408.34592719505!2d-7.999816566796867!3d31.630801199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d973ada70b%3A0x1b6df6ee84f5e8e!2sMarrakech!5e0!3m2!1sfr!2sma!4v1645644079447!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default PropertyMap;