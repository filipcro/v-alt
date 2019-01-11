import React from 'react';

const Icon = ({ icon }) => {
    const svgHTML = { __html: icon.svg };
    return (
        <svg
            height="32"
            width="32"
            dangerouslySetInnerHTML={svgHTML}
        />
    );
};

export default Icon;
