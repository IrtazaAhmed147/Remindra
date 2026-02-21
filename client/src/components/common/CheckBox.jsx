import React from 'react'

import styles from "./checkBox.module.css";

function CheckBox({handleChange, checked = false}) {
    return (
        <>
            <label>
                <input type="checkbox" checked={checked} onChange={handleChange}className={styles.input} />
                <span className={styles.customCheckbox}></span>
            </label>
        </>
    )
}

export default CheckBox