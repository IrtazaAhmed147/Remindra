import React from 'react'
import './themeBtn.css'

function ThemeBtn({checked, onChange}) {
    return (
        <div className="wrapper">
            <input type="checkbox" name="checkbox" className="switch" checked={!checked} onChange={onChange} />
        </div>
    )
}

export default ThemeBtn