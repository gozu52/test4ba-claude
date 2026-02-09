import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '8e714897c1a44d4ca27d5f891704b44c'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '599e10fbe26948cfa649b509f5d9d6d2'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '02a30b2f6b8d4096beca7b7eb396f2f3'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0bd6136a35694634a94ec38c63a9551c'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'location_type'
                            value: 'conference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0ed40edd49a241719bbf900daccbf76c'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'assignment_group'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '13ab9991d92e4f5eb5ce7f244aea79f0'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '15df4b49c10f4a4fa1e082a8b090502f'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b0224d767fe42ab9a17045298a833d3'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b6315550c9c481cbb36c6f04d4656a2'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1c0db3bd9ba14331978c9bee82f28964'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1d84b2adace0491d97bd37ef19f93993'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'location_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1f5ab50e4d7d4a3b99a250d048788c77'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'assignment_group'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2067265253f9476a906e74814ca51a9e'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                            value: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '214e197201b84a91bb17491650874209'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31f3d31129c9474ab1db2c717f1b982f'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'whiteboards'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35cdad815ac140c6bf7679c7355704e5'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3d62c958b4b44ed5a7296d9b6f825a4b'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            value: 'boardroom_1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3e832ef50b8143948f9429b5333b2132'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'draft'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '45fe544e6c174ef0971946a40c9fa1ae'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'location_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4c73de2ef4a0422d937f44364c4fa7aa'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'assigned_to'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '4df7367f6f76488f86a6eb777a287b1e'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '53c8750ceb1348668d2128c7509f1fcf'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '55f32c90f1b444849bf7b932b2067c3a'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            value: 'conference_center'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a0bd2676ad04a96b4708ddf2090cce0'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '605832fe308e47bca6d87d638966685c'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'special_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e481d0028aa4634bcf3afb11cd61142'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '76d49e574d9a429ca54fb71f3300ba1a'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'pending_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '781bf523c4a54697b7fad2f4bcf5b4ec'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            value: 'boardroom_2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7b9f11e50dc245749860f454dc7a1753'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7d397cab1c4549c1966902a0091231ae'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'submitted'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88541a1dcba84e028258585fb994bfd6'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '886c8092a9ab4fb58ac51a2b031c07c3'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'short_description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9575d6dbfb1544eda73398efec9f2730'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                            value: 'in_progress'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '987a0c34c20a4350a79912b1f585c4f7'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'projector'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a0fc1b2db3984ecb882669160c5e6474'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                            value: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a2fd584ec33148dd92af88cb81a38213'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'whiteboards'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a870d994363c43ca86b245471fac03df'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a8d8e20edf5041eeb476cb90ca8433f0'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                            value: 'cube_a'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9ae162389e84d3194c2f4e069c54b98'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'projector'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'abc00b8283f0447c818f1fed86e9985d'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                            value: 'cube_b'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad612e04c8f84ff49ae290c15cd198ce'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'short_description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae91661535aa4d71988e7fbeda506ec0'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'special_notes'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b14e707f5b8847d7b7322e22b776c175'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b16c32dfb5b14c06aefeeac230a5d2dc'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'assigned_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5b698f3e1944810a51911ba8ec6cb26'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'requester'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b6030671f15a41fdbc44b13ee5b2bc29'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            value: 'meeting_room_a'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba9cf02704a84e918c9a25012f4470c2'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0028aeb9e8e4af08769df9ec771daad'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c4f4b27d0c4d47e399b222527ffaacf9'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c744f2fb32db4a14949a0faaab3a75b9'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'requested_on_site_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cb34d5469f044f1da9568368e3ff576c'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                            value: '4'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cc2752afc7984eb594f1aa8d42c93b35'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'priority'
                            value: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd4f32e3de8c34e9c9f519e68c66eb688'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'hotel_cube'
                            value: 'cube_c'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd91a6ece58364d6d8ddb1c403d0e685a'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'closed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'def834b35c3246ada4e19a9cfb05b5fb'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'closed_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e85cf5b19b014168ad262be4422d48f2'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'eb2dcb4878c9410993e401fffb951632'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ebed4c49b1414ad6a9ef2db386cd8056'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'requested_on_site_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'efb2163d5dc243afbe5bdd1deb97a07e'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'requester'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f0adee8e502b4cb7af97f011d00efead'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f3c6f81e04cd4830bd1617479848dda5'
                        key: {
                            category: 'x_snc_hotel_equipm_on_site_work_request'
                            prefix: 'ONSITEREQ'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f5227f6c138a4ad890c5f2ecccd3b107'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'conference_room'
                            value: 'meeting_room_b'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f898a5cf3317491bad9c94d91e45e65a'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'location_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fc92b9e80aa24896ac79a88d738739d4'
                        key: {
                            name: 'x_snc_hotel_equipm_on_site_work_request'
                            element: 'location_type'
                            value: 'room'
                        }
                    },
                ]
            }
        }
    }
}
