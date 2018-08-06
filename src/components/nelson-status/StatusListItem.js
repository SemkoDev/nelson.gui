import React from 'react';
import { ListItem, FontIcon } from 'material-ui';
import './style/StatusListItem.css';

export default function StatusListItem ({ label, value, icon }) {
    return (
        <ListItem
            primaryText={
                <span>
                    <span className='status-list-item-label'>
                        {label}
                    </span>
                    : {value}
                </span>
            }
            leftIcon={<FontIcon className={`fa fa-${icon}`} />}
        />
    )
}