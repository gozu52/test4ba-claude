import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    DateColumn, 
    DateTimeColumn, 
    ReferenceColumn, 
    BooleanColumn, 
    ChoiceColumn 
} from '@servicenow/sdk/core'

export const x_snc_hotel_equipm_on_site_work_request = Table({
    name: 'x_snc_hotel_equipm_on_site_work_request',
    label: 'On-Site Work Request',
    schema: {
        number: StringColumn({
            label: 'Number',
            read_only: true,
            default: 'javascript:global.getNextObjNumberPadded();'
        }),
        short_description: StringColumn({
            label: 'Short Description',
            mandatory: true,
            maxLength: 160
        }),
        requested_on_site_date: DateColumn({
            label: 'Requested On-Site Date',
            mandatory: true
        }),
        requester: ReferenceColumn({
            label: 'Requester',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        location_type: ChoiceColumn({
            label: 'Location Type',
            mandatory: true,
            dropdown: 'dropdown_without_none',
            choices: {
                room: {
                    label: 'Room',
                    sequence: 0
                },
                conference: {
                    label: 'Conference',
                    sequence: 1
                }
            }
        }),
        hotel_cube: ChoiceColumn({
            label: 'Hotel Cube',
            dropdown: 'dropdown_with_none',
            choices: {
                cube_a: {
                    label: 'Cube A',
                    sequence: 0
                },
                cube_b: {
                    label: 'Cube B',
                    sequence: 1
                },
                cube_c: {
                    label: 'Cube C',
                    sequence: 2
                }
            }
        }),
        conference_room: ChoiceColumn({
            label: 'Conference Room',
            dropdown: 'dropdown_with_none',
            choices: {
                boardroom_1: {
                    label: 'Boardroom 1',
                    sequence: 0
                },
                boardroom_2: {
                    label: 'Boardroom 2',
                    sequence: 1
                },
                meeting_room_a: {
                    label: 'Meeting Room A',
                    sequence: 2
                },
                meeting_room_b: {
                    label: 'Meeting Room B',
                    sequence: 3
                },
                conference_center: {
                    label: 'Conference Center',
                    sequence: 4
                }
            }
        }),
        whiteboards: BooleanColumn({
            label: 'Whiteboards',
            default: false
        }),
        projector: BooleanColumn({
            label: 'Projector',
            default: false
        }),
        special_notes: StringColumn({
            label: 'Special Notes',
            maxLength: 4000
        }),
        state: ChoiceColumn({
            label: 'State',
            mandatory: true,
            default: 'draft',
            dropdown: 'dropdown_without_none',
            choices: {
                draft: {
                    label: 'Draft',
                    sequence: 0
                },
                submitted: {
                    label: 'Submitted',
                    sequence: 1
                },
                pending_approval: {
                    label: 'Pending Approval',
                    sequence: 2
                },
                in_progress: {
                    label: 'In Progress',
                    sequence: 3
                },
                completed: {
                    label: 'Completed',
                    sequence: 4
                },
                cancelled: {
                    label: 'Cancelled',
                    sequence: 5
                }
            }
        }),
        assigned_to: ReferenceColumn({
            label: 'Assigned To',
            referenceTable: 'sys_user'
        }),
        assignment_group: ReferenceColumn({
            label: 'Assignment Group',
            referenceTable: 'sys_user_group'
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            default: '2',
            dropdown: 'dropdown_without_none',
            choices: {
                '1': {
                    label: '1 - Low',
                    sequence: 0
                },
                '2': {
                    label: '2 - Medium',
                    sequence: 1
                },
                '3': {
                    label: '3 - High',
                    sequence: 2
                },
                '4': {
                    label: '4 - Critical',
                    sequence: 3
                }
            }
        }),
        work_notes: StringColumn({
            label: 'Work Notes',
            maxLength: 4000,
            attributes: {
                is_journal: true
            }
        }),
        closed_at: DateTimeColumn({
            label: 'Closed At'
        })
    },
    auto_number: {
        prefix: 'ONSITEREQ',
        number: 1,
        number_of_digits: 7
    },
    display: 'short_description',
    extensible: false,
    audit: true
})