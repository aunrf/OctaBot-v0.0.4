module.exports = {
    short_message: context => {
        return {
            channel: context.channel,
            text: context.text
        }
    },
    welcome_message: context => {
        return {
            channel: context.channel,
            text: ':wave: Hello! I\'m here to help you request a leave and announce it to absensi channel.',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: ':wave: Hello! I\'m here to help you request a leave and announce it to absensi channel.'
                    }
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            action_id: 'make_leave',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Request a leave'
                            },
                            style: 'primary',
                            value: 'make_leave'
                        },
                        {
                            action_id: 'dismiss',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Dismiss'
                            },
                            value: 'dismiss'
                        }
                    ]
                }
            ]
        }
    },
    welcome_home: context => {
        return {
            type: 'home',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: ':wave: Hello! I\'m here to help you request a leave and announce it to absensi channel.'
                    }
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            action_id: 'make_leave',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Request a leave'
                            },
                            style: 'primary',
                            value: 'make_leave'
                        }
                    ]
                }
            ]
        }
    },
    request_leave: context => {
        return {
            type: 'modal',
            title: {
                type: 'plain_text',
                text: 'Request a leave'
            },
            callback_id: 'request_leave',
            blocks: [
                {
                    type: "divider"
		},
		{
            block_id: "leavetype",
			type: "input",
			element: {
				type: "static_select",
				placeholder: {
					type: "plain_text",
					text: "Select your type of leave",
					emoji: true
				},
				options: [
					{
						text: {
							type: "plain_text",
							text: ":desert_island: Annual Leave",
							emoji: true
						},
						value: "value-0"
					},
					{
						text: {
							type: "plain_text",
							text: ":thermometer: Sick Leave",
							emoji: true
						},
						value: "value-1"
					},
					{
						text: {
							type: "plain_text",
							text: ":money_with_wings: Unpaid Leave",
							emoji: true
						},
						value: "value-2"
					}
				],
				action_id: "leavetype_id"
			},
			label: {
				type: "plain_text",
				text: "Leave Type",
				emoji: true
			}
		},
		{
            block_id: "from",
			type: "input",
			element: {
				type: "datepicker",
				initial_date: "2021-07-28",
				placeholder: {
					type: "plain_text",
					text: "Select a date",
					emoji: true
				},
				action_id: "from_id"
			},
			label: {
				type: "plain_text",
				text: "From",
				emoji: true
			}
		},
		{
            block_id: "to",
			type: "input",
			element: {
				type: "datepicker",
				initial_date: "2021-07-29",
				placeholder: {
					type: "plain_text",
					text: "Select a date",
					emoji: true
				},
				action_id: "to_id"
			},
			label: {
				type: "plain_text",
				text: "To",
				emoji: true
			}
		},
		{
            block_id: "approver",
			type: "input",
			element: {
				type: "multi_users_select",
				placeholder: {
					type: "plain_text",
					text: "Please select your head of department and HR",
					emoji: true
				},
				action_id: "approver_id"
			},
			label: {
				type: "plain_text",
				text: "Approver",
				emoji: true
			}
		},
		{
			block_id: "channel",
			type: "input",
			label: {
				type: "plain_text",
				text: "Select channel"
			},
			element: {
				action_id: "channel_id",
				type: "external_select",
				min_query_length: 0
			}
		},
		{
            block_id: "reason",
			type: "input",
			label: {
				type: "plain_text",
				text: "Reason",
				emoji: true
			},
			element: {
                action_id: "reason_id",
				type: "plain_text_input",
				multiline: true
			}
                }
            ],
            submit: {
                type: 'plain_text',
                text: 'Next'
            }
        }
    },
    confirm_leave: context => {
        return {
            response_action: 'push',
            view: {
                callback_id: 'confirm_leave',
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'Confirm request'
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Leave*`
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: context.leave.leavetype
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Date Taken*`
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: context.leave.from
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: context.leave.to
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Approver*`
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `<@${context.leave.approver}>`
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `*Channel*`
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: context.leave.channelString
                        }
                    },
                    {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: `*Reason*`
                            }
                        },
                        {
                            type: 'divider'
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: context.leave.reason
                        }
                    }
                ],
                close: {
                    type: 'plain_text',
                    text: 'Back'
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                },
                private_metadata: JSON.stringify(context.leave)
            }
        }
    },
    finish_leave: context => {
        return {
            response_action: 'update',
            view: {
                callback_id: 'finish_leave',
                clear_on_close: true,
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'Success :tada:',
                    emoji: true
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Your leave request has been sent for approval.`
                        }
                    }
                ],
                close: {
                    type: 'plain_text',
                    text: 'Done'
                }
            }
        }
    },
    approve: context => {
        return {
            channel: context.channel,
            text: `Leave approval is requested by <@${context.requester}>`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `<@${context.requester}> is requesting a leave.`
                    }
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `>>> *Type*\n${context.leavetype}\n\n*Date from*\n${context.from}n*Date to*\n${context.to}`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `Requested channels: ${context.channelString}`
                        }
                    ]
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            action_id: 'approve',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Approve',
                                emoji: true
                            },
                            style: 'primary',
                            value: JSON.stringify(context)
                        },
                        {
                            action_id: 'reject',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Reject',
                                emoji: true
                            },
                            style: 'danger',
                            value: JSON.stringify(context)
                        }
                    ]
                }
            ]
        }
    },
    rejected: context => {
        return {
            channel: context.channel,
            text: 'Your leave has been rejected.',
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'Your leave has been rejected.'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `>>> *Type*\n${context.leavetype}\n\n*Date from*\n${context.from}n*Date to*\n${context.to}`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `Requested channels: ${context.channelString}`
                        }
                    ]
                }
            ]
        }
    },
    leave: context => {
        return {
            channel: context.channel,
            text: `:loudspeaker: Leave from: <@${context.requester}>`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*${context.leavetype}*`
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: context.from
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: context.to
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `:memo: Posted by <@${context.requester}>`
                        },
                        {
                            type: 'mrkdwn',
                            text: `:heavy_check_mark: Approved by <@${context.approver}>`
                        }
                    ]
                }
            ]
        }
    }

}