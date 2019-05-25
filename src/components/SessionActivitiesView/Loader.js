import React from 'react';
import ContentLoader from 'react-content-loader';

const ConversationDetailsLoader = () => {
  return (
    <ContentLoader
      height={300}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="70" y="15" rx="4" ry="4" width="300" height="6.4" /> 
      <rect x="70" y="35" rx="3" ry="3" width="300" height="6.4" /> 
      <rect x="1" y="80" rx="3" ry="3" width="400" height="2" /> 
      <circle cx="30" cy="30" r="30" /> 
      <rect x="70" y="120" rx="4" ry="4" width="300" height="6.4" /> 
      <rect x="70" y="140" rx="3" ry="3" width="300" height="6.4" /> 
      <circle cx="30" cy="130" r="30" /> 
      <rect x="1" y="180" rx="3" ry="3" width="400" height="2" />
    </ContentLoader>
  );
};

export default ConversationDetailsLoader;
