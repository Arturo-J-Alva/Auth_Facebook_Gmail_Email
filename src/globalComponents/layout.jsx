import React from 'react'

const Layout = ({ children, textIrATabla,link, className }) => {
    return (
        <div className={`max-w-5xl mx-auto pt-4 ${className}`} >
            {children}
        </div>
    )
}

export default Layout
