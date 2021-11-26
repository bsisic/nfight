/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import Footer from "../../components/Footer";

export default {
    component: Footer,
    title: 'Footer'
}

const Template = (args) => <Footer {...args} />

export const Default = Template.bind({});
// Default.args = {
//     task: {
//         id: '1',
//         title: 'Test Task',
//         state: 'TASK_INBOX',
//         updatedAt: new Date(2021, 0, 1, 9, 0),
//     },
// };