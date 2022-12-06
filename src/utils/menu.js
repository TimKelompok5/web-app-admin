import {
    mdiHomeOutline,
    mdiAlphaTBoxOutline,
    mdiEyeOutline,
    mdiCreditCardOutline,
    mdiTable,
    mdiFileOutline,
    mdiFormSelect,
    mdiAccountCogOutline,
  } from '@mdi/js'

const menu = [
    {
        name: "Dashboard",
        link: "/main/dashboard",
        type: "link",
        icon:mdiHomeOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "Features",
        link: "",
        type: "divider",
        icon:mdiAlphaTBoxOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "Credentials",
        link: "/main/api-key",
        type: "link",
        icon:mdiEyeOutline,
        child: [],
        visible:[
            "USER_HOSPITAL",
            "ADMIN_HOSPITAL"
        ]
    },
    {
        name: "Master Data",
        link: "/main/master_data",
        type: "sub",
        icon:mdiTable,
        visible:[
            "DEV"
        ],
        child: [
            {
                name: "Hospital",
                link: "/main/hospital",
                type: "link",
                icon:mdiFileOutline,
                child: [],
                visible:[
                    "DEV"
                ]
            },
            {
                name: "Device",
                link: "/main/device",
                type: "link",
                icon:mdiFormSelect,
                child: [],
                visible:[
                    "DEV"
                ]
            },
            {
                name: "Questionnaire",
                link: "/main/questionnaire",
                type: "link",
                icon:mdiFormSelect,
                child: [],
                visible:[
                    "DEV"
                ]
            }
        ]
    },
    {
        name: "System",
        link: "",
        type: "divider",
        icon:mdiAlphaTBoxOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
    {
        name: "User",
        link: "/main/user",
        type: "link",
        icon:mdiEyeOutline,
        child: [],
        visible:[
            "DEV"
        ]
    },
    {
        name: "Akun",
        link: "/main/account-setting",
        type: "link",
        icon:mdiEyeOutline,
        child: [],
        visible:[
            "PUBLIC"
        ]
    },
]

export{ menu}