export const dischargeSummeryData = [
    {
        "name": "Goals",
        "key": "goals",
        "child": []
    },
    {
        "name": "Discharge Recommendations",
        "key": "dischargeRecommendations",
        "child": [
            {
                "name": "Medication management and/or psychiatric care",
                "key": "medicationManagementAndOrPsychiatricCare",
                "type": "checkbox",
                "for": "normal",
                "child": [
                    [
                        {
                            "name": "client has been seen by provider",
                            "key": "clientHasBeenSeenByProvider",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "client was given referral",
                            "key": "clientWasGivenReferral",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "add new",
                            "key": "add-new",
                            "type": "radio",
                            "for": "addnew"
                        }
                    ],
                    [
                        {
                            "name": "Contact Information",
                            "key": "contactInformation",
                            "type": "checkbox",
                            "for": "radio-group",
                            "start_text": "Contact Information",
                            "child": [
                                [
                                    {
                                        "name": "contact",
                                        "key": "contact",
                                        "for": "inline-notes",
                                        "type": "radio",
                                        "same_name": "contact",
                                        "with_checkbox": true
                                    },
                                    {
                                        "name": "unknown",
                                        "key": "unknown",
                                        "type": "radio",
                                        "for": "normal",
                                        "same_name": "contact"
                                    }
                                ]
                            ]
                        }
                    ]
                ]
            },
            {
                "name": "Increased community involvement",
                "key": "increasedCommunityInvolvement",
                "type": "checkbox",
                "for": "normal",
                "child": [
                    [
                        {
                            "name": "client has been engaging in the community",
                            "key": "clientHasBeenEngagingInTheCommunity",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "client was given referral",
                            "key": "clientWasGivenReferral",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "add new",
                            "key": "add-new",
                            "type": "radio",
                            "for": "addnew"
                        }
                    ],
                    [
                        {
                            "name": "Contact Information",
                            "key": "contactInformation",
                            "type": "checkbox",
                            "for": "radio-group",
                            "start_text": "Contact Information",
                            "child": [
                                [
                                    {
                                        "name": "contact",
                                        "key": "contact",
                                        "for": "inline-notes",
                                        "type": "radio",
                                        "same_name": "contact",
                                        "with_checkbox": true
                                    },
                                    {
                                        "name": "unknown",
                                        "key": "unknown",
                                        "type": "radio",
                                        "for": "normal",
                                        "same_name": "contact"
                                    }
                                ]
                            ]
                        }
                    ]
                ]
            },
            {
                "name": "Counseling Services",
                "key": "counselingServices",
                "type": "checkbox",
                "for": "normal",
                "child": [
                    [
                        {
                            "name": "client has been seen by provider",
                            "key": "clientHasBeenSeenByProvider",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "client was given referral",
                            "key": "clientWasGivenReferral",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "add new",
                            "key": "add-new",
                            "type": "radio",
                            "for": "addnew"
                        }
                    ],
                    [
                        {
                            "name": "Contact Information",
                            "key": "contactInformation",
                            "type": "checkbox",
                            "for": "radio-group",
                            "start_text": "Contact Information",
                            "child": [
                                [
                                    {
                                        "name": "contact",
                                        "key": "contact",
                                        "for": "inline-notes",
                                        "type": "radio",
                                        "same_name": "contact",
                                        "with_checkbox": true
                                    },
                                    {
                                        "name": "unknown",
                                        "key": "unknown",
                                        "type": "radio",
                                        "for": "normal",
                                        "same_name": "contact"
                                    }
                                ]
                            ]
                        }
                    ]
                ]
            },
            {
                "name": "Other",
                "key": "other",
                "for": "inline-notes",
                "type": "checkbox",
                "same_name": "other",
                // "parent_with_note": true,
                "with_checkbox": true,
                "child": [
                    [
                        {
                            "name": "client has been seen by provider",
                            "key": "clientHasBeenSeenByProvider",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "client was given referral",
                            "key": "clientWasGivenReferral",
                            "type": "radio",
                            "for": "normal"
                        },
                        {
                            "name": "add new",
                            "key": "add-new",
                            "type": "radio",
                            "for": "addnew"
                        }
                    ],
                    [
                        {
                            "name": "Contact Information",
                            "key": "contactInformation",
                            "type": "checkbox",
                            "for": "radio-group",
                            "start_text": "Contact Information",
                            "child": [
                                [
                                    {
                                        "name": "contact",
                                        "key": "contact",
                                        "for": "inline-notes",
                                        "type": "radio",
                                        "same_name": "contact",
                                        "with_checkbox": true
                                    },
                                    {
                                        "name": "unknown",
                                        "key": "unknown",
                                        "type": "radio",
                                        "for": "normal",
                                        "same_name": "contact"
                                    }
                                ]
                            ]
                        }
                    ]
                ]
            }
        ]
    }
]