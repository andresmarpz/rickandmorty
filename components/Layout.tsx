import React from 'react';
import Box from './Box';

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <Box
            css={{
                minWidth: '250px',
                maxWidth: '1024px',
                padding: '0px 18px',
                margin: 'auto'
            }}>
            {children}
        </Box>
    );
};

export default Layout;
